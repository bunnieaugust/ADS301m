import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  onGoToSettings: () => void;
  onGoHome?: () => void;
  showHomeButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onGoToSettings, onGoHome, showHomeButton }) => {
  return (
    <header className="bg-slate-800 p-4 shadow-md sticky top-0 z-10 border-b border-slate-700">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          {showHomeButton && (
            <button
              onClick={onGoHome}
              className="px-4 py-2 text-sm bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors"
              aria-label="Go to home"
            >
              Home
            </button>
          )}
          <div className="text-lg font-semibold text-amber-400">
            {user.nickname}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onGoToSettings}
            className="px-4 py-2 text-sm bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors"
            aria-label="Open settings"
          >
            Settings
          </button>
          <button 
            onClick={onLogout}
            className="px-4 py-2 text-sm bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-colors"
            aria-label="Log out"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
