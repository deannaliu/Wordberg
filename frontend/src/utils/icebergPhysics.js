// Define the board structure as a constant that can be imported
export const BOARD_STRUCTURE = {
  rows: [
    [0, 1, 2, 3],           // Top row: 4 hexagons
    [4, 5, 6, 7, 8],        // Second row: 5 hexagons
    [9, 10, 11, 12, 13, 14], // Middle row: 6 hexagons
    [15, 16, 17, 18, 19],    // Fourth row: 5 hexagons
    [20, 21, 22, 23],        // Bottom row: 4 hexagons
  ],
  MAX_NEIGHBORS: 6
};

// Constants for falling mechanics
const FALLING_CONSTANTS = {
  BASE_CHANCE: 0.05,     // Lower base chance (5%)
  EXPOSURE_FACTOR: 0.25, // 25% max additional from exposure
  EDGE_SUPPORT: 0.8,     // 80% reduction in falling chance for edge pieces
  STRUCTURAL_INTEGRITY: 0.9, // Starting structural integrity
  INTEGRITY_DECAY: 0.15,  // How much integrity decreases with each selection
};

// Track overall structural integrity of the board
let boardIntegrity = FALLING_CONSTANTS.STRUCTURAL_INTEGRITY;

// Helper to determine if a position is on the edge
const isEdgePosition = (row, col) => {
  const rows = BOARD_STRUCTURE.rows;
  return row === 0 || row === rows.length - 1 || col === 0 || col === rows[row].length - 1;
};

// Calculate support from remaining neighbors
const calculateSupport = (neighborCount) => {
  return (neighborCount / BOARD_STRUCTURE.MAX_NEIGHBORS) ** 1.5; // Exponential relationship for more realistic support
};

// Calculate neighboring hexagon indices
export const getNeighborIndices = (row, col) => {
  const neighbors = [];
  const isEvenRow = row % 2 === 0;
  
  // Define neighbor positions based on whether the row is even or odd
  const neighborDirections = isEvenRow ? 
    [
      [-1, -1], // Top Left
      [-1, 0],  // Top Right
      [0, -1],  // Left
      [0, 1],   // Right
      [1, -1],  // Bottom Left
      [1, 0]    // Bottom Right
    ] : [
      [-1, 0],  // Top Left
      [-1, 1],  // Top Right
      [0, -1],  // Left
      [0, 1],   // Right
      [1, 0],   // Bottom Left
      [1, 1]    // Bottom Right
    ];

  // Check each neighbor position
  neighborDirections.forEach(([dRow, dCol]) => {
    const newRow = row + dRow;
    const newCol = col + dCol;

    // Verify the position is valid
    if (newRow >= 0 && newRow < BOARD_STRUCTURE.rows.length) {
      const rowArray = BOARD_STRUCTURE.rows[newRow];
      if (newCol >= 0 && newCol < rowArray.length) {
        const neighborIndex = rowArray[newCol];
        if (neighborIndex !== undefined) {
          neighbors.push(neighborIndex);
        }
      }
    }
  });

  // Debug log
  console.log(`Hexagon at [${row},${col}] has neighbors:`, neighbors);
  return neighbors;
};

// Calculate probability of a hexagon falling
export const calculateFallingProbability = (neighborCount, row, col, totalSelected) => {
  // Decrease structural integrity as more pieces are selected
  boardIntegrity = Math.max(
    FALLING_CONSTANTS.STRUCTURAL_INTEGRITY - (totalSelected * FALLING_CONSTANTS.INTEGRITY_DECAY),
    0.3 // Minimum integrity of 30%
  );

  // Base calculation
  let support = calculateSupport(neighborCount);
  
  // Edge support
  if (isEdgePosition(row, col)) {
    support += FALLING_CONSTANTS.EDGE_SUPPORT;
  }

  // Calculate falling chance
  const stabilityFactor = support * boardIntegrity;
  const fallChance = FALLING_CONSTANTS.BASE_CHANCE + 
    ((1 - stabilityFactor) * FALLING_CONSTANTS.EXPOSURE_FACTOR);

  // Add randomness based on structural integrity
  const randomFactor = Math.random() * (1 - boardIntegrity) * 0.2;

  return Math.min(Math.max(fallChance + randomFactor, 0), 1);
};

// Function to get all connected hexagons from a starting point
const getConnectedHexagons = (startRow, startCol, board) => {
  const connected = new Set();
  const toCheck = [[startRow, startCol]];
  
  while (toCheck.length > 0) {
    const [row, col] = toCheck.pop();
    const currentIndex = BOARD_STRUCTURE.rows[row][col];
    
    if (!connected.has(currentIndex) && board[currentIndex] !== null) {
      connected.add(currentIndex);
      
      // Get neighbors of current hexagon
      const neighbors = getNeighborIndices(row, col);
      neighbors.forEach(neighborIndex => {
        if (board[neighborIndex] !== null) {
          const neighborRow = Math.floor(neighborIndex / BOARD_STRUCTURE.rows[0].length);
          const neighborCol = neighborIndex % BOARD_STRUCTURE.rows[0].length;
          toCheck.push([neighborRow, neighborCol]);
        }
      });
    }
  }
  
  return connected;
};

