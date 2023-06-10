// импорт библиотек
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

// импорт стилей
import styles from "./modal.module.css";

// импорт компонентов
import ModalOverlay from "../modal-overlay/modal-overlay";


const modalRoot = document.getElementById("react-modals");

function Modal({ children, onClose }) {

  return ReactDOM.createPortal(
    (
        <div className={styles.container}>
          <div className={styles.modal}>
            {children}
            <button className={styles.close} onClick={onClose}></button>
          </div>
          <ModalOverlay onClose={onClose} />
        </div>
    ),
    modalRoot
  );
}


Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Modal;
