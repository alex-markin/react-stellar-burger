import React, { useEffect } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../services/user-auth-slice.js";

const Profile = () => {

  const [nameValue, setName] = React.useState('');
  const [mailValue, setMail] = React.useState('');
  const [passwordValue, setPassword] = React.useState('');

  const inputRef = React.useRef(null);

  const user = useSelector((state) => state.userAuth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setMail(user.email);
      setPassword(user.password);
    }
  }, [user]);

  const logingOut = () => {
    dispatch(logout());
    // Navigate('/login');
  }



  return (
    <main className={styles.page}>
      <div className={styles.contentContainer}>
        <nav className={styles.nav}>
          <li className={styles.navLink}>
            <NavLink
              to="/profile"
              className={`${styles.link} text text_type_main-medium text_color_inactive`}
            >
              Профиль
            </NavLink>
          </li>
          <li className={styles.navLink}>
            <NavLink
              to="/profile/orders"
              className={`${styles.link} text text_type_main-medium text_color_inactive`}
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
        <form className={styles.form}>
          <Input
            type={'text'}
            onChange={e => setName(e.target.value)}
            value={nameValue}
            name={'name'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
            icon="EditIcon"
          />
          <Input
            type={'email'}
            onChange={e => setMail(e.target.value)}
            value={mailValue}
            name={'name'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
            icon="EditIcon"
          />
          <Input
            type={'password'}
            onChange={e => setPassword(e.target.value)}
            value={passwordValue}
            name={'name'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
            icon="EditIcon"
          />
        </form>
      </div>
    </main>

  )
}

export default Profile;
