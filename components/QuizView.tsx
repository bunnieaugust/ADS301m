import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Question, QuestionType } from '../types';
import Card from './Card';

interface QuizViewProps {
  questions: Question[];
  onQuizComplete: (score: number) => void;
  userId: string;
  sessionId: number;
}

interface QuizState {
  mainQuestionIndex: number;
  retryQueue: Question[];
  currentRetryBatch: Question[];
  currentRetryIndex: number;
  specialRetryBatch: Question[];
  specialRetryIndex: number;
  correctlyAnsweredIds: number[];
  correctAnswersSinceLastRetry: number;
}

const QuizView: React.FC<QuizViewProps> = ({ questions, onQuizComplete, userId, sessionId }) => {
  const storageKey = useMemo(() => `quizState_${userId}_${sessionId}`, [userId, sessionId]);

  const getInitialState = (): QuizState => {
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      // Rehydrate questions from props to avoid stale data
      const getQuestionById = (id: number) => questions.find(q => q.id === id);
      return {
        ...parsedState,
        retryQueue: parsedState.retryQueue.map(getQuestionById).filter(Boolean),
        currentRetryBatch: parsedState.currentRetryBatch.map(getQuestionById).filter(Boolean),
        specialRetryBatch: parsedState.specialRetryBatch.map(getQuestionById).filter(Boolean),
      };
    }
    return {
      mainQuestionIndex: 0,
      retryQueue: [],
      currentRetryBatch: [],
      currentRetryIndex: 0,
      specialRetryBatch: [],
      specialRetryIndex: 0,
      correctlyAnsweredIds: [],
      correctAnswersSinceLastRetry: 0,
    };
  };

  const [state, setState] = useState<QuizState>(getInitialState);
  const [activeQuestion, setActiveQuestion] = useState<Question>(questions[0]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);

  useEffect(() => {
    // Save state to local storage on every change
    // We store question IDs instead of full objects to keep storage light
    const stateToSave = {
      ...state,
      retryQueue: state.retryQueue.map(q => q.id),
      currentRetryBatch: state.currentRetryBatch.map(q => q.id),
      specialRetryBatch: state.specialRetryBatch.map(q => q.id),
    };
    localStorage.setItem(storageKey, JSON.stringify(stateToSave));
  }, [state, storageKey]);

  useEffect(() => {
    // When the component initializes or questions change, determine the active question from the state
    const { mainQuestionIndex, currentRetryBatch, currentRetryIndex, specialRetryBatch, specialRetryIndex } = state;
    
    let currentQ: Question | undefined;
    if (specialRetryBatch.length > 0) {
      currentQ = specialRetryBatch[specialRetryIndex];
    } else if (currentRetryBatch.length > 0) {
      currentQ = currentRetryBatch[currentRetryIndex];
    } else if (mainQuestionIndex < questions.length) {
      currentQ = questions[mainQuestionIndex];
    }

    if (currentQ) {
      setActiveQuestion(currentQ);
    } else {
      // If no question is found (e.g., state is out of sync), finish the quiz.
      onQuizComplete(state.correctlyAnsweredIds.length);
    }
  }, [state, questions, onQuizComplete]);
  

  const moveToNextQuestion = useCallback(() => {
    setFeedback(null);
    setSelectedAnswer(null);
    setInputValue('');

    setState(prevState => {
      let newState = { ...prevState };

      // Phase 1: In a special bonus retry batch?
      if (newState.specialRetryBatch.length > 0) {
        const nextSpecialIndex = newState.specialRetryIndex + 1;
        if (nextSpecialIndex < newState.specialRetryBatch.length) {
          newState.specialRetryIndex = nextSpecialIndex;
          return newState;
        } else {
          newState.specialRetryBatch = [];
          newState.specialRetryIndex = 0;
        }
      }
      
      // Phase 2: Earned a bonus retry batch?
      const inMainQuiz = newState.mainQuestionIndex < questions.length;
      if (inMainQuiz && newState.correctAnswersSinceLastRetry >= 8 && newState.retryQueue.length > 0) {
        newState.specialRetryBatch = newState.retryQueue.slice(0, 3);
        newState.specialRetryIndex = 0;
        newState.correctAnswersSinceLastRetry -= 8;
        return newState;
      }

      // Phase 3: In the FINAL retry loop?
      if (newState.currentRetryBatch.length > 0) {
        const nextRetryIndex = newState.currentRetryIndex + 1;
        if (nextRetryIndex < newState.currentRetryBatch.length) {
          newState.currentRetryIndex = nextRetryIndex;
          return newState;
        } else {
          newState.currentRetryBatch = [];
          newState.currentRetryIndex = 0;
        }
      }

      // Phase 4: Advance the main quiz
      const nextMainIndex = newState.mainQuestionIndex + 1;
      if (nextMainIndex < questions.length) {
        newState.mainQuestionIndex = nextMainIndex;
        return newState;
      }
      if (newState.mainQuestionIndex < questions.length) { // Ensure index is updated if not already at the end
          newState.mainQuestionIndex = nextMainIndex;
      }

      // Phase 5: Main quiz done, start FINAL retry loop?
      if (newState.retryQueue.length > 0) {
        newState.currentRetryBatch = newState.retryQueue.slice(0, 5);
        newState.currentRetryIndex = 0;
        return newState;
      }

      // If we get here, everything is done. The effect will trigger completion.
      return newState;
    });
  }, [questions.length]);
  
  // Effect to handle quiz completion
  useEffect(() => {
      const { mainQuestionIndex, retryQueue, specialRetryBatch, currentRetryBatch } = state;
      if (mainQuestionIndex >= questions.length && retryQueue.length === 0 && specialRetryBatch.length === 0 && currentRetryBatch.length === 0) {
          onQuizComplete(state.correctlyAnsweredIds.length);
      }
  }, [state, questions.length, onQuizComplete]);

  const handleSubmit = useCallback(() => {
    if (feedback) return;

    const answer = activeQuestion.type === QuestionType.MULTIPLE_CHOICE ? selectedAnswer : inputValue.trim().toLowerCase();
    const isCorrect = answer?.toLowerCase() === activeQuestion.correctAnswer.toLowerCase();

    if (isCorrect) {
      setState(prev => ({
          ...prev,
          correctlyAnsweredIds: prev.correctlyAnsweredIds.includes(activeQuestion.id) ? prev.correctlyAnsweredIds : [...prev.correctlyAnsweredIds, activeQuestion.id],
          correctAnswersSinceLastRetry: prev.correctAnswersSinceLastRetry + 1,
          retryQueue: prev.retryQueue.filter(q => q.id !== activeQuestion.id),
      }));
      setFeedback({ correct: true, message: 'Correct!' });
      setTimeout(moveToNextQuestion, 1000);
    } else {
      setState(prev => ({
          ...prev,
          retryQueue: prev.retryQueue.find(q => q.id === activeQuestion.id) ? prev.retryQueue : [...prev.retryQueue, activeQuestion],
      }));
      setFeedback({ correct: false, message: `The correct answer is: ${activeQuestion.correctAnswer}` });
    }
  }, [feedback, activeQuestion, selectedAnswer, inputValue, moveToNextQuestion]);

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

  const isQuizFinished = state.mainQuestionIndex >= questions.length && state.retryQueue.length === 0 && state.specialRetryBatch.length === 0;
  
  return (
    <div className="container mx-auto max-w-3xl flex items-center justify-center min-h-screen p-4">
      <Card>
        <div className="mb-6">
           {state.specialRetryBatch.length > 0 ? (
            <p className="text-cyan-400 font-bold">Bonus Retry! ({state.specialRetryIndex + 1} of {state.specialRetryBatch.length})</p>
           ) : state.currentRetryBatch.length > 0 ? (
            <p className="text-yellow-400 font-bold">Retry Question {state.currentRetryIndex + 1} of {state.currentRetryBatch.length} (Total remaining: {state.retryQueue.length})</p>
           ) : (
            <p className="text-amber-400 font-bold">Question {state.mainQuestionIndex + 1} of {questions.length}</p>
           )}
           <p className="text-slate-300 text-sm mt-1">Correct answers for next retry: {state.correctAnswersSinceLastRetry} / 8</p>
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
              onClick={moveToNextQuestion}
              disabled={feedback.correct} 
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-wait transition-colors duration-300"
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
