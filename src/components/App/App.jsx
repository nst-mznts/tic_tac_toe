import React, { useState } from 'react';
import './App.scss';
import Game from '../Game/Game';
import Menu from '../Menu/Menu';
import Settings from '../Settings/Settings';
import { SCREEN_TYPES } from '../../utils/constants';
import { saveToLocalStorage } from '../../utils/localStorage';
import useGameScore from '../../utils/useGameScore';
import useScreenType from '../../utils/useScreenType';

function App() {
  const [isModalWindowClosed, setIsModalWindowClosed] = useState(false);
  const closeModalWindow = () => setIsModalWindowClosed(false);
  const openModalWindow = () => setIsModalWindowClosed(true);
  const { score, isSavedScore, resetScore } = useGameScore(closeModalWindow);
  const {
    screenType,
    startGameVsCpu,
    startGameVsHuman,
    openSettingsPage,
    returnToMenu,
  } = useScreenType(isSavedScore, resetScore);

  if (isSavedScore) {
    saveToLocalStorage('score', score);
  }

  const closeModalWIndowAndReturnToMenu = () => {
    setIsModalWindowClosed(false);
    returnToMenu();
  };

  return (
    <>
      {(screenType === SCREEN_TYPES.GAME_VS_CPU || screenType === SCREEN_TYPES.GAME_VS_HUMAN) && (
        <Game
          openModalWindow={openModalWindow}
          onReturn={returnToMenu}
          gameVsCPU={screenType === SCREEN_TYPES.GAME_VS_CPU}
          closeModalWindow={closeModalWindow}
        />
      )}
      {screenType === SCREEN_TYPES.START_PAGE && (
        <Menu
          openSettingsPage={openSettingsPage}
          onGameVsCpu={startGameVsCpu}
          onGameVsHuman={startGameVsHuman}
          closeModalWIndowAndReturnToMenu={closeModalWIndowAndReturnToMenu}
          isModalWindowClosed={isModalWindowClosed}
          openModalWindow={openModalWindow}
          closeModalWindow={closeModalWindow}
        />
      )}
      {screenType === SCREEN_TYPES.SETTINGS && (
        <Settings
          onReturn={returnToMenu}
          openModalWindow={openModalWindow}
          closeModalWindow={closeModalWindow}
        />
      )}
    </>
  );
}

export default App;
