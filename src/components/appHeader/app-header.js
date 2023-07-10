import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import { ROUTES } from '../../components/app/app.jsx'




const AppHeader = () => {

  const location = useLocation();

  // функция для определения активного NavLink
  const isActive = (url) => {
    return location.pathname === url;
  }

  const activeStyle = `${styles.link} ${styles.activeLink} text text_type_main-default ml-2 `;
  const inactiveStyle = `${styles.link} text text_type_main-default text_color_inactive ml-2`;


  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={`${styles.item} pl-5 pt-4 pr-5 pb-4`}>
            <BurgerIcon type="TIconTypes" />
            <NavLink
              to={ROUTES.MAIN}
              className={isActive(ROUTES.MAIN) ? activeStyle : inactiveStyle}
            //  className={`${styles.link} text text_type_main-default ml-2`}
            >
              Конструктор
            </NavLink>
          </li>
          <li className={`${styles.item} pl-5 pt-4 pr-5 pb-4`}>
            <ListIcon type="TIconTypes" />
            <NavLink
              to={ROUTES.NOT_FOUND}
              className={isActive(ROUTES.NOT_FOUND) ? activeStyle : inactiveStyle}
            // className={`${styles.link} text text_type_main-default ml-2`}
            >
              Лента заказов
            </NavLink>
          </li>

        </ul>
      </nav>

      <div className={styles.logo}>
        <Logo />
      </div>

      <nav className={styles.account}>
        <ul className={styles.list}>
          <li className={`${styles.item} pl-5 pt-4 pr-5 pb-4`}>
            <ProfileIcon type="TIconTypes" />
            <NavLink
              to={ROUTES.PROFILE}
              className={isActive(ROUTES.PROFILE) ? activeStyle : inactiveStyle}
            //  className={`${styles.link} text text_type_main-default ml-2`}
             >
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </nav>



    </header>
  );
}

export const iconPropTypes = {
  type: PropTypes.string.isRequired,
};

BurgerIcon.propTypes = iconPropTypes;
ListIcon.propTypes = iconPropTypes;
ProfileIcon.propTypes = iconPropTypes;



export default AppHeader;

