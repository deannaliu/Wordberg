import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

const ResetButton = ({ setPlayers }) => {
  const { resetBoard } = useContext(GameContext);

  const handleReset = () => {
    // Reset board
    resetBoard();
    
    // Reset players
    setPlayers(prev => ({
      player1: {
        ...prev.player1,
        selectedLetters: [],
        isCurrentTurn: true
      },
      player2: {
        ...prev.player2,
        selectedLetters: [],
        isCurrentTurn: false
      }
    }));
  };

  return (
    <button
      onClick={handleReset}
      className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg transition-colors"
    >
      Reset Game
    </button>
  );
};

export default ResetButton; 