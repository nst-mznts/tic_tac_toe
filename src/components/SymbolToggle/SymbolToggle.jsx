import PropTypes from 'prop-types';
import './SymbolToggle.scss';

function SymbolToggle({ firstSymbol, secondSymbol, selectedSymbol, setSelectedSymbol }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={() => setSelectedSymbol(!selectedSymbol)}
      className={`swith-button ${selectedSymbol ? 'switch-active' : ''}`}
      onClick={() => setSelectedSymbol(!selectedSymbol)}
    >
      <div className="swith-item">{firstSymbol}</div>
      <div className="swith-item">{secondSymbol}</div>
    </div>
  );
}

SymbolToggle.propTypes = {
  firstSymbol: PropTypes.node.isRequired,
  secondSymbol: PropTypes.node.isRequired,
  selectedSymbol: PropTypes.bool.isRequired,
  setSelectedSymbol: PropTypes.func.isRequired,
};

export default SymbolToggle;
