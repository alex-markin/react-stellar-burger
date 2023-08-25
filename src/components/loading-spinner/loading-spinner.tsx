import styles from "./loading-spinner.module.css";

type LoadingSpinnerProps = {
  loadingText: string;
}

export default function LoadingSpinner({ loadingText }: LoadingSpinnerProps) {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <p className={`text text_type_main-medium`}>{loadingText}</p>
    </div>
  );
}


