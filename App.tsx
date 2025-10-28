
import React, { useState, useCallback, useEffect } from 'react';
import LearningView from './components/LearningView';
import QuizView from './components/QuizView';
import ResultsView from './components/ResultsView';
import SessionNavbar from './components/SessionNavbar';
import LoginView from './components/LoginView';
import Header from './components/Header';
import SettingsView from './components/SettingsView';
import { allLearningContent, allQuizQuestions, availableSessions } from './constants';
import { Session, User } from './types';

const App: React.FC = () => {
  type AppView = 'login' | 'app' | 'settings';
  type MainContentView = 'home' | 'learn' | 'quiz' | 'results';
  
  const [appView, setAppView] = useState<AppView>('login');
  const [currentView, setCurrentView] = useState<MainContentView>('home');
  
  const [user, setUser] = useState<User | null>(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<number>(availableSessions[0].id);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setAppView('app');
    }
  }, []);

  useEffect(() => {
    if (user) {
      const userDataKey = `userData_${user.id}`;
      const storedData = localStorage.getItem(userDataKey);
      if (storedData) {
        const data = JSON.parse(storedData);
        const sessionScore = data.sessionScores?.[selectedSessionId];
        setBestScore(sessionScore ?? null);
      } else {
        setBestScore(null);
      }
    }
  }, [user, selectedSessionId]);

  const handleLogin = (authenticatedUser: User) => {
    // For good practice, we don't store the password in the session or state.
    const { password, ...userToStore } = authenticatedUser;
    localStorage.setItem('currentUser', JSON.stringify(userToStore));
    setUser(userToStore as User);
    setAppView('app');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setAppView('login');
    setCurrentView('home');
  };

  const handleSaveSettings = (newNickname: string, newPassword?: string) => {
    if (user) {
      const USERS_STORAGE_KEY = 'learning_hub_users';
      const allUsers: User[] = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
      
      const trimmedNickname = newNickname.trim();
      const isTaken = allUsers.some(u => u.nickname.toLowerCase() === trimmedNickname.toLowerCase() && u.id !== user.id);

      if (isTaken) {
        alert('This nickname is already taken. Please choose another one.');
        return;
      }
      
      const updatedFields: Partial<User> = { nickname: trimmedNickname };
      if (newPassword) {
        updatedFields.password = newPassword;
      }

      // Update the main user list in localStorage
      const updatedUsers = allUsers.map(u => 
        u.id === user.id ? { ...u, ...updatedFields } : u
      );
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      
      // Update the user state and current user in localStorage
      const updatedUserForState = { ...user, nickname: trimmedNickname };
      localStorage.setItem('currentUser', JSON.stringify(updatedUserForState));
      setUser(updatedUserForState);
      setAppView('app');
      alert('Your settings have been saved successfully!');
    }
  };

  const clearQuizState = useCallback(() => {
    if (user) {
      const storageKey = `quizState_${user.id}_${selectedSessionId}`;
      localStorage.removeItem(storageKey);
    }
  }, [user, selectedSessionId]);

  const handleQuizComplete = useCallback((finalScore: number) => {
    setScore(finalScore);
    setCurrentView('results');
    clearQuizState(); // Clear saved progress upon completion

    if (user) {
      const userDataKey = `userData_${user.id}`;
      const storedData = localStorage.getItem(userDataKey);
      const data = storedData ? JSON.parse(storedData) : { sessionScores: {} };
      
      const previousBest = data.sessionScores[selectedSessionId] || 0;
      data.sessionScores[selectedSessionId] = Math.max(previousBest, finalScore);
      
      localStorage.setItem(userDataKey, JSON.stringify(data));
      setBestScore(data.sessionScores[selectedSessionId]);
    }
  }, [user, selectedSessionId, clearQuizState]);

  const handleRestart = useCallback(() => {
    setScore(0);
    setCurrentView('home');
  }, []);

  const handleSelectSession = useCallback((id: number) => {
    setSelectedSessionId(id);
    setCurrentView('home');
  }, []);

  const handleStartQuiz = () => {
    clearQuizState();
    setCurrentView('quiz');
  };
  
  const renderHome = () => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] p-4 text-center">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-amber-400">Google Ads & SEO</h1>
        <h2 className="text-2xl md:text-4xl font-semibold mt-2 text-white">ADS301m Learning Hub</h2>
        <p className="mt-6 text-lg text-slate-300">
          Choose a session below to start learning or take a quiz. Your progress will be saved.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setCurrentView('learn')}
            className="px-8 py-3 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-colors duration-300 shadow-lg text-lg"
          >
            Learn Session {selectedSessionId}
          </button>
          <button
            onClick={handleStartQuiz}
            className="px-8 py-3 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-600 transition-colors duration-300 shadow-lg text-lg"
          >
            Quiz for Session {selectedSessionId}
          </button>
        </div>
        <p className="mt-4 text-slate-400">
          {bestScore !== null ? `Your best score: ${bestScore} / ${allQuizQuestions[selectedSessionId].length}` : 'Take the quiz to set a high score!'}
        </p>
      </div>
    </div>
  );

  const renderMainContent = () => {
    if (!user) return null;
    const currentSessionContent = allLearningContent[selectedSessionId];
    const currentQuizQuestions = allQuizQuestions[selectedSessionId];
    
    switch (currentView) {
      case 'home':
        return renderHome();
      case 'learn':
        return <LearningView session={currentSessionContent} onStartQuiz={handleStartQuiz} />;
      case 'quiz':
        return <QuizView 
                  questions={currentQuizQuestions} 
                  onQuizComplete={handleQuizComplete}
                  userId={user.id}
                  sessionId={selectedSessionId}
                />;
      case 'results':
        return <ResultsView score={score} totalQuestions={currentQuizQuestions.length} onRestart={handleRestart} />;
      default:
        return renderHome();
    }
  };

  if (appView === 'login') {
    return <LoginView onLogin={handleLogin} />;
  }

  if (appView === 'settings' && user) {
    return <SettingsView user={user} onSave={handleSaveSettings} onBack={() => setAppView('app')} />;
  }

  if (appView === 'app' && user) {
    return (
      <>
        <Header 
          user={user} 
          onLogout={handleLogout} 
          onGoToSettings={() => setAppView('settings')}
          onGoHome={() => setCurrentView('home')}
          showHomeButton={currentView !== 'home'}
        />
        <main className="bg-slate-900 min-h-screen antialiased">
          <div className="container mx-auto max-w-4xl p-4 sm:p-8">
            <SessionNavbar 
              sessions={availableSessions}
              selectedSessionId={selectedSessionId}
              onSessionChange={handleSelectSession}
            />
            {renderMainContent()}
          </div>
        </main>
      </>
    );
  }

  return null; // Should not happen
};

export default App;
