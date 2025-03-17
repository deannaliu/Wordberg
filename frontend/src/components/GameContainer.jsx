import React from 'react';
import GameBoard from './GameBoard';

const GameContainer = ({ initialPlayers, setPlayers }) => {
  const handleLetterSelect = (letter, hexIndex) => {
    setPlayers(prev => ({
      player1: {
        ...prev.player1,
        selectedLetters: prev.player1.isCurrentTurn 
          ? [...prev.player1.selectedLetters, { letter, position: hexIndex }]
          : prev.player1.selectedLetters,
        isCurrentTurn: !prev.player1.isCurrentTurn
      },
      player2: {
        ...prev.player2,
        selectedLetters: prev.player2.isCurrentTurn 
          ? [...prev.player2.selectedLetters, { letter, position: hexIndex }]
          : prev.player2.selectedLetters,
        isCurrentTurn: !prev.player2.isCurrentTurn
      }
    }));
  };

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <div className="w-full text-center py-4 mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Wordberg</h1>
      </div>

      {/* Player 1 letters - Left side */}
      <div className="fixed left-4 top-8 flex flex-col items-center gap-2">
        <div className={`text-xl mb-4 ${initialPlayers.player1.isCurrentTurn ? 'text-blue-500 font-bold' : 'text-gray-500'}`}>
          {initialPlayers.player1.name}
        </div>
        <div className="flex flex-col gap-2">
          {initialPlayers.player1.selectedLetters.map((item, index) => (
            <div 
              key={index} 
              className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold shadow-md"
            >
              {item.letter}
            </div>
          ))}
        </div>
      </div>

      {/* Game Board - Center */}
      <div className="flex justify-center mt-16">
        <GameBoard 
          players={initialPlayers}
          onLetterSelect={handleLetterSelect}
        />
      </div>

      {/* Player 2 letters - Right side */}
      <div className="fixed right-4 top-8 flex flex-col items-center gap-2">
        <div className={`text-xl mb-4 ${initialPlayers.player2.isCurrentTurn ? 'text-blue-500 font-bold' : 'text-gray-500'}`}>
          {initialPlayers.player2.name}
        </div>
        <div className="flex flex-col gap-2">
          {initialPlayers.player2.selectedLetters.map((item, index) => (
            <div 
              key={index} 
              className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold shadow-md"
            >
              {item.letter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameContainer; 