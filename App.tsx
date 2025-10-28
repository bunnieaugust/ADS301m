
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import LearningView from './components/LearningView';
import QuizView from './components/QuizView';
import ResultsView from './components/ResultsView';
import SessionNavbar from './components/SessionNavbar';
import LoginView from './components/LoginView';
import Header from './components/Header';
import SettingsView from './components/SettingsView';
import { allLearningContent, allQuizQuestions, availableSessions } from './constants';
import { Session, User, QuestionType } from './types';
import Card from './components/Card';

interface QuizSettings {
  shuffle: boolean;
  type: 'all' | 'multiple_choice' | 'fill_in_the_blank';
}

const App: React.FC = () => {
  type AppView = 'login' | 'app' | 'settings';
  type MainContentView = 'home' | 'learn' | 'quiz' | 'results';
  
  const [appView, setAppView] = useState<AppView>('login');
  const [currentView, setCurrentView] = useState<MainContentView>('home');
  
  const [user, setUser] = useState<User | null>(null);
  const [score, setScore] = useState(0);
  const [lastQuizTotal, setLastQuizTotal] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<number>(availableSessions[0].id);
  const [quizSettings, setQuizSettings] = useState<QuizSettings>({ shuffle: true, type: 'all' });

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

  const handleQuizComplete = useCallback((finalScore: number, totalQuestionsInQuiz: number) => {
    setScore(finalScore);
    setLastQuizTotal(totalQuestionsInQuiz);
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
  
  const filteredQuestions = useMemo(() => {
    const currentQuestions = allQuizQuestions[selectedSessionId] || [];
    if (quizSettings.type === 'multiple_choice') {
      return currentQuestions.filter(q => q.type === QuestionType.MULTIPLE_CHOICE);
    }
    if (quizSettings.type === 'fill_in_the_blank') {
      return currentQuestions.filter(q => q.type === QuestionType.FILL_IN_THE_BLANK);
    }
    return currentQuestions;
  }, [selectedSessionId, quizSettings.type]);
  
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

        <div className="mt-6 max-w-lg mx-auto">
            <Card className="bg-slate-800/50 !p-4">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-slate-300 font-semibold">Question Types</label>
                        <div className="inline-flex rounded-md shadow-sm" role="group">
                            <button type="button" onClick={() => setQuizSettings(s => ({...s, type: 'all'}))} className={`px-3 py-1 text-sm font-medium rounded-l-lg transition-colors ${quizSettings.type === 'all' ? 'bg-amber-500 text-slate-900' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}>All</button>
                            <button type="button" onClick={() => setQuizSettings(s => ({...s, type: 'multiple_choice'}))} className={`px-3 py-1 text-sm font-medium transition-colors border-x border-slate-600 ${quizSettings.type === 'multiple_choice' ? 'bg-amber-500 text-slate-900' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}>MC</button>
                            <button type="button" onClick={() => setQuizSettings(s => ({...s, type: 'fill_in_the_blank'}))} className={`px-3 py-1 text-sm font-medium rounded-r-lg transition-colors ${quizSettings.type === 'fill_in_the_blank' ? 'bg-amber-500 text-slate-900' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}>Text</button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                         <label htmlFor="shuffle-toggle" className="text-slate-300 font-semibold">Shuffle Questions</label>
                         <label htmlFor="shuffle-toggle" className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input id="shuffle-toggle" type="checkbox" className="sr-only" checked={quizSettings.shuffle} onChange={e => setQuizSettings(s => ({...s, shuffle: e.target.checked}))} />
                                <div className="block bg-slate-600 w-14 h-8 rounded-full"></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${quizSettings.shuffle ? 'translate-x-6 bg-amber-400' : ''}`}></div>
                            </div>
                        </label>
                    </div>
                </div>
            </Card>
        </div>

        <p className="mt-4 text-slate-400">
          {bestScore !== null ? `Your best score: ${bestScore} / ${filteredQuestions.length}` : `Take the quiz (${filteredQuestions.length} questions) to set a high score!`}
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
                  settings={quizSettings}
                />;
      case 'results':
        return <ResultsView score={score} totalQuestions={lastQuizTotal} onRestart={handleRestart} />;
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
