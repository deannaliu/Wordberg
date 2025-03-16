import React, { useState } from 'react';
import GameBoard from './components/GameBoard.jsx';

const App = () => {
  const [board, setBoard] = useState([
    'A', 'B', 'C', 'D', // Top row
    'E', 'F', 'G', 'H', 'I', // Second row
    'J', 'K', 'L', 'M', 'N', 'O', // Middle row
    'P', 'Q', 'R', 'S', 'T', // Fourth row
    'U', 'V', 'W', 'X', // Bottom row
  ]);

  const handleHexagonClick = (index) => {
    console.log(`Hexagon ${index} clicked`);
    // Add logic to remove the hexagon and update the board
    const newBoard = [...board];
    newBoard[index] = ''; // Remove the letter from the board
    setBoard(newBoard);
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center my-4">Wordberg</h1>
      <GameBoard board={board} onHexagonClick={handleHexagonClick} />
    </div>
  );
};

export default App;