

import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import LoadingPage from "../../pages/loading-page/loading-page"
import PropTypes from 'prop-types';




const ProtectedRoute = ({ onlyUnAuth = false, component }) => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const isAuthChecked = useSelector((store) => store.userAuth.isAuthChecked);
  const isAuthenticated = useSelector((store) => store.userAuth.isAuthenticated);
  const location = useLocation();

  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Выводим прелоадер в ПР
    // Здесь возвращается просто null для экономии времени
    return <LoadingPage />;
  }

  if (onlyUnAuth && isAuthenticated) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или sна тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

  return component;
};

ProtectedRoute.propTypes = {
  onlyUnAuth: PropTypes.bool,
  component: PropTypes.element.isRequired,
};

export default ProtectedRoute;

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }) => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
);

