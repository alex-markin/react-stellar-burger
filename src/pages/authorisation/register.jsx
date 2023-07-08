import React from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { register } from "../../services/user-auth-slice.js";

// импорт роутов
import { ROUTES } from "../../components/app/app.jsx";

function Register() {

  const [nameValue, setName] = React.useState('');
  const [mailValue, setMail] = React.useState('');
  const [passwordValue, setPassword] = React.useState('');

  const inputRef = React.useRef(null);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(nameValue, mailValue, passwordValue));
  }


  return (
    <main className={styles.page}>
      <div className={styles.contentContainer}>
        <h1 className={`${styles.header} text text_type_main-medium`} >Регистрация</h1>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.inputContainer}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={e => setName(e.target.value)}
              value={nameValue}
              name={'name'}
              error={false}
              ref={inputRef}
              errorText={'Ошибка'}
              size={'default'}
            />
            <Input
              type={'email'}
              placeholder={'E-mail'}
              onChange={e => setMail(e.target.value)}
              value={mailValue}
              name={'email'}
              error={false}
              ref={inputRef}
              errorText={'Ошибка'}
              size={'default'}
            />
            <Input
              type={'password'}
              placeholder={'Пароль'}
              onChange={e => setPassword(e.target.value)}
              icon={'ShowIcon'}
              value={passwordValue}
              name={'password'}
              error={false}
              ref={inputRef}
              // onIconClick={onIconClick}
              errorText={'Ошибка'}
              size={'default'}
            />
          </div>

          <Button type="primary" size="medium" htmlType="submit">Зарегистрироваться</Button>
        </form>

        <div className={styles.linkContainer}>
          <div className={styles.linkBlock}>
            <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы? </p>
            <Link to={ROUTES.LOGIN} className={`${styles.link} text text_type_main-default`}>Войти</Link>
          </div>
        </div>

      </div>
    </main>
  );
}

export default Register;
