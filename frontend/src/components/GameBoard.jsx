import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext.jsx'; 
import Hexagon from './Hexagon.jsx';

const GameBoard = ({ players, onLetterSelect }) => {
  const { board, handleHexagonClick: contextHandleClick, selectedHexagons } = useContext(GameContext);

  // Define the honeycomb structure
  const rows = [
    [0, 1, 2, 3], // Top row: 4 hexagons
    [4, 5, 6, 7, 8], // Second row: 5 hexagons
    [9, 10, 11, 12, 13, 14], // Middle row: 6 hexagons
    [15, 16, 17, 18, 19], // Fourth row: 5 hexagons
    [20, 21, 22, 23], // Bottom row: 4 hexagons
  ];

  // Calculate the maximum number of hexagons in a row
  const maxHexagonsInRow = Math.max(...rows.map(row => row.length));

  // Calculate the total width of the game board
  const hexagonWidth = 100; // Width of each hexagon
  const totalWidth = maxHexagonsInRow * hexagonWidth;

  const handleClick = (row, col, letter, hexIndex) => {
    // Check if current player has reached their limit
    const currentPlayer = players.player1.isCurrentTurn ? players.player1 : players.player2;
    if (!selectedHexagons.has(hexIndex)) {
      if (currentPlayer.selectedLetters.length < 7) {
        contextHandleClick(row, col, letter, hexIndex);
        onLetterSelect(letter);
      } else {
        console.log(`${currentPlayer.name} has reached their maximum of 7 letters!`);
        // If player has 7 letters, just switch turns
        onLetterSelect(null);
      }
    }
  };

  return (
    <div className="game-board relative" style={{ width: `${totalWidth}px`, height: '500px', margin: '0 auto' }}>
      {rows.map((row, rowIndex) => {
        // Calculate the horizontal offset to center the row
        const rowOffset = ((maxHexagonsInRow - row.length) * hexagonWidth) / 2;

        return row.map((hexIndex, colIndex) => {
          // Only render if the hexagon exists and hasn't been selected
          if (hexIndex < board.length && board[hexIndex] !== null && !selectedHexagons.has(hexIndex)) {
            return (
              <Hexagon
                key={hexIndex}
                letter={board[hexIndex]}
                onClick={() => handleClick(rowIndex, colIndex, board[hexIndex], hexIndex)}
                row={rowIndex}
                col={colIndex}
                rowOffset={rowOffset}
              />
            );
          }
          return null;
        });
      })}
    </div>
  );
};

export default GameBoard;