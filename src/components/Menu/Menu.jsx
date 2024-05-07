import PropTypes from 'prop-types';
import './Menu.scss';
import { MdSettings } from 'react-icons/md';
import useGameScore from '../../utils/useGameScore';
import useGameSettings from '../../utils/useGameSettings';
import Logo from '../Logo/Logo';
import SymbolToggle from '../SymbolToggle/SymbolToggle';
import { GAME_SYMBOLS } from '../../utils/constants';
import ModalWindow from '../ModalWindow/ModalWindow';
import messagesForModalWindow from '../../data/messagesForModalWindow';

function Menu({
  openSettingsPage,
  onGameVsCpu,
  onGameVsHuman,
  closeModalWIndowAndReturnToMenu,
  isModalWindowClosed,
  openModalWindow,
  closeModalWindow,
}) {
  const { isSavedScore, resetScore } = useGameScore(closeModalWindow);
  const { selectedSymbol, setPlayerSymbol } = useGameSettings(isSavedScore, openModalWindow);

  return (
    <div className="wrapper">
      {isModalWindowClosed && (
        <ModalWindow
          message={messagesForModalWindow['change-symbol'].toUpperCase()}
          buttonText="RESET SCORE"
          onReturn={closeModalWIndowAndReturnToMenu}
          onReset={resetScore}
        />
      )}
      <div className="start-header">
        <Logo />
        <button
          type="button"
          aria-label="open settings"
          className="button square-button gray-button"
          onClick={openSettingsPage}
        >
          <MdSettings className="return-icon" size="2em" />
        </button>
      </div>
      <div className="player-symbol dark">
        <h4 className="title">PICK PLAYER 1&apos;S MARK</h4>
        <SymbolToggle
          firstSymbol={GAME_SYMBOLS.SYMBOL_X}
          secondSymbol={GAME_SYMBOLS.SYMBOL_O}
          selectedSymbol={selectedSymbol === GAME_SYMBOLS.SYMBOL_O}
          setSelectedSymbol={setPlayerSymbol}
        />
      </div>
      <div className="start-page-buttons">
        <button
          type="button"
          className="button rectangular-button button-vs-cpu"
          onClick={onGameVsCpu}
        >
          NEW GAME (VS CPU)
        </button>
        <button
          type="button"
          className="button rectangular-button button-vs-human"
          onClick={onGameVsHuman}
        >
          NEW GAME (VS PLAYER)
        </button>
      </div>
    </div>
  );
}

Menu.propTypes = {
  openSettingsPage: PropTypes.func.isRequired,
  onGameVsCpu: PropTypes.func.isRequired,
  onGameVsHuman: PropTypes.func.isRequired,
  closeModalWIndowAndReturnToMenu: PropTypes.func.isRequired,
  isModalWindowClosed: PropTypes.bool.isRequired,
  openModalWindow: PropTypes.func.isRequired,
  closeModalWindow: PropTypes.func.isRequired,
};

export default Menu;
