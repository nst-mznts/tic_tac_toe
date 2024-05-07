import { useState } from 'react';
import { SCREEN_TYPES } from './constants';

export default function useScreenType(isSavedScore, resetScore) {
  const [screenType, setScreenType] = useState(SCREEN_TYPES.START_PAGE);

  const startGameVsCpu = () => {
    setScreenType(SCREEN_TYPES.GAME_VS_CPU);
  };

  const startGameVsHuman = () => {
    setScreenType(SCREEN_TYPES.GAME_VS_HUMAN);
  };

  const openSettingsPage = () => {
    setScreenType(SCREEN_TYPES.SETTINGS);
  };

  const returnToMenu = () => {
    setScreenType(SCREEN_TYPES.START_PAGE);
    if (!isSavedScore) {
      resetScore();
    }
  };

  return {
    screenType,
    startGameVsCpu,
    startGameVsHuman,
    openSettingsPage,
    returnToMenu,
  };
}
