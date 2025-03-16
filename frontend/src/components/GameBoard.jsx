import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext.jsx'; // Updated import path
import Hexagon from './Hexagon.jsx';

const GameBoard = () => {
  const { board, handleHexagonClick } = useContext(GameContext);

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

  return (
    <div className="game-board relative" style={{ width: `${totalWidth}px`, height: '500px', margin: '0 auto' }}>
      {rows.map((row, rowIndex) => {
        // Calculate the horizontal offset to center the row
        const rowOffset = ((maxHexagonsInRow - row.length) * hexagonWidth) / 2;

        return row.map((hexIndex, colIndex) => {
          // Ensure the hexIndex is within the bounds of the board array
          if (hexIndex >= board.length) {
            return null; // Skip rendering if the index is out of bounds
          }
          return (
            <Hexagon
              key={hexIndex}
              letter={board[hexIndex]}
              onClick={() => handleHexagonClick(hexIndex)}
              row={rowIndex}
              col={colIndex}
              rowOffset={rowOffset} // Pass the rowOffset to the Hexagon component
            />
          );
        });
      })}
    </div>
  );
};

export default GameBoard;