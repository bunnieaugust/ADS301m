import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Question, QuestionType } from '../types';
import Card from './Card';

interface QuizSettings {
  shuffle: boolean;
  type: 'all' | 'multiple_choice' | 'fill_in_the_blank';
}

interface QuizViewProps {
  questions: Question[];
  onQuizComplete: (score: number, total: number) => void;
  userId: string;
  sessionId: number;
  settings: QuizSettings;
}

type QuizPhase = 'main' | 'fib_lockdown' | 'final_retry' | 'finished';

const FIB_LOCKDOWN_THRESHOLD = 3;

const QuizView: React.FC<QuizViewProps> = ({ questions, onQuizComplete, userId, sessionId, settings }) => {
  const quizQuestions = useMemo(() => {
    let filtered = questions;
    if (settings.type === 'multiple_choice') {
      filtered = questions.filter(q => q.type === QuestionType.MULTIPLE_CHOICE);
    } else if (settings.type === 'fill_in_the_blank') {
      filtered = questions.filter(q => q.type === QuestionType.FILL_IN_THE_BLANK);
    }
    
    if (settings.shuffle) {
      return [...filtered].sort(() => Math.random() - 0.5);
    }
    return filtered;
  }, [questions, settings.shuffle, settings.type]);

  const [phase, setPhase] = useState<QuizPhase>('main');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [incorrectMC, setIncorrectMC] = useState<Question[]>([]);
  const [incorrectFIB, setIncorrectFIB] = useState<Question[]>([]);
  
  const [fibLockdownQueue, setFibLockdownQueue] = useState<Question[]>([]);
  const [finalRetryQueue, setFinalRetryQueue] = useState<Question[]>([]);
  
  const [correctlyAnsweredIds, setCorrectlyAnsweredIds] = useState<Set<number>>(new Set());
  
  const [activeQuestion, setActiveQuestion] = useState<Question>(quizQuestions[0]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);

  useEffect(() => {
    if (!quizQuestions || quizQuestions.length === 0) {
        onQuizComplete(0, 0);
        return;
    }

    let currentQ: Question | undefined;
    if (phase === 'main') {
        currentQ = quizQuestions[currentIndex];
    } else if (phase === 'fib_lockdown') {
        currentQ = fibLockdownQueue[0];
    } else if (phase === 'final_retry') {
        currentQ = finalRetryQueue[currentIndex];
    }

    if (currentQ) {
        setActiveQuestion(currentQ);
    } else if (phase !== 'finished') {
        // This condition handles moving between phases correctly when a queue runs out
        if (phase === 'main') {
           const allIncorrect = [...new Set([...incorrectMC, ...incorrectFIB])];
            if (allIncorrect.length > 0) {
              setPhase('final_retry');
              setFinalRetryQueue(allIncorrect);
              setCurrentIndex(0);
            } else {
              setPhase('finished');
            }
        } else {
             setPhase('finished');
        }
    }
    
    if (phase === 'finished') {
        onQuizComplete(correctlyAnsweredIds.size, quizQuestions.length);
    }

  }, [phase, currentIndex, quizQuestions, fibLockdownQueue, finalRetryQueue, correctlyAnsweredIds, onQuizComplete, incorrectMC, incorrectFIB]);
  
  const moveToNextQuestion = useCallback(() => {
    setFeedback(null);
    setSelectedAnswer(null);
    setInputValue('');

    if (phase === 'main') {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex); // useEffect will handle the rest
    } else if (phase === 'final_retry') {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex); // useEffect will handle the rest
    }
  }, [phase, currentIndex]);

  const handleSubmit = useCallback(() => {
    if (feedback || !activeQuestion) return;

    const answer = activeQuestion.type === QuestionType.MULTIPLE_CHOICE ? selectedAnswer : inputValue.trim().toLowerCase();
    const isCorrect = answer?.toLowerCase() === activeQuestion.correctAnswer.toLowerCase();

    setFeedback({
        correct: isCorrect,
        message: isCorrect ? 'Correct!' : `The correct answer is: ${activeQuestion.correctAnswer}`,
    });

    if (isCorrect) {
        setCorrectlyAnsweredIds(prev => new Set(prev).add(activeQuestion.id));
        
        if (phase === 'fib_lockdown') {
            setTimeout(() => {
                const newQueue = fibLockdownQueue.filter(q => q.id !== activeQuestion.id);
                if (newQueue.length === 0) {
                    setPhase('main');
                    setIncorrectFIB([]); // Clear list
                    // Move to the next question in the main quiz, skipping the one that triggered lockdown
                    setCurrentIndex(currentIndex + 1);
                } else {
                    setFibLockdownQueue(newQueue);
                }
                setFeedback(null);
                setInputValue('');
            }, 1000);
        }
    } else { // Incorrect Answer
        if (phase === 'main') {
            if (activeQuestion.type === QuestionType.MULTIPLE_CHOICE) {
                if (!incorrectMC.find(q => q.id === activeQuestion.id)) {
                    setIncorrectMC(prev => [...prev, activeQuestion]);
                }
            } else { // It's a FILL_IN_THE_BLANK
                const newIncorrectFIB = incorrectFIB.find(q => q.id === activeQuestion.id)
                    ? incorrectFIB
                    : [...incorrectFIB, activeQuestion];

                setIncorrectFIB(newIncorrectFIB);

                if (newIncorrectFIB.length > FIB_LOCKDOWN_THRESHOLD) {
                    setTimeout(() => {
                        setPhase('fib_lockdown');
                        setFibLockdownQueue(newIncorrectFIB);
                        setFeedback(null);
                        setInputValue('');
                    }, 1500);
                }
            }
        } else if (phase === 'fib_lockdown') {
            setTimeout(() => {
                const newQueue = [...fibLockdownQueue.slice(1), fibLockdownQueue[0]];
                setFibLockdownQueue(newQueue);
                setFeedback(null);
                setInputValue('');
            }, 1500);
        }
    }
}, [feedback, activeQuestion, selectedAnswer, inputValue, phase, fibLockdownQueue, incorrectFIB, incorrectMC, currentIndex]);


  if (!activeQuestion) {
    return <div className="text-center p-8">Loading quiz...</div>;
  }

  const renderMultipleChoice = () => {
    const mcQuestion = activeQuestion as Extract<Question, { type: QuestionType.MULTIPLE_CHOICE }>;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {mcQuestion.options.map(option => {
          const isSelected = selectedAnswer === option;
          let buttonClass = 'p-4 rounded-lg text-left transition-colors duration-200 w-full ';
          if (feedback) {
            if (option === mcQuestion.correctAnswer) {
              buttonClass += 'bg-green-700 text-white';
            } else if (isSelected && !feedback.correct) {
              buttonClass += 'bg-red-700 text-white';
            } else {
              buttonClass += 'bg-slate-700 text-slate-300 cursor-not-allowed';
            }
          } else {
            buttonClass += isSelected ? 'bg-amber-500 text-slate-900' : 'bg-slate-700 hover:bg-slate-600';
          }

          return (
            <button key={option} onClick={() => !feedback && setSelectedAnswer(option)} disabled={!!feedback} className={buttonClass}>
              {option}
            </button>
          );
        })}
      </div>
    );
  };
  
  const renderFillInTheBlank = () => {
    return (
      <div className="mt-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Type your answer here"
          disabled={!!feedback}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
        />
      </div>
    );
  };

  const getProgressText = () => {
    if (phase === 'main') return `Question ${currentIndex + 1} of ${quizQuestions.length}`;
    if (phase === 'fib_lockdown') return `Fill-in-the-Blank Lockdown! (${fibLockdownQueue.length} remaining)`;
    if (phase === 'final_retry') return `Final Retry ${currentIndex + 1} of ${finalRetryQueue.length}`;
    return 'Quiz Finished';
  };

  return (
    <div className="container mx-auto max-w-3xl flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
      <Card>
        <div className="mb-6">
           <p className="text-amber-400 font-bold">{getProgressText()}</p>
          <h2 className="text-2xl mt-2">{activeQuestion.questionText}</h2>
        </div>
        
        {activeQuestion.type === QuestionType.MULTIPLE_CHOICE ? renderMultipleChoice() : renderFillInTheBlank()}

        {feedback && (
          <div className={`mt-6 p-4 rounded-lg text-center font-bold ${feedback.correct ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
            {feedback.message}
          </div>
        )}

        <div className="mt-8 text-center">
          {!feedback ? (
            <button 
              onClick={handleSubmit} 
              disabled={!selectedAnswer && !inputValue}
              className="px-8 py-3 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300"
            >
              Submit Answer
            </button>
          ) : (
            // The 'Next' button is only shown when there is feedback and we are NOT in lockdown mode (which auto-progresses)
            phase !== 'fib_lockdown' && (
              <button 
                onClick={moveToNextQuestion}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-colors duration-300"
              >
                Next
              </button>
            )
          )}
        </div>
      </Card>
    </div>
  );
};

export default QuizView;