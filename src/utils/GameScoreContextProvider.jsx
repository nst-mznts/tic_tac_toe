import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { GAME_SYMBOLS } from './constants';
import { getFromLocalStorage } from './localStorage';

export const GameScoreContext = createContext();

export function GameScoreContextProvider({ children }) {
  const [score, setScore] = useState(
    getFromLocalStorage('score', {
      [GAME_SYMBOLS.SYMBOL_X]: 0,
      times: 0,
      [GAME_SYMBOLS.SYMBOL_O]: 0,
    }),
  );
  const [isSavedScore, setIsSavedScore] = useState(getFromLocalStorage('isSavedScore', false));

  const providerValue = useMemo(
    () => ({
      score,
      setScore,
      isSavedScore,
      setIsSavedScore,
    }),
    [score, setScore, isSavedScore, setIsSavedScore],
  );

  return <GameScoreContext.Provider value={providerValue}>{children}</GameScoreContext.Provider>;
}

GameScoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
