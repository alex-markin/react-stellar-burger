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


export const ROUTES = {
  MAIN: '/',
  PROFILE: '/profile',
  PROFILE_ORDERS: '/profile/orders',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  NOT_FOUND: '/*',
  INGREDIENT_DETAILS: '/ingredients/:ingredientId',
};

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
        <Route path={ROUTES.MAIN} element={<Main />} />
        <Route path={ROUTES.PROFILE} element={<OnlyAuth component={<Profile />} />} >
          <Route path={ROUTES.PROFILE_ORDERS} element={<OnlyAuth component={<Profile />} />} />
        </Route>
        <Route path={ROUTES.LOGIN} element={<OnlyUnAuth component={<LogIn />} />} />
        <Route path={ROUTES.REGISTER} element={<OnlyUnAuth component={<Register />} />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<OnlyUnAuth component={<ForgotPassword />} />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<OnlyUnAuth component={<ResetPassword />} />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound404 />} />
        <Route
          path={ROUTES.INGREDIENT_DETAILS}
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
