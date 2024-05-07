import PropTypes from 'prop-types';
import './Settings.scss';
import { MdReplay } from 'react-icons/md';
import useGameScore from '../../utils/useGameScore';
import useGameSettings from '../../utils/useGameSettings';
import { difficultyLevel, boardSize } from '../../data/gameSettings';
import Logo from '../Logo/Logo';
import SymbolToggle from '../SymbolToggle/SymbolToggle';

function Settings({ onReturn, openModalWindow, closeModalWindow }) {
  const { isSavedScore, setSavedScore } = useGameScore(closeModalWindow);
  const { selectDifficultyLevel, selectBoardSize } = useGameSettings(isSavedScore, openModalWindow);

  const makeSettingButtonlActive = (value, listOfButtons, setSelectedSetting) => {
    setSelectedSetting(Number(value));
    const activeButton = listOfButtons.find((button) => button.active === true);
    activeButton.active = false;
    const clickedbutton = listOfButtons.find((button) => button.value === value);
    clickedbutton.active = true;
  };

  return (
    <div className="wrapper">
      <div className="start-header">
        <Logo />
        <button
          type="button"
          aria-label="open settings"
          className="button square-button gray-button"
          onClick={onReturn}
        >
          <MdReplay className="return-icon" size="2em" />
        </button>
      </div>
      <div className="start-content dark">
        <div className="difficulty-level-wrapper">
          <h4 className="title">DIFFICULTY LEVEL</h4>
          <ul
            className="difficulty-level-list"
            onClick={(event) => makeSettingButtonlActive(
              event.target.id,
              difficultyLevel,
              selectDifficultyLevel,
            )}
          >
            {difficultyLevel.map((level) => (
              <li
                id={level.value}
                className={`button rectangular-button ${level.active ? 'active' : ''}`}
                key={level.value}
              >
                {level.level}
              </li>
            ))}
          </ul>
        </div>
        <div className="difficulty-level-wrapper">
          <h4 className="title">BOARD SIZE</h4>
          <ul
            className="difficulty-level-list"
            onClick={(event) => makeSettingButtonlActive(
              event.target.id,
              boardSize,
              selectBoardSize,
            )}
          >
            {boardSize.map((size) => (
              <li
                key={size.value}
                id={size.value}
                className={`button rectangular-button ${size.active ? 'active' : ''}`}
              >
                {size.size}
              </li>
            ))}
          </ul>
        </div>
        <div className="save-score-wrapper">
          <h4 className="title">SAVE SCORE</h4>
          <SymbolToggle
            firstSymbol={<p className="title">NO</p>}
            secondSymbol={<p className="title">YES</p>}
            selectedSymbol={isSavedScore}
            setSelectedSymbol={setSavedScore}
          />
        </div>
      </div>
    </div>
  );
}

Settings.propTypes = {
  onReturn: PropTypes.func.isRequired,
  openModalWindow: PropTypes.func.isRequired,
  closeModalWindow: PropTypes.func.isRequired,
};

export default Settings;
