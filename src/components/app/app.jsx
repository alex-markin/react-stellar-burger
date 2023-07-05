// импорт библиотек
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from "react";

// импорт страниц
import Main from "../../pages/main/main.jsx"; // импорт компонента главной страницы
import LogIn from "../../pages/authorisation/login.jsx"; // импорт компонента страницы авторизации
import Register from "../../pages/authorisation/register.jsx"; // импорт компонента страницы регистрации
import ForgotPassword from "../../pages/authorisation/forgot-password.jsx"; // импорт компонента страницы восстановления пароля
import ResetPassword from "../../pages/authorisation/reset-password.jsx"; // импорт компонента страницы сброса пароля
import NotFound404 from "../../pages/not-found-404/not-found-404.jsx"; // импорт компонента страницы 404;
import Profile from "../../pages/profile/profile.jsx"; // импорт компонента страницы профиля
import Modal from "../modal/modal.jsx"; // импорт компонента модального окна
import IngredientsDetails from "../ingredient-details/Ingredient-details.jsx" // импорт компонента деталей ингредиента

// импорт компонентов
import AppHeader from "../appHeader/app-header.js"; // импорт компонента шапки
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route.jsx"; // импорт компонента защищенного роута

import { checkUserAuth } from "../../services/user-auth-slice.js"; // импорт функции проверки авторизации пользователя
import { useSelector, useDispatch } from 'react-redux';


function App() {

  const dispatch = useDispatch();
  // const location = useLocation();
  // const navigate = useNavigate();
  // const background = location.state && location.state.background;


  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);




  return (
    <>


      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path='/' element={<OnlyAuth component={<Main />} />} >
            <Route path="/ingredients/:ingredientId" element={<OnlyAuth component={
              <Modal>
                <IngredientsDetails />
              </Modal>} />} />
          </Route>
          <Route path="/profile" element={<OnlyAuth component={<Profile />} />} />
          <Route path="/profile/orders" element={<OnlyAuth component={<Profile />} />} />
          <Route path="/login" element={<OnlyUnAuth component={<LogIn />} />} />
          <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
          <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>

        {/* {background && (
          <Routes>
            <Route
              path='/ingredients/:ingredientId'
              element={
                <Modal>
                  <IngredientsDetails />
                </Modal>
              }
            />
          </Routes>
        )} */}

      </BrowserRouter>
    </>
  );
}


export default App;
