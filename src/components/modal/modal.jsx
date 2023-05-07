
import styles from "./modal.module.css";
import PropTypes from 'prop-types';


const modalRoot = document.getElementById("react-modals");

function Modal({ children, onClose }) {

  return (
    (
      <div className={styles.modal}>
        {children}
        <button className={styles.close} onClick={onClose}></button>
      </div>
    )
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Modal;
