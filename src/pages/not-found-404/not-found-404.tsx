import styles from "./not-found-404.module.css";
import { Link } from 'react-router-dom';

// импорт роутов
import { ROUTES } from "../../components/app/app";


export default function NotFound404() {
  return (
    <main className={styles.page}>
      <div className={styles.contentContainer}>
        <h1 className={`${styles.header} text text_type_main-medium`}>Ошибка 404: страница не найдена</h1>

        <div className={styles.linkContainer}>
          <div className={styles.linkBlock}>
            <Link to={ROUTES.MAIN} className={`${styles.link} text text_type_main-default`}>Вернуться на главную</Link>
          </div>
        </div>

      </div>
    </main>
  );
}

