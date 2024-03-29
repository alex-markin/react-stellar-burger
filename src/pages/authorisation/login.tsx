// импорт библиотек
import { FormEvent, useState, useRef } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "../../hooks/redux-hooks";
import { login } from "../../services/user-auth-slice";

// импорт роутов
import { ROUTES } from "../../components/app/app";


// импорт хуков и функций
import { showPasswordHandler } from "../../utils/show-password-handler";


function LogIn() {

  const [mailValue, setMail] = useState('');
  const [passwordValue, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login(mailValue, passwordValue));
  }





  return (
    <main className={styles.page}>
      <div className={styles.contentContainer}>
        <h1 className={`${styles.header} text text_type_main-medium`} >Вход</h1>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.inputContainer}>
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

          <Button type="primary" size="medium" htmlType="submit" >Войти</Button>
        </form>

        <div className={styles.linkContainer}>
          <div className={styles.linkBlock}>
            <p className="text text_type_main-default text_color_inactive">Вы - новый пользователь? </p>
            <Link to={ROUTES.REGISTER} className={`${styles.link} text text_type_main-default`}>Зарегистрироваться</Link>
          </div>
          <div className={styles.linkBlock}>
            <p className="text text_type_main-default text_color_inactive">Забыли пароль? </p>
            <Link to={ROUTES.FORGOT_PASSWORD} className={`${styles.link} text text_type_main-default`}>Восстановить пароль</Link>
          </div>
        </div>

      </div>
    </main>
  );
}

export default LogIn;
