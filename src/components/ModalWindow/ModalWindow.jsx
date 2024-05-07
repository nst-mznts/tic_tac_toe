import PropTypes from 'prop-types';
import './ModalWindow.scss';

function ModalWindow({ message, buttonText, onReturn, onReset }) {
  return (
    <div className="popup__bg">
      <div className="popup dark">
        <div className="popup-content">
          <h4 className="title">{message}</h4>
          <div className="buttons-wrapper">
            <button type="button" className="button rectangular-button close" onClick={onReturn}>
              TO MENU
            </button>
            <button type="button" className="button rectangular-button reset" onClick={onReset}>
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ModalWindow.propTypes = {
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onReturn: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default ModalWindow;
