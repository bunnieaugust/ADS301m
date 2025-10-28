
import React from 'react';
import { Session } from '../types';
import Card from './Card';

interface LearningViewProps {
  session: Session;
  onStartQuiz: () => void;
}

const LearningView: React.FC<LearningViewProps> = ({ session, onStartQuiz }) => {
  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-400">{session.title}</h1>
        <p className="text-xl text-slate-300 mt-2">{session.subtitle}</p>
      </div>

      <div className="space-y-6">
        {session.topics.map((topic, index) => (
          <Card key={index}>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">{topic.title}</h2>
            <ul className="space-y-3 list-disc list-inside text-slate-200">
              {topic.points.map((point, pIndex) => (
                <li key={pIndex}>{point}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={onStartQuiz}
          className="px-10 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-colors duration-300 shadow-lg text-xl"
        >
          I'm Ready, Start the Quiz!
        </button>
      </div>
    </div>
  );
};

export default LearningView;
