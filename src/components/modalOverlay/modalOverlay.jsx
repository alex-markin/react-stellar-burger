import React from "react";
import ReactDOM from "react-dom";
import styles from "./modalOverlay.module.css";
import PropTypes from 'prop-types';


const modalRoot = document.getElementById("react-modals");

function ModalOverlay({ children, onClose }) {

  // закрытие модального окна по нажатию на Esc и по клику на оверлей
  React.useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    const handleOverlayClick = (event) => {
      if (event.target.classList.contains(styles.overlay)) {
        onClose();
      }
    };
    window.addEventListener('click', handleOverlayClick);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('click', handleOverlayClick);
    };
  }, [onClose]);


  return ReactDOM.createPortal(
    (
      <div className={styles.overlay}>
        {children}
      </div>
    ),
    modalRoot
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};


export default ModalOverlay ;
