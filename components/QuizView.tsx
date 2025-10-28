import React, { useState, useCallback, useEffect } from 'react';
import { Question, QuestionType } from '../types';
import Card from './Card';

interface QuizViewProps {
  questions: Question[];
  onQuizComplete: (score: number) => void;
}

const QuizView: React.FC<QuizViewProps> = ({ questions, onQuizComplete }) => {
  const [mainQuestionIndex, setMainQuestionIndex] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState<Question>(questions[0]);
  
  const [retryQueue, setRetryQueue] = useState<Question[]>([]);
  const [currentRetryBatch, setCurrentRetryBatch] = useState<Question[]>([]);
  const [currentRetryIndex, setCurrentRetryIndex] = useState(0);
  
  const [specialRetryBatch, setSpecialRetryBatch] = useState<Question[]>([]);
  const [specialRetryIndex, setSpecialRetryIndex] = useState(0);

  const [correctlyAnsweredIds, setCorrectlyAnsweredIds] = useState<Set<number>>(new Set());
  const [correctAnswersSinceLastRetry, setCorrectAnswersSinceLastRetry] = useState(0);
  
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  
  // Reset state when questions prop changes (new session starts)
  useEffect(() => {
    setMainQuestionIndex(0);
    setActiveQuestion(questions[0]);
    setRetryQueue([]);
    setCurrentRetryBatch([]);
    setCurrentRetryIndex(0);
    setSpecialRetryBatch([]);
    setSpecialRetryIndex(0);
    setCorrectlyAnsweredIds(new Set());
    setCorrectAnswersSinceLastRetry(0);
    setSelectedAnswer(null);
    setInputValue('');
    setFeedback(null);
  }, [questions]);


  const handleSubmit = useCallback(() => {
    if (feedback) return;

    const answer = activeQuestion.type === QuestionType.MULTIPLE_CHOICE ? selectedAnswer : inputValue.trim().toLowerCase();
    const isCorrect = answer?.toLowerCase() === activeQuestion.correctAnswer.toLowerCase();

    if (isCorrect) {
      if (!correctlyAnsweredIds.has(activeQuestion.id)) {
        setCorrectlyAnsweredIds(prev => new Set(prev).add(activeQuestion.id));
      }
      setCorrectAnswersSinceLastRetry(prev => prev + 1);
      setRetryQueue(prev => prev.filter(q => q.id !== activeQuestion.id));
      setFeedback({ correct: true, message: 'Correct!' });
    } else {
      setRetryQueue(prev => {
        if (prev.find(q => q.id === activeQuestion.id)) {
          return prev;
        }
        return [...prev, activeQuestion];
      });
      setFeedback({ correct: false, message: `The correct answer is: ${activeQuestion.correctAnswer}` });
    }
  }, [feedback, activeQuestion, selectedAnswer, inputValue, correctlyAnsweredIds]);

  const handleNext = useCallback(() => {
    setFeedback(null);
    setSelectedAnswer(null);
    setInputValue('');

    // Phase 1: Are we IN a special bonus retry batch?
    if (specialRetryBatch.length > 0) {
      const nextSpecialIndex = specialRetryIndex + 1;
      if (nextSpecialIndex < specialRetryBatch.length) {
        setSpecialRetryIndex(nextSpecialIndex);
        setActiveQuestion(specialRetryBatch[nextSpecialIndex]);
        return;
      } else {
        setSpecialRetryBatch([]);
        setSpecialRetryIndex(0);
      }
    }

    // Phase 2: Have we earned a bonus retry batch? (Check before advancing)
    const inMainQuiz = mainQuestionIndex < questions.length;
    if (inMainQuiz && correctAnswersSinceLastRetry >= 8 && retryQueue.length > 0) {
      const newSpecialBatch = retryQueue.slice(0, 3);
      setSpecialRetryBatch(newSpecialBatch);
      setSpecialRetryIndex(0);
      setActiveQuestion(newSpecialBatch[0]);
      setCorrectAnswersSinceLastRetry(prev => prev - 8);
      return;
    }

    // Phase 3: Are we in the FINAL retry loop (post-main quiz)?
    if (currentRetryBatch.length > 0) {
      const nextRetryIndex = currentRetryIndex + 1;
      if (nextRetryIndex < currentRetryBatch.length) {
        setCurrentRetryIndex(nextRetryIndex);
        setActiveQuestion(currentRetryBatch[nextRetryIndex]);
        return;
      } else {
        setCurrentRetryBatch([]);
        setCurrentRetryIndex(0);
      }
    }

    // Phase 4: Advance the main quiz
    const nextMainIndex = mainQuestionIndex + 1;
    if (nextMainIndex < questions.length) {
      setMainQuestionIndex(nextMainIndex);
      setActiveQuestion(questions[nextMainIndex]);
      return;
    }

    // Phase 5: Main quiz is done, check if we need to start the FINAL retry loop
    if (retryQueue.length > 0) {
      const nextBatch = retryQueue.slice(0, 5);
      setCurrentRetryBatch(nextBatch);
      setCurrentRetryIndex(0);
      setActiveQuestion(nextBatch[0]);
      return;
    }

    // Phase 6: Everything is done
    onQuizComplete(correctlyAnsweredIds.size);
  }, [
    mainQuestionIndex, questions, retryQueue, onQuizComplete, correctlyAnsweredIds.size,
    correctAnswersSinceLastRetry, specialRetryBatch, specialRetryIndex,
    currentRetryBatch, currentRetryIndex
  ]);

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
          placeholder="Type your answer here (2 words)"
          disabled={!!feedback}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
        />
      </div>
    );
  };

  const isQuizFinished = mainQuestionIndex >= questions.length - 1 && retryQueue.length === 0 && specialRetryBatch.length === 0;
  
  return (
    <div className="container mx-auto max-w-3xl flex items-center justify-center min-h-screen p-4">
      <Card>
        <div className="mb-6">
           {specialRetryBatch.length > 0 ? (
            <p className="text-cyan-400 font-bold">Bonus Retry! ({specialRetryIndex + 1} of {specialRetryBatch.length})</p>
           ) : currentRetryBatch.length > 0 ? (
            <p className="text-yellow-400 font-bold">Retry Question {currentRetryIndex + 1} of {currentRetryBatch.length} (Total remaining: {retryQueue.length})</p>
           ) : (
            <p className="text-amber-400 font-bold">Question {mainQuestionIndex + 1} of {questions.length}</p>
           )}
           <p className="text-slate-300 text-sm mt-1">Correct answers for next retry: {correctAnswersSinceLastRetry} / 8</p>
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
            <button 
              onClick={handleNext} 
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-colors duration-300"
            >
              {isQuizFinished ? 'Finish Quiz' : 'Next Question'}
            </button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default QuizView;