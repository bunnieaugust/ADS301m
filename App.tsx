import React, { useState, useCallback } from 'react';
import LearningView from './components/LearningView';
import QuizView from './components/QuizView';
import ResultsView from './components/ResultsView';
import SessionNavbar from './components/SessionNavbar';
import { allLearningContent, allQuizQuestions, availableSessions } from './constants';
import { Session } from './types';

const App: React.FC = () => {
  type View = 'home' | 'learn' | 'quiz' | 'results';
  const [currentView, setCurrentView] = useState<View>('home');
  const [score, setScore] = useState(0);
  const [selectedSessionId, setSelectedSessionId] = useState<number>(availableSessions[0].id);

  const handleQuizComplete = useCallback((finalScore: number) => {
    setScore(finalScore);
    setCurrentView('results');
  }, []);

  const handleRestart = useCallback(() => {
    setScore(0);
    setCurrentView('home');
  }, []);

  const handleSelectSession = useCallback((id: number) => {
    setSelectedSessionId(id);
    // If in quiz or learn view, stay there but with new content
    if (currentView !== 'home' && currentView !== 'results') {
      setCurrentView('learn');
    }
  }, [currentView]);
  
  const renderHome = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-amber-400">Google Ads & SEO</h1>
        <h2 className="text-2xl md:text-4xl font-semibold mt-2 text-white">ADS301m Learning Hub</h2>
        <p className="mt-6 text-lg text-slate-300">
          This is an interactive learning tool based on the FPT Education course material.
          Choose a session below to start learning or take a quiz.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setCurrentView('learn')}
            className="px-8 py-3 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-colors duration-300 shadow-lg text-lg"
          >
            Learn Session {selectedSessionId}
          </button>
          <button
            onClick={() => setCurrentView('quiz')}
            className="px-8 py-3 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-600 transition-colors duration-300 shadow-lg text-lg"
          >
            Quiz for Session {selectedSessionId}
          </button>
        </div>
        <div className="mt-8">
          <SessionNavbar 
            sessions={availableSessions}
            selectedSessionId={selectedSessionId}
            onSessionChange={handleSelectSession}
          />
        </div>
      </div>
    </div>
  );

  const currentSessionContent = allLearningContent[selectedSessionId];
  const currentQuizQuestions = allQuizQuestions[selectedSessionId];

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return renderHome();
      case 'learn':
        return <LearningView session={currentSessionContent} onStartQuiz={() => setCurrentView('quiz')} />;
      case 'quiz':
        return <QuizView questions={currentQuizQuestions} onQuizComplete={handleQuizComplete} />;
      case 'results':
        return <ResultsView score={score} totalQuestions={currentQuizQuestions.length} onRestart={handleRestart} />;
      default:
        return renderHome();
    }
  };

  return (
    <main className="bg-slate-900 min-h-screen antialiased">
       {currentView !== 'home' && (
         <SessionNavbar 
            sessions={availableSessions}
            selectedSessionId={selectedSessionId}
            onSessionChange={handleSelectSession}
          />
       )}
      {renderContent()}
    </main>
  );
};

export default App;
