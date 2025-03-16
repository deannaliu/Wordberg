import React from 'react';
import GameBoard from './components/GameBoard.jsx';
import { GameProvider } from './contexts/GameContext.jsx'; // Updated import path

const App = () => {
  return (
    <GameProvider>
      <div className="App">
        <h1 className="text-3xl font-bold text-center my-4">Wordberg</h1>
        <div className="flex justify-center">
          <GameBoard />
        </div>
      </div>
    </GameProvider>
  );
};

export default App;