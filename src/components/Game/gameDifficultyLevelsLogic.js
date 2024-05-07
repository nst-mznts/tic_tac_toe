import { GAME_SYMBOLS } from '../../utils/constants';
import { generateWinningCombinations, checkWinner } from './winAndTieCheck';

export const getAiSymbol = (selectedSymbol) => {
  const firstSymbol = GAME_SYMBOLS.SYMBOL_X;
  const secondSymbol = GAME_SYMBOLS.SYMBOL_O;
  return selectedSymbol === firstSymbol ? secondSymbol : firstSymbol;
};

const emptySquares = (board) => {
  const indicesOfEmptySquares = [];
  board.forEach((square, index) => {
    if (square === null) {
      indicesOfEmptySquares.push(index);
    }
  });
  return indicesOfEmptySquares;
};

const findNextMoveForEasyLevel = (board) => {
  const emptySpots = emptySquares(board);
  const randomIndex = Math.floor(Math.random() * (emptySpots.length - 1));
  return emptySpots[randomIndex];
};

const generateWinningSequencePatterns = (size, symbol) => {
  const patterns = {};

  for (let i = 0; i < size; i += 1) {
    const pattern = Array(size).fill(symbol);
    pattern[i] = 'null';
    patterns[pattern.join('')] = [symbol, i];
  }
  if (size > 3) {
    for (let i = 0; i < size - 1; i += 1) {
      const pattern = Array(size).fill(symbol);
      pattern[i] = 'null';
      pattern[i + 1] = 'null';
      patterns[pattern.join('')] = [symbol, i];
    }
  }
  return patterns;
};

const getNextMoveIndex = (combination, board, symbol, boardSize) => {
  const result = [];
  for (let i = 0; i < combination.length; i += 1) {
    result.push(String(board[combination[i]]));
  }

  const patternMap = generateWinningSequencePatterns(boardSize, symbol);
  const patternindex = patternMap[result.join('')];
  return patternindex && combination[patternindex[1]];
};

const nextMoveOrNull = (symbol, board, boardSize) => {
  const combinations = generateWinningCombinations(boardSize);
  let nextMoveIndex = null;
  combinations.forEach((combination) => {
    const result = getNextMoveIndex(combination, board, symbol, boardSize);
    if (result) nextMoveIndex = result;
  });
  return nextMoveIndex;
};

const findNextMoveForMediumLevel = (board, boardSize) => {
  let move;
  move = nextMoveOrNull(GAME_SYMBOLS.SYMBOL_O, board, boardSize);
  if (move !== null) return move;
  move = nextMoveOrNull(GAME_SYMBOLS.SYMBOL_X, board, boardSize);
  if (move !== null) return move;
  return findNextMoveForEasyLevel(board);
};

let MAX_DEPTH;

const minimaxAlgorithmForHardLevel = (
  originalBoard,
  depth,
  player,
  selectedSymbol,
  boardSize,
  alphaParam,
  betaParam,
) => {
  const board = [...originalBoard];
  let alpha = alphaParam;
  let beta = betaParam;
  const availSpots = emptySquares(board);
  const human = selectedSymbol;
  const ai = getAiSymbol(selectedSymbol);
  if (boardSize === 4) MAX_DEPTH = 7;
  if (boardSize === 5) MAX_DEPTH = 5;

  if (checkWinner(board, ai, boardSize)) {
    return { score: 10 - depth };
  }

  if (checkWinner(board, human, boardSize)) {
    return { score: depth - 10 };
  }

  if (depth >= MAX_DEPTH && boardSize > 3) {
    return { score: 0 };
  }

  if (availSpots.length === 0) {
    return { score: 0 };
  }

  let bestScore = player === ai ? -Infinity : Infinity;
  let move;

  for (let i = 0; i < availSpots.length; i += 1) {
    board[availSpots[i]] = player;
    const result = minimaxAlgorithmForHardLevel(
      board,
      depth + 1,
      player === ai ? human : ai,
      selectedSymbol,
      boardSize,
      alpha,
      beta,
    );
    board[availSpots[i]] = null;

    if (player === ai) {
      if (result.score > bestScore) {
        bestScore = result.score;
        move = availSpots[i];
      }
      alpha = Math.max(alpha, bestScore);
    } else {
      if (result.score < bestScore) {
        bestScore = result.score;
        move = availSpots[i];
      }
      beta = Math.min(beta, bestScore);
    }

    if (beta <= alpha) {
      break;
    }
  }

  return {
    score: bestScore,
    index: move,
  };
};

export const bestSpot = (board, selectedSymbol, selectedLevel, boardSize) => {
  const ai = getAiSymbol(selectedSymbol);
  switch (selectedLevel) {
    case 1:
      return findNextMoveForEasyLevel(board);
    case 2:
      return findNextMoveForMediumLevel(board, boardSize);
    case 3:
      return minimaxAlgorithmForHardLevel(
        board,
        0,
        ai,
        selectedSymbol,
        boardSize,
        -Infinity,
        Infinity,
      ).index;
    default:
      return null;
  }
};
