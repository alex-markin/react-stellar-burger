import React from "react";
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import styles from "./app.module.css";
import Modal from "../modal/modal.jsx";
import OrderDetails from "../orderDetails/orderDetails.jsx";
import IngredientDetails from "../ingredientDetails/IngredientDetails";
import ModalOverlay from "../modalOverlay/modalOverlay";
import PropTypes from 'prop-types';


const orderID = '034536';


function App(props) {

  // стейты
  const [data, setData] = React.useState([]);
  const [isModalOpened, setIsModalOpen] = React.useState(false);
  const [orderDetailsOpened, setOrderDetailsOpened] = React.useState(false);
  const [ingredientDetailOpened, setIngredientDetailOpened] = React.useState(false);
  const [selectedIngredient, setSelectedIngredient] = React.useState(null);

  // получаем данные с сервера
  React.useEffect(() => {
    fetch(props.url)
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
  }, [props.url]);

  // функция открытия модального окна с деталями заказа
  function handleOrderDetailsOpen() {
    setIsModalOpen(true);
    setOrderDetailsOpened(true);
  }

  function handleOrderDetailsClose() {
    setIsModalOpen(false);
    setOrderDetailsOpened(false);
  }

  // функция открытия модального окна с деталями ингредиента
  function handleIngredientDetailsOpen (item)  {
    setSelectedIngredient(item);
    setIsModalOpen(true);
    setIngredientDetailOpened(true);
  }

  function handleIngredientDetailsClose() {
    setIsModalOpen(false);
    setIngredientDetailOpened(false);
  }




  // работа модального окна
  const modal = isModalOpened && orderDetailsOpened ?
    (
      <ModalOverlay onClose={handleOrderDetailsClose}>
        <Modal onClose={handleOrderDetailsClose}>
          <OrderDetails orderID={orderID} />
        </Modal>
      </ModalOverlay>
    ) : isModalOpened && ingredientDetailOpened ?
      (
        <ModalOverlay onClose={handleIngredientDetailsClose}>
          <Modal onClose={handleIngredientDetailsClose}>
            <IngredientDetails ingredient={selectedIngredient} />
          </Modal>
        </ModalOverlay>
      ) : null;


  return (
    <>
      <AppHeader />
      <div className={styles.contentContainer}>
        <BurgerIngredients data={data} handleIngredientClick={handleIngredientDetailsOpen} />
        <BurgerConstructor data={data} handleOrderDetailsOpen={handleOrderDetailsOpen} />
      </div>
      {modal}
    </>
  );
}

App.propTypes = {
  url: PropTypes.string.isRequired,
};

export default App;
