
// импорт библиотек
import { NavLink, useLocation } from 'react-router-dom';

// импорт стилей
import styles from "./profile.module.css";

// импорт хуков и экшенов Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../services/user-auth-slice.js";

// импорт компонентов
import ProfileEdit from "../../components/profile-edit/profile-edit.jsx";
import OrdersHistory from "../../components/orders-history/orders-history.jsx";

const Profile = () => {

  // хуки
  const user = useSelector((state) => state.userAuth.user);
  const dispatch = useDispatch();
  const location = useLocation();

  // переменные путей
  const profilePath = '/profile';
  const ordersPath = '/profile/orders';

  // функция для определения активного NavLink
  const isActive = (url) => {
    return location.pathname === url;
  }

  const activeStyle = `${styles.link} ${styles.activeLink} text text_type_main-medium `;
  const inactiveStyle = `${styles.link} text text_type_main-medium text_color_inactive `;


  // функция выхода из аккаунта
  const logingOut = () => {
    dispatch(logout());
  }


  return (
    <main className={styles.page}>
      <div className={styles.contentContainer}>
        <nav className={styles.nav}>
          <li className={styles.navLink}>
            <NavLink
              to="/profile"
              className={isActive(profilePath) ? activeStyle : inactiveStyle}
            >
              Профиль
            </NavLink>
          </li>
          <li className={styles.navLink}>
            <NavLink
              to="/profile/orders"
              className={isActive(ordersPath) ? activeStyle : inactiveStyle}
            >
              История заказов
            </NavLink>
          </li>
          <li onClick={logingOut} className={`${styles.navLink} text text_type_main-medium text_color_inactive`}>
            Выход
          </li>
          <p className={`${styles.description} text text_type_main-default text_color_inactive`}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </nav>

        {location.pathname === profilePath && (
          <ProfileEdit
            // setMail={setMail}
            // setName={setName}
            // setPassword={setPassword}
            // nameValue={nameValue}
            // mailValue={mailValue}
            // passwordValue={passwordValue}
          />
        )}
        {location.pathname === ordersPath && (
          <OrdersHistory />
        )}
      </div>
    </main>

  )
}

export default Profile;
