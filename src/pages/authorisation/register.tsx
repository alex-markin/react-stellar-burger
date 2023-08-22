import { FormEvent, useState, useRef } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import { Link } from 'react-router-dom';
import { useDispatch } from "../../hooks/redux-hooks";
import { register } from "../../services/user-auth-slice";

// импорт роутов
import { ROUTES } from "../../components/app/app";

// импорт обработчика отображения пароля
import { showPasswordHandler } from "../../utils/show-password-handler";

function Register() {

  const [nameValue, setName] = useState('');
  const [mailValue, setMail] = useState('');
  const [passwordValue, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const inputRef = useRef(null);

  const dispatch = useDispatch();

  const onSubmit = (e: FormEvent) => {
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
              type={!showPassword ? 'password' : 'text'}
              placeholder={'Пароль'}
              onChange={e => setPassword(e.target.value)}
              icon={'ShowIcon'}
              value={passwordValue}
              name={'password'}
              error={false}
              ref={inputRef}
              onIconClick={() => showPasswordHandler(setShowPassword, showPassword)}
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
