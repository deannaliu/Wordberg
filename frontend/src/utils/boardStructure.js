// Define the board structure with row-column mapping to indices
export const BOARD_STRUCTURE = {
  rows: [
    [0, 1, 2, 3, 4],      // Row 0
    [5, 6, 7, 8, 9, 10],  // Row 1
    [11, 12, 13, 14, 15, 16, 17], // Row 2
    [18, 19, 20, 21, 22, 23], // Row 3
    [24, 25, 26, 27, 28]  // Row 4
  ]
};

// Helper function to convert row, col to index
export const getIndex = (row, col) => {
  if (row < 0 || row >= BOARD_STRUCTURE.rows.length || 
      col < 0 || col >= BOARD_STRUCTURE.rows[row].length) {
    return null;
  }
  return BOARD_STRUCTURE.rows[row][col];
};

// Helper function to convert index to row, col
export const indexToPosition = (index) => {
  for (let row = 0; row < BOARD_STRUCTURE.rows.length; row++) {
    const col = BOARD_STRUCTURE.rows[row].indexOf(index);
    if (col !== -1) {
      return { row, col };
    }
  }
  return null;
}; 