import React from 'react';

const Hexagon = ({ letter, onClick, row, col }) => {
  // Stagger every other row
  const offset = row % 2 === 0 ? 0 : 50;

  // Add centering offset for the first and last rows
  const isFirstOrLastRow = row === 0 || row === 4;
  const centeringOffset = isFirstOrLastRow ? 100 : 0;

  const style = {
    position: 'absolute',
    left: `${col * 100 + offset + centeringOffset}px`, // Adjust horizontal position
    top: `${row * 85}px`, // Adjust vertical position
  };

  return (
    <div
      className="hexagon bg-blue-200 text-black flex items-center justify-center cursor-pointer"
      style={style}
      onClick={onClick}
    >
      {letter}
    </div>
  );
};

export default Hexagon;