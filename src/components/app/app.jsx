// импорт библиотек
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
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
import IngredientDetails from "../ingredient-details/Ingredient-details.jsx" // импорт компонента деталей ингредиента

// импорт компонентов
import AppHeader from "../appHeader/app-header.js"; // импорт компонента шапки
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route.jsx"; // импорт компонента защищенного роута

// импорт хуков
import { checkUserAuth } from "../../services/user-auth-slice.js"; // импорт функции проверки авторизации пользователя
import { useSelector, useDispatch } from 'react-redux'; // импорт хука редакса
import { getSelectedIngredient } from "../../services/store-selectors.js"; // импорт функций useSelector


function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  const { selectedIngredient } = useSelector(getSelectedIngredient);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <>
      <AppHeader />
      <Routes>
        <Route path='/' element={<OnlyAuth component={<Main />} />} />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />} />
        <Route path="/profile/orders" element={<OnlyAuth component={<Profile />} />} />
        <Route path="/login" element={<OnlyUnAuth component={<LogIn />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
        <Route path="*" element={<NotFound404 />} />
        <Route
          path="/ingredients/:ingredientId"
          element={
            background ? (
              <Modal onClose={handleModalClose}>
                <IngredientDetails ingredient={selectedIngredient} />
              </Modal>
            ) : (
              < IngredientDetails isIndependent={true} />
            )
          }
        />
      </Routes>
    </>
  );
}


export default App;
