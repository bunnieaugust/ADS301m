import React from 'react';
import { SessionInfo } from '../types';

interface SessionNavbarProps {
  sessions: SessionInfo[];
  selectedSessionId: number;
  onSessionChange: (id: number) => void;
}

const SessionNavbar: React.FC<SessionNavbarProps> = ({ sessions, selectedSessionId, onSessionChange }) => {
  return (
    <nav className="bg-slate-800 p-2 rounded-lg shadow-md mb-8">
      <div className="container mx-auto flex justify-center items-center gap-2 sm:gap-4 flex-wrap">
        {sessions.map(session => {
          const isSelected = session.id === selectedSessionId;
          const buttonClass = `px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base font-semibold rounded-md transition-colors duration-200 ${
            isSelected
              ? 'bg-amber-500 text-slate-900 shadow-lg'
              : 'bg-slate-700 text-white hover:bg-slate-600'
          }`;

          return (
            <button
              key={session.id}
              onClick={() => onSessionChange(session.id)}
              className={buttonClass}
              aria-current={isSelected ? 'page' : undefined}
            >
              {session.title}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default SessionNavbar;
