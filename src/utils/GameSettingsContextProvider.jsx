import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { GAME_SYMBOLS } from './constants';
import { getFromLocalStorage } from './localStorage';

export const GameSettingsContext = createContext();

export function GameSettingsContextProvider({ children }) {
  const [selectedSymbol, setSelectedSymbol] = useState(
    getFromLocalStorage('playersSymbol', GAME_SYMBOLS.SYMBOL_X),
  );
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [boardSize, setBoardSize] = useState(3);

  const providerValue = useMemo(
    () => ({
      selectedSymbol,
      setSelectedSymbol,
      selectedLevel,
      setSelectedLevel,
      boardSize,
      setBoardSize,
    }),
    [selectedSymbol, setSelectedSymbol, selectedLevel, setSelectedLevel, boardSize, setBoardSize],
  );

  return (
    <GameSettingsContext.Provider value={providerValue}>{children}</GameSettingsContext.Provider>
  );
}

GameSettingsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
