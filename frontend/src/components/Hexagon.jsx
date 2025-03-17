import React from 'react';

const Hexagon = ({ letter, onClick, row, col }) => {
  // Stagger every other row
  const offset = row % 2 === 0 ? 0 : 50;

  // Add centering offset for the first and last rows
  const isFirstOrLastRow = row === 0 || row === 4;
  const centeringOffset = isFirstOrLastRow ? 100 : 0;

  // Calculate spacing gap (2px) only for middle hexagons
  const spacingGap = col === 0 ? 0 : (col * 2); // 2px gap for each hexagon after the first

  // Define alternating shades of blue
  const blueShades = ['bg-blue-200', 'bg-blue-300'];
  const colorClass = blueShades[(row + col) % 2];

  const style = {
    position: 'absolute',
    left: `${(col * 100) + spacingGap + offset + centeringOffset}px`,
    top: `${row * 85}px`,
  };

  return (
    <div
      className={`hexagon ${colorClass} text-black flex items-center justify-center cursor-pointer hover:shadow-md hover:scale-105 hover:text-white hover:bg-opacity-50 hover:bg-purple-200 hover:text-shadow transition-all duration-200`}
      style={style}
      onClick={onClick}
    >
      {letter}
    </div>
  );
};

export default Hexagon;