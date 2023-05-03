import { BurgerIcon, ListIcon, ProfileIcon, Box, Typography, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './appHeader.module.css';
import PropTypes from 'prop-types';




const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={`${styles.item} pl-5 pt-4 pr-5 pb-4`}>
            <BurgerIcon type="TIconTypes" />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </li>
          <li className={`${styles.item} pl-5 pt-4 pr-5 pb-4`}>
            <ListIcon type="TIconTypes" />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </li>

        </ul>
      </nav>
      
      <div className={styles.logo}>
        <Logo  />
      </div>

      <nav className={styles.account}>
        <ul className={styles.list}>
          <li className={`${styles.item} pl-5 pt-4 pr-5 pb-4`}>
            <ProfileIcon type="TIconTypes" />
            <p className="text text_type_main-default ml-2">Личный кабинет</p>
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

