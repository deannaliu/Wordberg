import React from 'react';

const GameOverModal = ({ isOpen, players, scores }) => {
  if (!isOpen) return null;

  const getGameResult = () => {
    if (scores.player1 > scores.player2) {
      return `${players.player1.name} Wins!`;
    } else if (scores.player2 > scores.player1) {
      return `${players.player2.name} Wins!`;
    } else {
      return "It's a Tie!";
    }
  };

  const handleReturn = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">{getGameResult()}</h2>
        <div className="mb-6">
          <p className="text-xl">Final Scores:</p>
          <p className="text-blue-600">{players.player1.name}: {scores.player1}</p>
          <p className="text-pink-600">{players.player2.name}: {scores.player2}</p>
        </div>
        <button
          onClick={handleReturn}
          className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-green-600 transition-colors"
        >
          Return to Ice Berg
        </button>
      </div>
    </div>
  );
};

export default GameOverModal; 