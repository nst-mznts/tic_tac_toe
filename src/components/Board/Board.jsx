import PropTypes from 'prop-types';
import './Board.scss';
import { nanoid } from 'nanoid';
import Square from '../Square/Square';

function Board({ squares, handleClick, boardSize }) {
  return (
    <main className={`board size${boardSize}`}>
      {squares.map((square, index) => (
        <Square key={nanoid()} symbol={square} handleClick={handleClick} index={index} />
      ))}
    </main>
  );
}

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]))
    .isRequired,
  handleClick: PropTypes.func.isRequired,
  boardSize: PropTypes.number.isRequired,
};

export default Board;
