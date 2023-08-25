// импорт библиотек
import ReactDOM from "react-dom";

// импорт стилей
import styles from "./modal.module.css";

// импорт компонентов
import ModalOverlay from "../modal-overlay/modal-overlay";


const modalRoot = document.getElementById("react-modals");

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {

  if (!modalRoot) {
    return null;
  }

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

