import PropTypes from 'prop-types';
import './Header.scss';
import { MdReplay } from 'react-icons/md';
import Logo from '../Logo/Logo';

function Header({ nextTurn, onReturn }) {
  return (
    <header className="header">
      <Logo />
      <div className="dark header-turn title">
        <span className="symbol-font">{nextTurn}</span>
        TURN
      </div>
      <button
        type="button"
        aria-label="open settings"
        className="button square-button gray-button"
        onClick={onReturn}
      >
        <MdReplay className="return-icon" size="2em" />
      </button>
    </header>
  );
}

Header.propTypes = {
  nextTurn: PropTypes.string.isRequired,
  onReturn: PropTypes.func.isRequired,
};

export default Header;
