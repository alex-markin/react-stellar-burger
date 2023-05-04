import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals");

class Modal extends React.Component {
  render() {
    const { children, onClose } = this.props;
        
    return ReactDOM.createPortal(
            (
                <>
                    <div className={styles.overlay}>
                        <div className={styles.modal}>
                            { children }
                            <button className={styles.close} onClick={onClose}></button>
                        </div>
                    </div>
                    
                </>
            ), 
            modalRoot
        );
  }
}

export default Modal;