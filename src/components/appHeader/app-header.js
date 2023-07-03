import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';





const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={`${styles.item} pl-5 pt-4 pr-5 pb-4`}>
            <BurgerIcon type="TIconTypes" />
            <Link to="/" className={`${styles.link} text text_type_main-default ml-2`}>Конструктор</Link>
          </li>
          <li className={`${styles.item} pl-5 pt-4 pr-5 pb-4`}>
            <ListIcon type="TIconTypes" />
            <Link to="/" className={`${styles.link} text text_type_main-default ml-2`}>Лента заказов</Link>
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
            <Link to="/profile" className={`${styles.link} text text_type_main-default ml-2`}>Личный кабинет</Link>
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

