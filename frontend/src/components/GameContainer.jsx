import React from 'react';
import GameBoard from './GameBoard';
import ResetButton from './ResetButton';

const GameContainer = ({ initialPlayers, setPlayers }) => {
  // handleLetterSelect is used to update the players state with the selected letter and its position
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

      {/* Center Content Container */}
      <div className="flex flex-col items-center">
        {/* Game Board */}
        <GameBoard 
          players={initialPlayers}
          onLetterSelect={handleLetterSelect}
        />
        
        {/* Reset Button */}
        <div className="w-full flex justify-center mt-8">
          <ResetButton setPlayers={setPlayers} />
        </div>
      </div>

      {/* Players' Letters Container - Bottom of page */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-between px-8">
        {/* Player 1 Letters */}
        <div className="flex flex-col items-start gap-2">
          <div className={`text-xl mb-4 ${initialPlayers.player1.isCurrentTurn ? 'text-blue-500 font-bold' : 'text-gray-500'}`}>
            {initialPlayers.player1.name}
          </div>
          {/* Player 1 Penguin GIF */}
          <div className="mb-4">
            <img 
              src="https://media1.giphy.com/media/UMBtDBSWNNnbPk915D/giphy.gif" 
              alt="Player 1 Penguin"
              className={`w-40 h-28 object-cover rounded-lg ${!initialPlayers.player1.isCurrentTurn ? 'opacity-50' : ''}`}
              style={{ animationPlayState: initialPlayers.player1.isCurrentTurn ? 'running' : 'paused' }}
            />
          </div>
          <div className="flex flex-row gap-2">
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

        {/* Player 2 Letters */}
        <div className="flex flex-col items-end gap-2">
          <div className={`text-xl mb-4 ${initialPlayers.player2.isCurrentTurn ? 'text-blue-500 font-bold' : 'text-gray-500'}`}>
            {initialPlayers.player2.name}
          </div>
          {/* Player 2 Penguin GIF */}
          <div className="mb-4">
            <img 
              src="https://i.pinimg.com/originals/d1/cc/b0/d1ccb027cb74358f8c5b5eff0d9c087d.gif" 
              alt="Player 2 Penguin"
              className={`w-40 h-28 object-cover rounded-lg ${!initialPlayers.player2.isCurrentTurn ? 'opacity-50' : ''}`}
              style={{ animationPlayState: initialPlayers.player2.isCurrentTurn ? 'running' : 'paused' }}
            />
          </div>
          <div className="flex flex-row gap-2">
            {initialPlayers.player2.selectedLetters.map((item, index) => (
              <div 
                key={index} 
                className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold shadow-md"
              >
                {item.letter}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameContainer; 