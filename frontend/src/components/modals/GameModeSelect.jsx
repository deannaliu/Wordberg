import React from 'react';

const GameModeSelect = ({ setGameMode }) => (
  <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4">
    <h2 className="text-xl font-bold mb-4">Choose Game Mode:</h2>
    <div className="flex gap-4">
      <button
        onClick={() => setGameMode('create')}
        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Game
      </button>
      <button
        onClick={() => setGameMode('join')}
        className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Join Game
      </button>
    </div>
  </div>
);

export default GameModeSelect;