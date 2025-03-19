import React, { createContext, useState } from 'react';
import { 
  processFallingIcebergs, 
  BOARD_STRUCTURE 
} from '../utils/icebergPhysics';

// Create the context - using to prevent prop drilling
export const GameContext = createContext();

// Define letter sets
const vowels = ['A', 'E', 'I', 'O', 'U'];
const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
const rareLetters = ['Q', 'Z', 'X']; // Rare letters for bonus opportunities

// Function to generate the board
const generateBoard = () => {
  const totalHexagons = 24;
  const vowelCount = Math.ceil(totalHexagons * 0.20); // Reduced to 20% vowels
  const consonantCount = totalHexagons - vowelCount;

  // Initialize empty board
  let board = new Array(totalHexagons).fill(null);

  // Define edge positions (first and last row, first and last column of each row)
  const edgePositions = new Set([0, 1, 2, 3, 4, 8, 14, 15, 19, 20, 21, 22, 23]);

  // Fill edge positions with consonants
  edgePositions.forEach(pos => {
    board[pos] = consonants[Math.floor(Math.random() * consonants.length)];
  });

  // Get non-edge positions
  const nonEdgePositions = Array.from({ length: totalHexagons }, (_, i) => i)
    .filter(i => !edgePositions.has(i));

  // Place vowels in non-edge positions first
  let remainingVowels = vowelCount;
  nonEdgePositions.forEach(pos => {
    if (remainingVowels > 0) {
      board[pos] = vowels[Math.floor(Math.random() * vowels.length)];
      remainingVowels--;
    }
  });

  // Fill remaining non-edge positions with consonants
  nonEdgePositions.forEach(pos => {
    if (board[pos] === null) {
      board[pos] = consonants[Math.floor(Math.random() * consonants.length)];
    }
  });

  // Add rare letters (limit to 1-2 rare letters per board)
  const rareLetterCount = Math.floor(Math.random() * 2) + 1;
  for (let i = 0; i < rareLetterCount; i++) {
    // Place rare letters only on edge positions for extra challenge
    const availableEdges = Array.from(edgePositions)
      .filter(pos => !rareLetters.includes(board[pos]));
    if (availableEdges.length > 0) {
      const randomEdgePos = availableEdges[Math.floor(Math.random() * availableEdges.length)];
      board[randomEdgePos] = rareLetters[Math.floor(Math.random() * rareLetters.length)];
    }
  }

  return board;
};

// Create the provider component
export const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(generateBoard());
  const [selectedHexagons, setSelectedHexagons] = useState(new Set());
  const [fallingHexagons, setFallingHexagons] = useState(new Set());

  const resetBoard = () => {
    setBoard(generateBoard());
    setSelectedHexagons(new Set());
    setFallingHexagons(new Set());
  };

  const handleHexagonClick = (row, col, letter, index) => {
    setSelectedHexagons(prev => {
      const newSelected = new Set(prev);
      newSelected.add(index);
      return newSelected;
    });

    const newBoard = [...board];
    newBoard[index] = null;

    const fallingIndices = processFallingIcebergs(row, col, newBoard, selectedHexagons);
    
    fallingIndices.forEach(idx => {
      newBoard[idx] = null;
    });
    
    setBoard(newBoard);
    setFallingHexagons(prev => {
      const newFalling = new Set(prev);
      fallingIndices.forEach(idx => newFalling.add(idx));
      return newFalling;
    });
  };

  return (
    <GameContext.Provider value={{ 
      board, 
      handleHexagonClick,
      selectedHexagons,
      fallingHexagons,
      resetBoard
    }}>
      {children}
    </GameContext.Provider>
  );
};