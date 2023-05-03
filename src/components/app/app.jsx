import React from "react";
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import styles from "./app.module.css";


function App(props) {
  const [data, setData] = React.useState([]);

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

  return (
    <>
      <AppHeader />
      <div className={styles.contentContainer}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </div>
    </>
  );
}

export default App;
