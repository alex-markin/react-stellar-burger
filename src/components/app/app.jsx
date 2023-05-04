import React from "react";
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import styles from "./app.module.css";
import Modal from "../modal/modal";


function App(props) {
  const [data, setData] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(true);

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

    function handleModalOpen() {
      setIsModalOpen(true);
    }

    function handleModalClose() {
      setIsModalOpen(false);
    }
    
    const modal = isModalOpen ? (
      <Modal onClose={handleModalClose}>
        <p>Модальное окно</p>
      </Modal>
    ) : null;


  return (
    <>
      <AppHeader />
      <div className={styles.contentContainer}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </div>
      {modal}
    </>
  );
}

export default App;
