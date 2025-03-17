import React, { createContext, useState } from 'react';

// Create the context - using to prevent prop drilling
export const GameContext = createContext();

// Define letter sets
const vowels = ['A', 'E', 'I', 'O', 'U'];
const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
const rareLetters = ['Q', 'Z', 'X']; // Rare letters for bonus opportunities

// Function to generate the board
const generateBoard = () => {
  const totalHexagons = 24; // Total number of hexagons on the board
  const minVowels = Math.ceil(totalHexagons * 0.3); // At least 30% vowels
  const vowelCount = Math.ceil(totalHexagons * 0.4); // 40% vowels
  const consonantCount = totalHexagons - vowelCount; // 60% consonants

  // Generate vowels
  const selectedVowels = Array.from({ length: vowelCount }, () => 
    vowels[Math.floor(Math.random() * vowels.length)]
  );

  // Generate consonants
  const selectedConsonants = Array.from({ length: consonantCount }, () => 
    consonants[Math.floor(Math.random() * consonants.length)]
  );

  // Combine vowels and consonants
  let board = [...selectedVowels, ...selectedConsonants];

  // Ensure at least 30% vowels
  while (board.filter(letter => vowels.includes(letter)).length < minVowels) {
    // Replace a consonant with a vowel
    const consonantIndex = board.findIndex(letter => consonants.includes(letter));
    if (consonantIndex !== -1) {
      board[consonantIndex] = vowels[Math.floor(Math.random() * vowels.length)];
    }
  }

  // Add rare letters (limit to 1-2 rare letters per board)
  const rareLetterCount = Math.floor(Math.random() * 2) + 1; 
  for (let i = 0; i < rareLetterCount; i++) {
    const randomIndex = Math.floor(Math.random() * totalHexagons);
    board[randomIndex] = rareLetters[Math.floor(Math.random() * rareLetters.length)];
  }

  // Shuffle the board to randomize letter positions
  board = board.sort(() => Math.random() - 0.5);

  return board;
};

// Create the provider component
export const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(generateBoard());
  const [selectedHexagons, setSelectedHexagons] = useState(new Set());

  const handleHexagonClick = (row, col, letter, index) => {
    console.log(`Hexagon ${index} clicked with letter ${letter}`);
    
    // Mark hexagon as selected
    setSelectedHexagons(prev => {
      const newSelected = new Set(prev);
      newSelected.add(index);
      return newSelected;
    });

    // Update the board
    const newBoard = [...board];
    newBoard[index] = null; // Use null instead of empty string
    setBoard(newBoard);
  };

  return (
    <GameContext.Provider value={{ 
      board, 
      handleHexagonClick,
      selectedHexagons 
    }}>
      {children}
    </GameContext.Provider>
  );
};