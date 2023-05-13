import React from "react";
import AppHeader from "../appHeader/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import Modal from "../modal/modal.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import IngredientDetails from "../ingredient-details/Ingredient-details";
import { useModal } from "../../hooks/use-modal.js";

const orderID = '034536';
const url = "https://norma.nomoreparties.space/api/ingredients";

function App() {

  // стейты
  const [data, setData] = React.useState([]);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [orderDetailsOpen, setOrderDetailsOpen] = React.useState(false);
  const [ingredientDetailOpen, setIngredientDetailsOpen] = React.useState(false);
  const [selectedIngredient, setSelectedIngredient] = React.useState(null);

  // получаем данные с сервера
  React.useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  // функция открытия модального окна с деталями заказа
  function handleOrderDetailsOpen() {
    openModal();
    setOrderDetailsOpen(true);
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
  const modal = isModalOpen && orderDetailsOpen ?
    (
      <Modal onClose={handleOrderDetailsClose}>
        <OrderDetails orderID={orderID} />
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
        <BurgerIngredients data={data} handleIngredientDetails={handleIngredientDetailsOpen} />
        <BurgerConstructor data={data} handleOrderDetailsOpen={handleOrderDetailsOpen} />
      </main>
      {modal}
    </>
  );
}


export default App;