// Helper function to convert index to row/col
const indexToPosition = (index) => {
  for (let row = 0; row < BOARD_STRUCTURE.rows.length; row++) {
    const colIndex = BOARD_STRUCTURE.rows[row].indexOf(index);
    if (colIndex !== -1) {
      return { row, col: colIndex };
    }
  }
  return null;
};

// Helper to determine if an iceberg is anchored (connected to bottom or edge)
const isAnchoredToFoundation = (index, board, visited = new Set()) => {
  const pos = indexToPosition(index);
  if (!pos) return false;
  
  const { row, col } = pos;
  
  // Prevent infinite loops
  if (visited.has(index)) return false;
  visited.add(index);
  
  // Edge pieces are very well anchored due to two wall connections
  if (col === 0 || col === BOARD_STRUCTURE.rows[row].length - 1) {
    return true;
  }
  
  // Bottom row is anchored
  if (row === BOARD_STRUCTURE.rows.length - 1) {
    return true;
  }
  
  // Check if any neighbors below are anchored
  const neighbors = getNeighborIndices(row, col);
  for (const neighborIndex of neighbors) {
    const neighborPos = indexToPosition(neighborIndex);
    if (neighborPos && 
        board[neighborIndex] !== null && 
        neighborPos.row > row && // Only check pieces below
        isAnchoredToFoundation(neighborIndex, board, visited)) {
      return true;
    }
  }
  
  return false;
};

const hasEnoughSupport = (index, board) => {
  const pos = indexToPosition(index);
  if (!pos) return false;
  
  const { row, col } = pos;
  
  // Bottom row is always stable
  if (row === BOARD_STRUCTURE.rows.length - 1) {
    return true;
  }
  
  let supportCount = 0;
  const neighbors = getNeighborIndices(row, col);
  
  // Edge pieces get strong support from two "invisible" wall connections
  if (col === 0 || col === BOARD_STRUCTURE.rows[row].length - 1) {
    supportCount += 2; // Two wall connections
  }
  
  // Count connected neighbors that are themselves anchored
  neighbors.forEach(neighborIndex => {
    if (board[neighborIndex] !== null) {
      const neighborPos = indexToPosition(neighborIndex);
      if (neighborPos) {
        if (neighborPos.row > row) {
          // Bottom supports count more
          supportCount += 1;
        } else {
          // Side connections count less
          supportCount += 0.75;
        }
      }
    }
  });
  
  // Edge pieces need less additional support since they have two wall connections
  const requiredSupports = (col === 0 || col === BOARD_STRUCTURE.rows[row].length - 1) ? 2 : 2.5;
  console.log(`Iceberg ${index} at [${row},${col}] has ${supportCount} supports (needs ${requiredSupports})`);
  return supportCount >= requiredSupports;
};

// Helper to get all connected icebergs in a chain
const getConnectedChain = (startIndex, board) => {
  const connected = new Set();
  const toCheck = [startIndex];
  
  while (toCheck.length > 0) {
    const currentIndex = toCheck.pop();
    if (!connected.has(currentIndex) && board[currentIndex] !== null) {
      connected.add(currentIndex);
      
      // Get position of current iceberg
      const pos = indexToPosition(currentIndex);
      if (pos) {
        // Add all its existing neighbors to check
        const neighbors = getNeighborIndices(pos.row, pos.col);
        neighbors.forEach(neighborIndex => {
          if (board[neighborIndex] !== null && !connected.has(neighborIndex)) {
            toCheck.push(neighborIndex);
          }
        });
      }
    }
  }
  
  return connected;
};

// Check if an iceberg will fall based on support
const willFall = (index, board) => {
  const pos = indexToPosition(index);
  if (!pos) return true; // If we can't find position, consider it falling
  
  const { row, col } = pos;
  let supportCount = 0;
  const neighbors = getNeighborIndices(row, col);
  
  // Count existing supports
  neighbors.forEach(neighborIndex => {
    if (board[neighborIndex] !== null) {
      supportCount++;
    }
  });
  
  // Add wall support if it's an edge piece
  if (row === 0 || row === BOARD_STRUCTURE.rows.length - 1 || 
      col === 0 || col === BOARD_STRUCTURE.rows[row].length - 1) {
    supportCount++;
  }
  
  console.log(`Iceberg ${index} at [${row},${col}] has ${supportCount} supports`);
  return supportCount < 2;
};

export const processFallingIcebergs = (clickedRow, clickedCol, board, selectedHexagons) => {
  const fallingIndices = new Set();
  const newBoard = [...board];
  
  // Remove clicked iceberg
  const clickedIndex = BOARD_STRUCTURE.rows[clickedRow][clickedCol];
  newBoard[clickedIndex] = null;
  fallingIndices.add(clickedIndex);
  
  let somethingFell = true;
  while (somethingFell) {
    somethingFell = false;
    
    // Check all remaining pieces for stability
    for (let i = 0; i < board.length; i++) {
      if (newBoard[i] !== null && !fallingIndices.has(i)) {
        if (!hasEnoughSupport(i, newBoard)) {
          console.log(`Iceberg ${i} is falling due to lack of support`);
          newBoard[i] = null;
          fallingIndices.add(i);
          somethingFell = true;
        }
      }
    }
  }
  
  console.log('Final falling indices:', Array.from(fallingIndices));
  return fallingIndices;
}; 