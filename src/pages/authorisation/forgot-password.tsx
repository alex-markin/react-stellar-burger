import { FormEvent, useState, useRef } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from "../../services/user-auth-slice";
import { useDispatch } from "../../hooks/redux-hooks";

// импорт роутов
import { ROUTES } from "../../components/app/app";

function ForgotPassword() {

  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(forgotPassword(value));
    navigate(ROUTES.RESET_PASSWORD);
  }


  return (
    <main className={styles.page}>
      <div className={styles.contentContainer}>
        <h1 className={`${styles.header} text text_type_main-medium`}>Восстановление пароля</h1>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.inputContainer}>
            <Input
              type={'email'}
              placeholder={'Укажите e-mail'}
              onChange={e => setValue(e.target.value)}
              value={value}
              name={'email'}
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

export default ForgotPassword;
