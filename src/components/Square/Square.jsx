import PropTypes from 'prop-types';
import './Square.scss';

function Square({ symbol, handleClick, index }) {
  return (
    <button type="button" className={`${symbol} square dark`} onClick={() => handleClick(index)}>
      {symbol}
    </button>
  );
}

Square.propTypes = {
  symbol: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  handleClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

Square.defaultProps = {
  symbol: null,
};

export default Square;
