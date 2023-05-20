import React from "react";
import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon

} from "@ya.praktikum/react-developer-burger-ui-components"; // импорт компонентов из библиотеки
import styles from "./burger-constructor-styles.module.css"; // импорт стилей
import PropTypes from 'prop-types'; // импорт проптайпсов
import iconPropTypes from '../appHeader/app-header.js'; // импорт проптайпсов для иконок
import { DataContext, IngredientContext, TotalPriceContext } from "../../services/app-context.js"; // импорт контекста


// Burger Ingredients component

function BurgerConstructor({ handleOrderDetailsOpen }) {

  // получение данных из контекста
  const { data } = React.useContext(DataContext);
  const { currentIngredients, setCurrentIngredients } = React.useContext(IngredientContext);
  const { totalPrice, setTotalPrice } = React.useContext(TotalPriceContext);

  // обработчик удаления ингредиента
  const handleClose = (item) => {
    setCurrentIngredients({
      ...currentIngredients,
      ingredients: currentIngredients.ingredients.filter(
        (ingredient) => ingredient._id !== item._id
      ),
    });
    setTotalPrice({ type: "deleteIngredient", payload: item.price });

  };


  return (
    <section
      className={`${styles.container} pt-25 pl-4 pr-4`}
    >
      <div className={`${styles.ingredients}`}>

        {/* секция с верхней булкой */}
        <ul className={`${styles.ingredientsTop}`}>
          {data.map((item) => {
            return currentIngredients.bun === item
              ? (
                <ConstructorElement
                  key={item._id}
                  type="top"
                  isLocked={true}
                  text={`${item.name} (верх)`}
                  price={item.price}
                  thumbnail={item.image}
                />
              )
              : null;
          })}

        </ul>

        {/* секция с ингредиентами */}
        <ul className={styles.ingredientsCenter}>
          {data.map((item) => {
            return currentIngredients.ingredients.some((ingredient) => ingredient._id === item._id)
              ? (
                <li key={item._id} className={styles.listElement}>
                  <DragIcon type="TIconTypes" />
                  <ConstructorElement
                    isLocked={false}
                    type="undefined"
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={() => handleClose(item)}
                  />
                </li>
              )
              : null;
          })}
        </ul>

        {/* секция с нижней булкой */}
        <ul className={`${styles.ingredientsBottom}`}>
          {data.map((item) => {
            return currentIngredients.bun === item
              ? (
                <ConstructorElement
                  key={item._id}
                  type="bottom"
                  isLocked={true}
                  text={`${item.name} (низ)`}
                  price={item.price}
                  thumbnail={item.image}
                />
              )
              : null;
          })}
        </ul>
      </div>

      <div className={`${styles.totalPrice} mt-10`}>

        <div className={`${styles.totalPriceText}`}>
          <p className="text text_type_digits-medium">{totalPrice.totalPrice}</p>
          <CurrencyIcon type="TIconTypes" />
        </div>
        <Button onClick={handleOrderDetailsOpen} type="primary" size="large" htmlType="submit">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}


BurgerConstructor.propTypes = {
  handleOrderDetailsOpen: PropTypes.func.isRequired,
};


CurrencyIcon.propTypes = iconPropTypes;
DragIcon.propTypes = iconPropTypes;






export default BurgerConstructor;
