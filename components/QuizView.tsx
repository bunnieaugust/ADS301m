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

type QuizPhase = 'main' | 'bonus_retry' | 'lockdown' | 'finished';
const BONUS_RETRY_THRESHOLD = 8;
const BONUS_RETRY_COUNT = 3;
const LOCKDOWN_THRESHOLD = 4;

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
  const [mainIndex, setMainIndex] = useState(0);
  const [bonusIndex, setBonusIndex] = useState(0);
  const [lockdownIndex, setLockdownIndex] = useState(0);
  
  const [incorrectMC, setIncorrectMC] = useState<Question[]>([]);
  const [incorrectFIB, setIncorrectFIB] = useState<Question[]>([]);
  const [bonusRetryQueue, setBonusRetryQueue] = useState<Question[]>([]);
  const [lockdownQueue, setLockdownQueue] = useState<Question[]>([]);
  
  const [correctAnswersSinceBonus, setCorrectAnswersSinceBonus] = useState(0);
  const [correctlyAnsweredIds, setCorrectlyAnsweredIds] = useState<Set<number>>(new Set());
  
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [lockdownTriggered, setLockdownTriggered] = useState(false);

  useEffect(() => {
    if (quizQuestions.length > 0 && !activeQuestion) {
      setActiveQuestion(quizQuestions[0]);
    }
  }, [quizQuestions, activeQuestion]);

  useEffect(() => {
    if (!quizQuestions || quizQuestions.length === 0) {
        onQuizComplete(0, 0);
        return;
    }

    // Don't change the question if we're in a transitional state
    if (lockdownTriggered) return;

    let currentQ: Question | undefined;

    if (phase === 'main') {
        if (mainIndex >= quizQuestions.length) {
            setPhase('finished');
        } else {
            currentQ = quizQuestions[mainIndex];
        }
    } else if (phase === 'bonus_retry') {
        if (bonusIndex >= bonusRetryQueue.length) {
            setPhase('main');
            setBonusRetryQueue([]);
            setBonusIndex(0);
             // Stay on the same main question index, the bonus round was an interruption
             currentQ = quizQuestions[mainIndex];
        } else {
            currentQ = bonusRetryQueue[bonusIndex];
        }
    } else if (phase === 'lockdown') {
        if (lockdownIndex >= lockdownQueue.length) {
            // Lockdown is over
            setPhase('main');
            setLockdownQueue([]);
            setLockdownIndex(0);
            // We advance past the question that triggered lockdown
            setMainIndex(prev => prev + 1);
            return;
        } else {
            currentQ = lockdownQueue[lockdownIndex];
        }
    }

    if (currentQ) {
        setActiveQuestion(currentQ);
    }

    if (phase === 'finished') {
        onQuizComplete(correctlyAnsweredIds.size, quizQuestions.length);
    }

  }, [phase, mainIndex, bonusIndex, lockdownIndex, quizQuestions, bonusRetryQueue, lockdownQueue, correctlyAnsweredIds.size, onQuizComplete, lockdownTriggered]);
  
  const moveToNextQuestion = useCallback(() => {
    setFeedback(null);
    setSelectedAnswer(null);
    setInputValue('');

    if (phase === 'main') {
      setMainIndex(prev => prev + 1);
    } else if (phase === 'bonus_retry') {
      setBonusIndex(prev => prev + 1);
    } else if (phase === 'lockdown') {
      setLockdownIndex(prev => prev + 1);
    }
  }, [phase]);

  const handleTryAgain = () => {
    setFeedback(null);
    setSelectedAnswer(null);
    setInputValue('');
  };

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
        
        if (phase === 'main') {
            const newCorrectCount = correctAnswersSinceBonus + 1;
            const allIncorrect = [...incorrectMC, ...incorrectFIB];
            
            setTimeout(() => {
                if (newCorrectCount >= BONUS_RETRY_THRESHOLD && allIncorrect.length > 0) {
                    setCorrectAnswersSinceBonus(prev => prev - BONUS_RETRY_THRESHOLD);
                    const questionsForBonus = allIncorrect.slice(0, BONUS_RETRY_COUNT);
                    setBonusRetryQueue(questionsForBonus);
                    setBonusIndex(0);
                    setPhase('bonus_retry');
                    setFeedback(null);
                    setSelectedAnswer(null);
                    setInputValue('');
                } else {
                    setCorrectAnswersSinceBonus(newCorrectCount);
                    moveToNextQuestion();
                }
            }, 1200);
        } else if (phase === 'bonus_retry' || phase === 'lockdown') {
            setIncorrectMC(prev => prev.filter(q => q.id !== activeQuestion.id));
            setIncorrectFIB(prev => prev.filter(q => q.id !== activeQuestion.id));
            setTimeout(moveToNextQuestion, 1000);
        }
    } else { // Incorrect Answer
        if (phase === 'main') {
            const isNewIncorrect = !incorrectMC.some(q => q.id === activeQuestion.id) && !incorrectFIB.some(q => q.id === activeQuestion.id);

            if (isNewIncorrect) {
                const updatedMC = activeQuestion.type === QuestionType.MULTIPLE_CHOICE ? [...incorrectMC, activeQuestion] : incorrectMC;
                const updatedFIB = activeQuestion.type === QuestionType.FILL_IN_THE_BLANK ? [...incorrectFIB, activeQuestion] : incorrectFIB;
                setIncorrectMC(updatedMC);
                setIncorrectFIB(updatedFIB);

                if (updatedMC.length + updatedFIB.length > LOCKDOWN_THRESHOLD) {
                    setLockdownQueue([...updatedMC, ...updatedFIB]);
                    setPhase('lockdown');
                    setLockdownTriggered(true);
                    return; 
                }
            }
        }
    }
}, [feedback, activeQuestion, selectedAnswer, inputValue, phase, correctAnswersSinceBonus, incorrectMC, incorrectFIB, moveToNextQuestion]);


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
    if (lockdownTriggered) return 'Too many mistakes! Entering Lockdown Mode.';
    if (phase === 'main') return `Question ${mainIndex + 1} of ${quizQuestions.length}`;
    if (phase === 'bonus_retry') return `Bonus Round! Fixing question ${bonusIndex + 1} of ${bonusRetryQueue.length}`;
    if (phase === 'lockdown') return `Lockdown: Correcting ${lockdownIndex + 1} of ${lockdownQueue.length}`;
    return 'Quiz Finished';
  };
  
  const renderButtons = () => {
    if (feedback) {
        if (feedback.correct) {
            return null; // Auto-advances
        }
        // Incorrect answer
        if (lockdownTriggered) {
             return (
                <button 
                    onClick={() => {
                        setLockdownTriggered(false);
                        setFeedback(null);
                        setSelectedAnswer(null);
                        setInputValue('');
                    }} 
                    className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 transition-colors duration-300"
                >
                    Start Lockdown
                </button>
            );
        }
        if (phase === 'lockdown') {
            return (
                <button onClick={handleTryAgain} className="px-8 py-3 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-500 transition-colors duration-300">
                    Try Again
                </button>
            );
        }
        // For 'main' and 'bonus_retry' incorrect answers
        return (
            <button onClick={moveToNextQuestion} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-colors duration-300">
                Next Question
            </button>
        );
    }
    // No feedback yet, show submit button
    return (
        <button onClick={handleSubmit} disabled={!selectedAnswer && !inputValue} className="px-8 py-3 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300">
            Submit Answer
        </button>
    );
  };

  const totalIncorrect = incorrectMC.length + incorrectFIB.length;

  return (
    <div className="container mx-auto max-w-3xl flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
      <Card>
        <div className="flex justify-between text-sm text-slate-400 mb-4 border-b border-slate-700 pb-3">
            <span>Correct for Bonus: <strong className="text-green-400 font-mono text-base">{correctAnswersSinceBonus} / {BONUS_RETRY_THRESHOLD}</strong></span>
            <span>Incorrect for Lockdown: <strong className="text-red-400 font-mono text-base">{totalIncorrect} / {LOCKDOWN_THRESHOLD + 1}</strong></span>
        </div>

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
          {renderButtons()}
        </div>
      </Card>
    </div>
  );
};

export default QuizView;