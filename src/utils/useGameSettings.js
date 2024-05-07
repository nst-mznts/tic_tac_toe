import { useContext } from 'react';
import { GameSettingsContext } from './GameSettingsContextProvider';
import { GAME_SYMBOLS } from './constants';
import { saveToLocalStorage } from './localStorage';

export default function useGameSettings(isSavedScore, onPlayerSymbolSet) {
  const {
    selectedSymbol,
    setSelectedSymbol,
    selectedLevel,
    setSelectedLevel,
    boardSize,
    setBoardSize,
  } = useContext(GameSettingsContext);

  const setPlayerSymbol = (toggle) => {
    const symbol = toggle ? GAME_SYMBOLS.SYMBOL_O : GAME_SYMBOLS.SYMBOL_X;
    setSelectedSymbol(symbol);
    saveToLocalStorage('playersSymbol', symbol);
    if (symbol !== selectedSymbol && isSavedScore) {
      onPlayerSymbolSet();
    }
  };

  const selectDifficultyLevel = (level) => {
    setSelectedLevel(level);
  };

  const selectBoardSize = (size) => {
    setBoardSize(size);
  };

  return {
    selectedSymbol,
    selectedLevel,
    boardSize,
    setPlayerSymbol,
    selectDifficultyLevel,
    selectBoardSize,
  };
}
