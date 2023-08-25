import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { ROUTES } from '../app/app'




export default function AppHeader() {

  const location = useLocation();

  // функция для определения активного NavLink
  const isActive = (url: string) => {
    return location.pathname === url;
  }

  const activeStyle = `${styles.link} ${styles.activeLink} text text_type_main-default ml-2 `;
  const inactiveStyle = `${styles.link} text text_type_main-default text_color_inactive ml-2`;


  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={`${styles.item} pl-5 pt-4 pr-5 pb-4`}>
            <BurgerIcon type="primary" />
            <NavLink
              to={ROUTES.MAIN}
              className={isActive(ROUTES.MAIN) ? activeStyle : inactiveStyle}
            >
              Конструктор
            </NavLink>
          </li>
          <li className={`${styles.item} pl-5 pt-4 pr-5 pb-4`}>
            <div className={styles.iconContainer}><ListIcon type="primary" /></div>
            <NavLink
              to={ROUTES.ORDER_FEED}
              className={isActive(ROUTES.ORDER_FEED) ? activeStyle : inactiveStyle}
            >
              Лента заказов
            </NavLink>
          </li>

        </ul>
      </nav>

      <NavLink
        to={ROUTES.MAIN}
        className={styles.logo}>
        <Logo />
      </NavLink>

      <nav className={styles.account}>
        <ul className={styles.list}>
          <li className={`${styles.item} pl-5 pt-4 pr-5 pb-4`}>
            <ProfileIcon type="primary" />
            <NavLink
              to={ROUTES.PROFILE}
              className={isActive(ROUTES.PROFILE) ? activeStyle : inactiveStyle}
            >
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </nav>



    </header>
  );
}




