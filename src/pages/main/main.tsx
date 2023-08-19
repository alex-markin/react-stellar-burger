// импорт библиотек
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from 'react-router-dom';


// импорт компонентов
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients"; // импорт компонента ингредиентов бургера
import BurgerConstructor from "../../components/burger-constructor/burger-constructor"; // импорт компонента конструктора бургера
import Modal from "../../components/modal/modal"; // импорт компонента модального окна
import OrderDetails from "../../components/order-details/order-details"; // импорт компонента деталей заказа
import ModalError from "../../components/modal-error/modal-error"; // импорт компонента модального окна с ошибкой

// импорт стилей
import styles from "./main.module.css";

// импорт хуков
import { useModal } from "../../hooks/use-modal"; // импорт хука модального окна
import { useSelector, useDispatch } from "react-redux"; // импорт хука редакса

// импорт слайсов и редьюсеров Redux toolkit
import { fetchData } from "../../services/data-slice"; // импорт редьюсера для получения данных с сервера
import { selectedIngredientSlice } from "../../services/selected-ingredient-slice"; // импорт редьюсера для выбранного ингредиента
import { orderSlice } from "../../services/order-slice"; // импорт редьюсера для заказа

// импорт утилитарных функций
import { placeOrder } from "../../services/order-slice"; // импорт функции для взаимодействия с сервером для размещения заказа

// импорт функций useSelector
import { getCurrentIngredients, getCurrentOrder, getData } from "../../services/store-selectors";
import { ingredientsSlice } from "../../services/ingredients-slice";

// импорт типов
import { Item } from "../../utils/types";


// адрес сервера
const url = "https://norma.nomoreparties.space/api";


export default function Main() {

  // диспатч Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // стейты
  const { isModalOpen, openModal } = useModal(); // стейт модального окна
  const [orderDetailsOpen, setOrderDetailsOpen] = React.useState(false); // открытие модального окна с деталями заказа

  // получение данных из хранилища Redux
  const data = useSelector(getData); // данные с сервера
  const currentIngredients = useSelector(getCurrentIngredients); // выбранные ингредиенты для конструктора
  const { order, loading } = useSelector(getCurrentOrder); // заказ

  // получаем данные с сервера
  React.useEffect(() => {
    // проверка наличия данных в хранилище
    if (data.data.length === 0) {
      dispatch(fetchData(url));
      localStorage.setItem('ingredients', JSON.stringify(data.data));
    }
  }, [url]);

  // функция отправки заказа и получения номера заказа
  function handlePlaceOrder() {
    currentIngredients.bun && currentIngredients.ingredients.length > 0 &&
      dispatch(placeOrder(url, currentIngredients));
  };

  // функция открытия модального окна с деталями заказа
  async function handleOrderDetailsOpen() {
    try {
      setOrderDetailsOpen(true);
      openModal();
      handlePlaceOrder();
    } catch (err) {
      console.log(err);
    }
  }

  function handleOrderDetailsClose() {
    openModal();
    setOrderDetailsOpen(false);
    dispatch(orderSlice.actions.resetOrder());
    dispatch(ingredientsSlice.actions.resetIngredients());

  }

  // функция открытия модального окна с деталями ингредиента
  function handleIngredientDetailsOpen(item: Item) {
    dispatch(selectedIngredientSlice.actions.mountIngredient(item));
    openModal();
  }

  const modal = orderDetailsOpen ?
    (
      <Modal onClose={handleOrderDetailsClose}>
        {(!currentIngredients.bun && currentIngredients.ingredients.length == 0) ? (
          <ModalError errorMessage={'Вы не добавили ни одного ингредиента. Пожалуйста, вернитесь в конструктор и выберите ингредиенты.'} />) : (
          <OrderDetails />)}
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
