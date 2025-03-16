import React, { createContext, useState } from 'react';

// Create the context
export const GameContext = createContext();

// Create the provider component
export const GameProvider = ({ children }) => {
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
    <GameContext.Provider value={{ board, handleHexagonClick }}>
      {children}
    </GameContext.Provider>
  );
};