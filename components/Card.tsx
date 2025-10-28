
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-700 w-full ${className}`}>
      {children}
    </div>
  );
};

export default Card;
