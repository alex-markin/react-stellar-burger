// импорт библиотек
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from "react";

// импорт страниц
import Main from "../../pages/main/main"; // импорт компонента главной страницы
import LogIn from "../../pages/authorisation/login"; // импорт компонента страницы авторизации
import Register from "../../pages/authorisation/register"; // импорт компонента страницы регистрации
import ForgotPassword from "../../pages/authorisation/forgot-password"; // импорт компонента страницы восстановления пароля
import ResetPassword from "../../pages/authorisation/reset-password"; // импорт компонента страницы сброса пароля
import NotFound404 from "../../pages/not-found-404/not-found-404"; // импорт компонента страницы 404;
import Profile from "../../pages/profile/profile"; // импорт компонента страницы профиля
import Modal from "../modal/modal"; // импорт компонента модального окна
import OrderFeed from "../../pages/order-feed/order-feed"; // импорт компонента страницы ленты заказов

// импорт компонентов
import AppHeader from "../appHeader/app-header"; // импорт компонента шапки
import IngredientDetails from "../ingredient-details/Ingredient-details" // импорт компонента деталей ингредиента
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route"; // импорт компонента защищенного роута
import OrderDetalisation from "../order-detalisation/order-detalisation"; // импорт компонента детализации заказа

// импорт хуков
import { checkUserAuth } from "../../services/user-auth-slice"; // импорт функции проверки авторизации пользователя
import { useSelector, useDispatch } from "../../hooks/redux-hooks"; // импорт хука редакса
import { getSelectedIngredient } from "../../services/store-selectors"; // импорт функций useSelector


export const ROUTES = {
  MAIN: '/',
  ORDER_FEED: '/feed',
  PROFILE: '/profile',
  PROFILE_ORDERS: '/profile/orders',
  FEED_ORDER_DETAILS: '/feed/:orderId',
  PROFILE_ORDER_DETAILS: '/profile/orders/:orderId',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  NOT_FOUND: '/*',
  INGREDIENT_DETAILS: '/ingredients/:ingredientId',
  INGREDIENT_MODAL: '/:ingredientId',
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
        <Route path={ROUTES.ORDER_FEED} element={<OrderFeed />} />

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
              < OnlyAuth component={<IngredientDetails isIndependent={true} />} />
            )
          }
        />

        <Route
          path={ROUTES.FEED_ORDER_DETAILS}
          element={
            background ? (
              <Modal onClose={handleModalClose}>
                <OrderDetalisation />
              </Modal>
            ) : (
              <OnlyAuth component={< OrderDetalisation />} />
            )} />

        <Route
          path={ROUTES.PROFILE_ORDER_DETAILS}
          element={
            background ? (
              <Modal onClose={handleModalClose}>
                <OrderDetalisation />
              </Modal>
            ) : (
              <OnlyAuth component={< OrderDetalisation />} />
            )} />

      </Routes>
    </>
  );
}


export default App;

// Для ревьюера
// Добрый день. Не совсем понял историю с модальным окном. В задании она должна вести на роут
//  : ingredientID. Следовательно, на этом пути и нет страницы main. Или я как-то неправильно трактую?