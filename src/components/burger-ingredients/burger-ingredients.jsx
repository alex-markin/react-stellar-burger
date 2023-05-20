import React from "react";
import styles from "./burger-ingredients.module.css"; // импорт стилей
import Tabs from "../tabs/tabs.jsx"; // импорт компонента Табс
import Ingredient from "../ingredient/ingredient.jsx"; // импорт компонента Ингредиент
import { PropTypes, func } from 'prop-types'; // импорт проптайпсов
import { DataContext, IngredientContext, TotalPriceContext } from "../../services/app-context.js"; // ипорт контекста



// Burger Ingredients component
function BurgerIngredients({ handleIngredientDetails }) {

  // получение данных из контекста
  const { data } = React.useContext(DataContext);
  const { currentIngredients, setCurrentIngredients } = React.useContext(IngredientContext);
  const { setTotalPrice } = React.useContext(TotalPriceContext);


  // обработчик выбора ингредиента (временный)
  const handleIngredientClick = (item) => {
    if (item.type !== "bun") { // если выбрана начинка
      setCurrentIngredients({
        ...currentIngredients,
        ingredients: [...currentIngredients.ingredients, item]
      });
      setTotalPrice({ type: "addIngredient", payload: item.price });

    } else { // если выбрана булка
      currentIngredients.bun && setTotalPrice({ type: "deleteIngredient", payload: (currentIngredients.bun.price * 2) }); // удаляем стоимость предыдущей булки
      setCurrentIngredients({
        ...currentIngredients,
        bun: item
      });
      setTotalPrice({ type: "addIngredient", payload: (item.price * 2) }); // умножаем цену булки на 2
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
