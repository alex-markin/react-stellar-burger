
import styles from './modal-error.module.css';

type ModalErrorProps = {
  errorMessage: string;
}

export default function ModalError({errorMessage}: ModalErrorProps) {
  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-medium`}>Ошибка</h2>
      <p className={`${styles.text} text text_type_main-default`}>{errorMessage}</p>
    </div>
  )
}