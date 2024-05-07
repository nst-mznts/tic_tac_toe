import PropTypes from 'prop-types';
import './Footer.scss';
import { GAME_SYMBOLS } from '../../utils/constants';

function Footer({ selectedSymbol, score, gameVsCPU }) {
  const secondPlayer = gameVsCPU ? '(CPU)' : '(PLAYER)';

  return (
    <footer className="score">
      <div className="score-item player-x">
        <span>
          {selectedSymbol === GAME_SYMBOLS.SYMBOL_X
            ? `${GAME_SYMBOLS.SYMBOL_X} (YOU)`
            : `${GAME_SYMBOLS.SYMBOL_X} ${secondPlayer}`}
        </span>
        <span className="score-number title">{score[GAME_SYMBOLS.SYMBOL_X]}</span>
      </div>
      <div className="score-item play-times">
        <span>TIMES</span>
        <span className="score-number title">{score.times}</span>
      </div>
      <div className="score-item player-o">
        <span>
          {selectedSymbol === GAME_SYMBOLS.SYMBOL_O
            ? `${GAME_SYMBOLS.SYMBOL_O} (YOU)`
            : `${GAME_SYMBOLS.SYMBOL_O} ${secondPlayer}`}
        </span>
        <span className="score-number title">{score[GAME_SYMBOLS.SYMBOL_O]}</span>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  selectedSymbol: PropTypes.string.isRequired,
  score: PropTypes.shape({
    X: PropTypes.number,
    times: PropTypes.number,
    O: PropTypes.number,
  }).isRequired,
  gameVsCPU: PropTypes.bool.isRequired,
};

export default Footer;
