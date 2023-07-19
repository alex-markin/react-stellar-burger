import styles from "./loading-spinner.module.css";
import propTypes from "prop-types";

const LoadingSpinner = ({loadingText}) => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <p className={`text text_type_main-medium`}>{loadingText}</p>
    </div>
  );
}

LoadingSpinner.propTypes = {
  loadingText: propTypes.string,
}

export default LoadingSpinner;
