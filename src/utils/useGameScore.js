import { useContext } from 'react';
import { GameScoreContext } from './GameScoreContextProvider';
import { GAME_SYMBOLS } from './constants';
import { saveToLocalStorage } from './localStorage';

export default function useGameScore(onResetScore) {
  const { score, setScore, isSavedScore, setIsSavedScore } = useContext(GameScoreContext);

  const updateScore = (string) => {
    setScore((prevState) => ({
      [GAME_SYMBOLS.SYMBOL_X]:
        string === GAME_SYMBOLS.SYMBOL_X
          ? prevState[GAME_SYMBOLS.SYMBOL_X] + 1
          : prevState[GAME_SYMBOLS.SYMBOL_X],
      times: prevState.times + 1,
      [GAME_SYMBOLS.SYMBOL_O]:
        string === GAME_SYMBOLS.SYMBOL_O
          ? prevState[GAME_SYMBOLS.SYMBOL_O] + 1
          : prevState[GAME_SYMBOLS.SYMBOL_O],
    }));
  };

  const resetScore = () => {
    setScore({ [GAME_SYMBOLS.SYMBOL_X]: 0, times: 0, [GAME_SYMBOLS.SYMBOL_O]: 0 });
    saveToLocalStorage('score', {
      [GAME_SYMBOLS.SYMBOL_X]: 0,
      times: 0,
      [GAME_SYMBOLS.SYMBOL_O]: 0,
    });
    onResetScore();
  };

  const setSavedScore = (value) => {
    setIsSavedScore(value);
    saveToLocalStorage('isSavedScore', value);
    if (value) {
      saveToLocalStorage('score', score);
    }
  };

  return {
    score,
    isSavedScore,
    updateScore,
    resetScore,
    setSavedScore,
  };
}
