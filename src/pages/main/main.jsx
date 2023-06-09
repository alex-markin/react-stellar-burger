// импорт библиотек
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from 'react-router-dom';


// импорт компонентов
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients"; // импорт компонента ингредиентов бургера
import BurgerConstructor from "../../components/burger-constructor/burger-constructor"; // импорт компонента конструктора бургера
import Modal from "../../components/modal/modal"; // импорт компонента модального окна
import OrderDetails from "../../components/order-details/order-details.jsx"; // импорт компонента деталей заказа

// импорт стилей
import styles from "./main.module.css";

// импорт хуков
import { useModal } from "../../hooks/use-modal.js"; // импорт хука модального окна
import { useSelector, useDispatch } from "react-redux"; // импорт хука редакса

// импорт слайсов и редьюсеров Redux toolkit
import { fetchData } from "../../services/data-slice.js"; // импорт редьюсера для получения данных с сервера
import { selectedIngredientSlice } from "../../services/selected-ingredient-slice.js"; // импорт редьюсера для выбранного ингредиента
import { orderSlice } from "../../services/order-slice.js"; // импорт редьюсера для заказа

// импорт утилитарных функций
import { placeOrder } from "../../services/order-slice.js"; // импорт функции для взаимодействия с сервером для размещения заказа

// импорт функций useSelector
import { getCurrentIngredients, getCurrentOrder, getData } from "../../services/store-selectors.js";


// адрес сервера
const url = "https://norma.nomoreparties.space/api";


function Main() {

  // диспатч Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // стейты
  const { isModalOpen, openModal } = useModal(); // стейт модального окна
  const [orderDetailsOpen, setOrderDetailsOpen] = React.useState(false); // открытие модального окна с деталями заказа

  // получение данных из хранилища Redux
  const data = useSelector(getData); // данные с сервера
  const currentIngredients = useSelector(getCurrentIngredients); // выбранные ингредиенты для конструктора
  const { order } = useSelector(getCurrentOrder); // заказ

  // получаем данные с сервера
  React.useEffect(() => {
    // проверка наличия данных в хранилище
    if (data.data.length === 0) {
      dispatch(fetchData(url));
    }
  }, [url]);

  // функция отправки заказа и получения номера заказа
  function handlePlaceOrder() {
    dispatch(placeOrder(url, currentIngredients));
  };

  // функция открытия модального окна с деталями заказа
  async function handleOrderDetailsOpen() {
    try {
      handlePlaceOrder();
      openModal();
      setOrderDetailsOpen(true);
    } catch (err) {
      console.log(err);
    }
  }

  function handleOrderDetailsClose() {
    openModal();
    setOrderDetailsOpen(false);
    dispatch(orderSlice.actions.resetOrder());
  }

  // функция открытия модального окна с деталями ингредиента
  function handleIngredientDetailsOpen(item) {
    dispatch(selectedIngredientSlice.actions.mountIngredient(item));
    openModal();
  }

  const modal = orderDetailsOpen && order ?
    (
      <Modal onClose={handleOrderDetailsClose}>
        {order.loading ? (
          <p>Загрузка...</p>
        ) : (
          <OrderDetails orderNumber={order.number} />
        )}
      </Modal>
    ) : null;


  return (
    <>
      <main className={styles.contentContainer}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients handleIngredientDetails={handleIngredientDetailsOpen} />
          <BurgerConstructor handleOrderDetailsOpen={handleOrderDetailsOpen} />
        </DndProvider>
      </main>
      {modal}
    </>
  );
}


export default Main;
