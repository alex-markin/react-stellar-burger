// импорт библиотек
import { FormEvent, useState, useRef } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { resetPassword } from "../../services/user-auth-slice";
import { useDispatch } from "../../hooks/redux-hooks";

// импорт роутов
import { ROUTES } from "../../components/app/app";

// импорт стилей
import styles from "./styles.module.css";

// импорт обработчика отображения пароля
import { showPasswordHandler } from "../../utils/show-password-handler";



function ResetPassword() {

  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const inputRef = useRef(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(resetPassword(password, token));
  }




  return (
    <main className={styles.page}>
      <div className={styles.contentContainer}>
        <h1 className={`${styles.header} text text_type_main-medium`}>Восстановление пароля</h1>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.inputContainer}>
            <Input
              type={'password'}
              placeholder={'Введите новый пароль'}
              onChange={e => setPassword(e.target.value)}
              value={password}
              name={'new-password'}
              icon="ShowIcon"
              error={false}
              ref={inputRef}
              // onIconClick={onIconClick}
              errorText={'Ошибка'}
              size={'default'}
            />

            <Input
              type={!showPassword ? 'password' : 'text'}
              placeholder={'Введите код из письма'}
              onChange={e => setToken(e.target.value)}
              onIconClick={() => showPasswordHandler(setShowPassword, showPassword)}
              value={token}
              name={'reset-code'}
              error={false}
              ref={inputRef}
              errorText={'Ошибка'}
              size={'default'}
            />
          </div>

          <Button type="primary" size="medium" htmlType="submit" >Восстановить</Button>
        </form>

        <div className={styles.linkContainer}>
          <div className={styles.linkBlock}>
            <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
            <Link to={ROUTES.LOGIN} className={`${styles.link} text text_type_main-default`}>Войти</Link>
          </div>
        </div>

      </div>
    </main>
  );
}

export default ResetPassword;
