export const checkTie = (newBoard) => {
  const emptySquaresList = newBoard.filter((square) => square === null);
  if (emptySquaresList.length === 0) {
    return true;
  }
  return false;
};

export const generateWinningCombinations = (boardSize) => {
  const combinations = [];
  // Rows
  for (let i = 0; i < boardSize; i += 1) {
    combinations.push(Array.from({ length: boardSize }, (_, j) => i * boardSize + j));
  }
  // Columns
  for (let i = 0; i < boardSize; i += 1) {
    combinations.push(Array.from({ length: boardSize }, (_, j) => j * boardSize + i));
  }
  // Diagonals
  combinations.push(Array.from({ length: boardSize }, (_, i) => i * boardSize + i));
  combinations.push(Array.from({ length: boardSize }, (_, i) => (i + 1) * (boardSize - 1)));
  return combinations;
};

export const checkWinner = (board, player, boardSize) => {
  const plays = board.reduce(
    (accum, element, index) => (element === player ? { ...accum, [index]: true } : accum),
    {},
  );
  const combinations = generateWinningCombinations(boardSize);

  function hasElemInPlays(elem) {
    return elem in plays;
  }

  function hasCombinationInPlays(combination) {
    return combination.every(hasElemInPlays);
  }

  return combinations.some(hasCombinationInPlays);
};
