import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GAME_SYMBOLS } from '../../utils/constants';
import './Game.scss';
import useGameSettings from '../../utils/useGameSettings';
import useGameScore from '../../utils/useGameScore';
import Board from '../Board/Board';
import { bestSpot, getAiSymbol } from './gameDifficultyLevelsLogic';
import { checkTie, checkWinner } from './winAndTieCheck';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Confetti from '../Confetti/Confetti';
import ModalWindow from '../ModalWindow/ModalWindow';
import messagesForModalWindow from '../../data/messagesForModalWindow';

let modalWindowMessage = '';

function Game({ openModalWindow, onReturn, gameVsCPU, closeModalWindow }) {
  const { score, isSavedScore, updateScore } = useGameScore(closeModalWindow);
  const { selectedSymbol, selectedLevel, boardSize } = useGameSettings(
    isSavedScore,
    openModalWindow,
  );
  const [board, setBoard] = useState(Array(boardSize * boardSize).fill(null));
  const [currentMove, setCurrentMove] = useState(selectedSymbol);
  const [isModalWindowClosed, setIsModalWindowClosed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const aiPlayer = getAiSymbol(selectedSymbol);

  const stopGame = (gameResult) => {
    if (gameResult === 'tie') {
      modalWindowMessage = messagesForModalWindow.tie;
    } else if (gameResult === selectedSymbol) {
      modalWindowMessage = messagesForModalWindow.win;
      setShowConfetti(true);
    } else {
      modalWindowMessage = messagesForModalWindow.lose;
    }
    setIsModalWindowClosed(true);
    updateScore(gameResult);
  };

  const makeGameMove = (index) => {
    if (board[index]) return;
    const boardCopy = [...board];
    boardCopy[index] = currentMove;
    setBoard(boardCopy);
    if (checkTie(boardCopy)) {
      stopGame('tie');
    } else if (checkWinner(boardCopy, currentMove, boardSize)) {
      stopGame(currentMove);
    } else {
      setCurrentMove(
        currentMove === GAME_SYMBOLS.SYMBOL_O ? GAME_SYMBOLS.SYMBOL_X : GAME_SYMBOLS.SYMBOL_O,
      );
    }
  };

  useEffect(() => {
    if (currentMove === aiPlayer && gameVsCPU) {
      const nextMove = bestSpot(board, selectedSymbol, selectedLevel, boardSize);
      if (board[nextMove] === null) {
        setTimeout(() => {
          makeGameMove(nextMove);
        }, 500);
      }
    }
  }, [currentMove]);

  const getClickedSquareIndex = (index) => {
    if (board[index] === null && !(gameVsCPU && currentMove === aiPlayer)) {
      makeGameMove(index);
    }
  };

  const resetBoard = () => {
    setBoard(Array(boardSize * boardSize).fill(null));
    setIsModalWindowClosed(false);
    setCurrentMove(selectedSymbol);
    setShowConfetti(false);
  };

  return (
    <div className="wrapper">
      {showConfetti && <Confetti />}
      {isModalWindowClosed && (
        <ModalWindow
          message={modalWindowMessage}
          buttonText="NEXT ROUND"
          onReturn={onReturn}
          onReset={resetBoard}
        />
      )}
      <Header nextTurn={currentMove} onReturn={onReturn} />
      <Board squares={board} handleClick={getClickedSquareIndex} boardSize={boardSize} />
      <Footer selectedSymbol={selectedSymbol} score={score} gameVsCPU={gameVsCPU} />
    </div>
  );
}

Game.propTypes = {
  openModalWindow: PropTypes.func.isRequired,
  onReturn: PropTypes.func.isRequired,
  gameVsCPU: PropTypes.bool.isRequired,
  closeModalWindow: PropTypes.func.isRequired,
};

export default Game;
