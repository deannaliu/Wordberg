import React from 'react';

const Timer = ({ timeLeft, className = "" }) => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
      <div className={`bg-gray-800 text-white px-12 py-6 rounded-xl text-6xl font-bold shadow-2xl flex items-center justify-center min-w-[200px] ${className}`}>
        {timeLeft}s
      </div>
    </div>
  );
};

export default Timer; 