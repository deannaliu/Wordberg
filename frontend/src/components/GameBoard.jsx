import React from 'react';
import Hexagon from './Hexagon.jsx';

const GameBoard = ({ board, onHexagonClick }) => {
  // Define the honeycomb structure
  const rows = [
    [0, 1, 2, 3], // Top row: 4 hexagons
    [4, 5, 6, 7, 8], // Second row: 5 hexagons
    [9, 10, 11, 12, 13, 14], // Middle row: 6 hexagons
    [15, 16, 17, 18, 19], // Fourth row: 5 hexagons
    [20, 21, 22, 23], // Bottom row: 4 hexagons
  ];

  return (
    <div className="game-board relative" style={{ width: '700px', height: '500px' }}>
      {rows.map((row, rowIndex) =>
        row.map((hexIndex, colIndex) => {
          // Ensure the hexIndex is within the bounds of the board array
          if (hexIndex >= board.length) {
            return null; // Skip rendering if the index is out of bounds
          }
          return (
            <Hexagon
              key={hexIndex}
              letter={board[hexIndex]}
              onClick={() => onHexagonClick(hexIndex)}
              row={rowIndex}
              col={colIndex}
            />
          );
        })
      )}
    </div>
  );
};

export default GameBoard;