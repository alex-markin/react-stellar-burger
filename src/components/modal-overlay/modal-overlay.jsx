import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal-overlay.module.css";
import PropTypes from 'prop-types';


const modalRoot = document.getElementById("react-modals");

function ModalOverlay({ onClose }) {

  // закрытие модального окна по нажатию на Esc и по клику на оверлей
  React.useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
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


  return (
    (
      <div className={styles.overlay} />
    )
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};


export default ModalOverlay;
