// импорт библиотек
import React, { useEffect, KeyboardEvent, MouseEvent } from "react";

// импорт стилей
import styles from "./modal-overlay.module.css";


type ModalOverlayProps = {
  onClose: () => void;
}



export default function ModalOverlay({ onClose }: ModalOverlayProps) {

  // закрытие модального окна по нажатию на Esc и по клику на оверлей

  useEffect(() => {

    const handleEsc = (event: KeyboardEvent<Window>) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleOverlayClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains(styles.overlay)) {
        onClose();
      }
    };



    window.addEventListener('keydown', handleEsc as any);
    window.addEventListener('click', handleOverlayClick);

    return () => {
      window.removeEventListener('keydown', handleEsc as any);
      window.removeEventListener('click', handleOverlayClick);
    };
  }, [onClose]);


  return (
    (
      <div className={styles.overlay} />
    )
  );
}

