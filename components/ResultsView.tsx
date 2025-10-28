
import React, { useMemo } from 'react';
import Card from './Card';

interface ResultsViewProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = useMemo(() => Math.round((score / totalQuestions) * 100), [score, totalQuestions]);

  const getFeedback = () => {
    if (percentage >= 90) return { message: "Excellent!", className: "text-green-400" };
    if (percentage >= 70) return { message: "Great Job!", className: "text-blue-400" };
    if (percentage >= 50) return { message: "Good Effort!", className: "text-yellow-400" };
    return { message: "Keep studying!", className: "text-red-400" };
  };

  const feedback = getFeedback();

  return (
    <div className="container mx-auto max-w-2xl flex items-center justify-center min-h-screen p-4">
      <Card>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-amber-400">Quiz Complete!</h1>
          <p className="mt-4 text-xl text-slate-300">Your final score is:</p>
          
          <div className="my-8">
            <p className="text-7xl font-bold text-white">{score} / {totalQuestions}</p>
            <p className={`text-4xl font-semibold mt-2 ${feedback.className}`}>{percentage}%</p>
          </div>

          <p className={`text-2xl font-bold ${feedback.className}`}>{feedback.message}</p>

          <button
            onClick={onRestart}
            className="mt-10 px-10 py-4 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-colors duration-300 shadow-lg text-xl"
          >
            Try Again
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ResultsView;
