// импорт библиотек
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// импорт компонентов
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients"; // импорт компонента ингредиентов бургера
import BurgerConstructor from "../../components/burger-constructor/burger-constructor"; // импорт компонента конструктора бургера
import Modal from "../../components/modal/modal"; // импорт компонента модального окна
import OrderDetails from "../../components/order-details/order-details.jsx"; // импорт компонента деталей заказа
import IngredientDetails from "../../components/ingredient-details/Ingredient-details"; // импорт компонента деталей ингредиента

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
import { getCurrentIngredients, getCurrentOrder, getData, getSelectedIngredient } from "../../services/store-selectors.js";
import {checkToken} from "../../services/user-auth-slice.js"; // импорт функции проверки токена


// адрес сервера
const url = "https://norma.nomoreparties.space/api";



function Main() {

  // диспатч Redux
  const dispatch = useDispatch();


  // стейты
  const { isModalOpen, openModal, closeModal } = useModal(); // стейт модального окна
  const [orderDetailsOpen, setOrderDetailsOpen] = React.useState(false); // открытие модального окна с деталями заказа
  const [ingredientDetailOpen, setIngredientDetailsOpen] = React.useState(false); // открытие модального окна с деталями ингредиента

  // получение данных из хранилища Redux
  const data = useSelector(getData); // данные с сервера
  const currentIngredients = useSelector(getCurrentIngredients); // выбранные ингредиенты для конструктора
  const { selectedIngredient } = useSelector(getSelectedIngredient); // выбранный ингредиент для модального окна
  const { order } = useSelector(getCurrentOrder); // заказ
  const { user } = useSelector((store) => store.userAuth); // пользователь

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
    setIngredientDetailsOpen(true);

  }

  function handleIngredientDetailsClose() {
    closeModal();
    setIngredientDetailsOpen(false);
    dispatch(selectedIngredientSlice.actions.unmountIngredient());
  }

  // работа модального окна
  const modal = isModalOpen && orderDetailsOpen && order ?
    (
      <Modal onClose={handleOrderDetailsClose}>
        {order.loading ? (
          <p>Загрузка...</p>
        ) : (
          <OrderDetails orderNumber={order.number} />
        )}
      </Modal>
    ) : isModalOpen && ingredientDetailOpen ?
      (
        <Modal onClose={handleIngredientDetailsClose}>
          <IngredientDetails ingredient={selectedIngredient} />
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
