
// импорт библиотек и хуков
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState, useRef, FormEvent } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// импорт стилей
import styles from './profile-edit.module.css';

// импорт экшенов и функций получения данных из хранилища
import { getUser } from "../../services/user-auth-slice.js";
import { changeUser } from "../../services/user-auth-slice.js";
import { getUserAuth } from "../../services/store-selectors.js";

export default function ProfileEdit() {

  // стейты инпутов
  const [nameValue, setName] = useState('');
  const [mailValue, setMail] = useState('');
  const [passwordValue, setPassword] = useState('');

  // стейт для видимости кнопок и реф для инпутов
  const [visible, setVisible] = useState(false);
  const inputRef = useRef(null);

  // стейт юзера, пароля и диспатч
  const user = useSelector(getUserAuth).user;
  const password = useSelector(getUserAuth).password;
  const dispatch = useDispatch();

  // эффект для получения данных юзера
  useEffect(() => {
    dispatch(getUser());
    setName(user.name);
    setMail(user.email);
  }, []);

  // функция для определения видимости кнопок
  const onFocus = () => {
    setVisible(true);
  }

  // функция для скрытия кнопок
  const onClick = () => {
    setVisible(false);
    setName(user.name);
    setMail(user.email);
    setPassword(password);
  }

  // функция для отправки данных на сервер
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(changeUser(nameValue, mailValue, passwordValue));
    setVisible(false);
  }


  let subbitBlockStyle = !visible ? `${styles.buttonBlock} ${styles.buttonBlock_inactive}` : `${styles.buttonBlock}`;



  return (
    <div>
      <form className={styles.form} onSubmit={onSubmit}>
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
          onFocus={onFocus}
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
          onFocus={onFocus}
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
          onFocus={onFocus}
        />

        <div className={subbitBlockStyle}>
          <Button htmlType="button" type="secondary" size="medium" onClick={onClick}>
            Отменить
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  )
}

