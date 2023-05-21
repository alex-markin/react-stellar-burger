import React from "react";
import AppHeader from "../appHeader/app-header"; // импорт компонента хедера
import BurgerIngredients from "../burger-ingredients/burger-ingredients"; // импорт компонента ингредиентов бургера
import BurgerConstructor from "../burger-constructor/burger-constructor"; // импорт компонента конструктора бургера
import styles from "./app.module.css"; // импорт стилей
import Modal from "../modal/modal.jsx"; // импорт компонента модального окна
import OrderDetails from "../order-details/order-details.jsx"; // импорт компонента деталей заказа
import IngredientDetails from "../ingredient-details/Ingredient-details"; // импорт компонента деталей ингредиента
import { useModal } from "../../hooks/use-modal.js"; // импорт хука модального окна
import { DataContext, IngredientContext, TotalPriceContext } from "../../services/app-context.js"; // ипорт контекста
import { priceReducer } from "../../services/reducers.js"; // импорт редьюсера для подсчёта цены
import { placeOrder } from "../../utils/place-order.js"; // импорт функции для взаимодействия с сервером для размещения заказа
import { checkReponse } from "../../utils/check-response.js"; // импорт функции для проверки ответа сервера


const orderID = '034536';
const url = "https://norma.nomoreparties.space/api";
const initialState = {
  totalPrice: 0,
};

function App() {


  // РЕЬЮЕРУ: привет! в брифе не прописано начальное состояние конструктора, так что я предположил, что по-умолчанию он пустой. Нужно покликать на ингридиенты :)


  // стейты
  const [data, setData] = React.useState([]); // данные с сервера
  const { isModalOpen, openModal, closeModal } = useModal(); // стейт модального окна
  const [orderDetailsOpen, setOrderDetailsOpen] = React.useState(false); // открытие модального окна с деталями заказа
  const [ingredientDetailOpen, setIngredientDetailsOpen] = React.useState(false); // открытие модального окна с деталями ингредиента
  const [selectedIngredient, setSelectedIngredient] = React.useState(null); // выбранный ингредиент для модального окна
  const [currentIngredients, setCurrentIngredients] = React.useState({ bun: null, ingredients: [] }); // выбранные ингредиенты для конструктора
  const [totalPrice, setTotalPrice] = React.useReducer(priceReducer, initialState); // общая стоимость заказа
  const [orderNumber, setOrderNumber] = React.useState(""); // номер заказа
  const [isLoading, setIsLoading] = React.useState(false); // стейт загрузки

  // присваиваем значения контекстов
  const DataContextValue = React.useMemo(() => ({ data, setData }), [data, setData]);
  const IngredientContextValue = React.useMemo(() => ({ currentIngredients, setCurrentIngredients }), [currentIngredients, setCurrentIngredients]);
  const TotalPriceContextValue = React.useMemo(() => ({ totalPrice, setTotalPrice }), [totalPrice, setTotalPrice]);


  // получаем данные с сервера
  React.useEffect(() => {
    fetch(`${url}/ingredients`)
      .then(checkReponse)
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  // функция отправки заказа и получения номера заказа
  function handlePlaceOrder() {
    if (currentIngredients.bun && currentIngredients.ingredients.length > 0) {
      setIsLoading(true);
      placeOrder(url, currentIngredients)
        .then((orderNumber) => {
          setOrderNumber(orderNumber);
        })
        .catch((err) => {
          console.log(err);
          setOrderNumber(`Ошибка заказа: ${err}`)
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
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
  }

  // функция открытия модального окна с деталями ингредиента
  function handleIngredientDetailsOpen(item) {
    setSelectedIngredient(item);
    openModal();
    setIngredientDetailsOpen(true);
  }

  function handleIngredientDetailsClose() {
    closeModal();
    setIngredientDetailsOpen(false);
  }


  // работа модального окна
  const modal = isModalOpen && orderDetailsOpen && orderNumber ?
    (
      <Modal onClose={handleOrderDetailsClose}>
        {isLoading ? (
          <p>Загрузка...</p>
        ) : (
          <OrderDetails orderNumber={orderNumber} />
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
      <AppHeader />
      <main className={styles.contentContainer}>
        <DataContext.Provider value={DataContextValue}>
          <IngredientContext.Provider value={IngredientContextValue}>
            <TotalPriceContext.Provider value={TotalPriceContextValue}>
              <BurgerIngredients handleIngredientDetails={handleIngredientDetailsOpen} />
              <BurgerConstructor handleOrderDetailsOpen={handleOrderDetailsOpen} />
            </TotalPriceContext.Provider>
          </IngredientContext.Provider>
        </DataContext.Provider>
      </main>
      {modal}
    </>
  );
}


export default App;
