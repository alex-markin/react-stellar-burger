
// импорт библиотек и хуков
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// импорт стилей
import styles from './profile-edit.module.css';

// импорт экшенов и функций получения данных из хранилища
import { getUser } from "../../services/user-auth-slice.js";
import { changeUser } from "../../services/user-auth-slice.js";
import { getUserAuth } from "../../services/store-selectors.js";

function ProfileEdit() {

  // стейты инпутов
  const [nameValue, setName] = React.useState('');
  const [mailValue, setMail] = React.useState('');
  const [passwordValue, setPassword] = React.useState('');

  // стейт для видимости кнопок и реф для инпутов
  const [visible, setVisible] = React.useState(false);
  const inputRef = React.useRef(null);

  // стейт юзера, пароля и диспатч
  const user = useSelector(getUserAuth).user;
  const password = useSelector(getUserAuth).password;
  const dispatch = useDispatch();

  // эффект для получения данных юзера
  useEffect(() => {
    dispatch(getUser());
    setName(user.name);
    setMail(user.email);
  }, [dispatch]);

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
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(changeUser(nameValue, mailValue, passwordValue));
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

export default ProfileEdit;