import React from "react";
import styles from "./burger-ingredients.module.css"; // импорт стилей
import Tabs from "../tabs/tabs.jsx"; // импорт компонента Табс
import Ingredient from "../ingredient/ingredient.jsx"; // импорт компонента Ингредиент
import { PropTypes, func } from 'prop-types'; // импорт проптайпсов
import { priceSlice } from "../../services/price-slice.js"; // импорт редьюсера для подсчёта цены
import { ingredientsSlice } from "../../services/ingredients-slice"; // импорт редьюсера для подсчёта цены
import { useSelector, useDispatch } from "react-redux"; // импорт хука редакса

// Burger Ingredients component
function BurgerIngredients({ handleIngredientDetails }) {

  const dispatch = useDispatch(); // диспатч Redux

  // получение данных из хранилища Redux
  const currentIngredients = useSelector((store) => store.ingredients); // выбранные ингредиенты для конструктора
  const { data } = useSelector((store) => store.data); // данные с сервера


  // обработчик выбора ингредиента (временный)
  const handleIngredientClick = (item) => {

    if (item.type !== "bun") { // если выбрана начинка
      dispatch(ingredientsSlice.actions.addIngredient(item));
      dispatch(priceSlice.actions.addIngredient(item.price));

    } else { // если выбрана булка
      currentIngredients.bun && dispatch(priceSlice.actions.removeIngredient(currentIngredients.bun.price * 2));
      dispatch(ingredientsSlice.actions.changeBun(item));
      dispatch(priceSlice.actions.addIngredient(item.price * 2));
    }
  };

  // установка заглавий Табсов
  const tabData = [
    { value: "Булки", label: "Булки" },
    { value: "Соусы", label: "Соусы" },
    { value: "Начинки", label: "Начинки" },
  ];

  return (
    <section className={`${styles.container} pt-10`}>
      <h1 className={`text text_type_main-large mb-5`}>Соберите бургер</h1>
      <Tabs tabData={tabData} />

      <div className={`${styles.ingredients} `}>

        <div className={`${styles.ingredientType} pt-6`}>
          <h2 className={`text text_type_main-medium `}>Булки</h2>
          <div className={`${styles.ingredientContainer} `}>
            {data.map((item) => {
              if (item.type === "bun") {
                return (
                  <Ingredient
                    key={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    onClick={() => handleIngredientClick(item)}
                  />
                );
              }
            })}
          </div>
        </div>

        <div className={`${styles.ingredientType} pt-6`}>
          <h2 className={`text text_type_main-medium `}>Соусы</h2>
          <div className={`${styles.ingredientContainer} `}>
            {data.map((item) => {
              if (item.type === "sauce") {
                return (
                  <Ingredient
                    key={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    onClick={() => handleIngredientClick(item)}
                  />
                );
              }
            })}
          </div>
        </div>

        <div className={`${styles.ingredientType} pt-6`}>
          <h2 className={`text text_type_main-medium `}>Начинки</h2>
          <div className={`${styles.ingredientContainer} `}>
            {data.map((item) => {
              if (item.type === "main") {
                return (
                  <Ingredient
                    key={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    onClick={() => handleIngredientClick(item)}
                  />
                );
              }
            })}
          </div>
        </div>

      </div>
    </section>
  );
}


BurgerIngredients.propTypes = {
  handleIngredientDetails: func.isRequired,
};


export default BurgerIngredients;
