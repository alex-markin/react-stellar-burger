import styles from "./loading-page.module.css";
import { Link } from 'react-router-dom';



function LoadingPage() {
  return (
    <main className={styles.page}>
      <div className={styles.contentContainer}>
        <h1 className={`${styles.header} text text_type_main-medium`}>Страница загружается...</h1>

        {/* <div className={styles.linkContainer}>
          <div className={styles.linkBlock}>
            <Link to="/" className={`${styles.link} text text_type_main-default`}>Вернуться на главную</Link>
          </div>
        </div> */}

      </div>
    </main>
  );
}

export default LoadingPage;
