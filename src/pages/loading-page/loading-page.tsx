import styles from "./loading-page.module.css";



export default function LoadingPage() {
  return (
    <main className={styles.page}>
      <div className={styles.contentContainer}>
        <h1 className={`${styles.header} text text_type_main-medium`}>Страница загружается...</h1>
      </div>
    </main>
  );
}

