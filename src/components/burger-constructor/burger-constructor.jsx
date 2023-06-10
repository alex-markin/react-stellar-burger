import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components"; // импорт компонентов из библиотеки Яндекс.Практикум
import { v4 as uuidv4 } from 'uuid'; // импорт библиотеки uuid

// импорт стилей
import styles from "./burger-constructor-styles.module.css";
import PropTypes from 'prop-types';
import iconPropTypes from '../appHeader/app-header.js'; // импорт проптайпсов для иконок

// импорт слайсов и редьюсеров Redux toolkit
import { ingredientsSlice } from "../../services/ingredients-slice";

// импорт хуков
import { useSelector, useDispatch } from "react-redux"; // импорт хука редакса
import { useCallback } from "react";
import { useDrag, useDrop } from 'react-dnd'; // импорт хука для перетаскивания

// импорт компонентов
import DraggableIngredient from "../draggable-ingredient/draggable-ingredient.jsx";


// импорт функций useSelector
import { getCurrentIngredients, getData } from "../../services/store-selectors.js";

// Burger Ingredients component

function BurgerConstructor({ handleOrderDetailsOpen }) {

  const dispatch = useDispatch(); // диспатч Redux

  // получение данных из хранилища Redux
  const currentIngredients = useSelector(getCurrentIngredients); // выбранные ингредиенты для конструктора
  const { data } = useSelector(getData); // данные с сервера

  // рассчёт итоговой стоимости заказа
  const totalPrice = currentIngredients.ingredients.reduce((acc, ingredient) => {
    return acc + ingredient.price;
  }, 0) + (currentIngredients.bun ? currentIngredients.bun.price * 2 : 0);


  // перетаскивание ингредиентов

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop({ item, source }) {

      if (item.type === "bun") {
        dispatch(ingredientsSlice.actions.changeBun(item));
      }

      if (source === "ingredients" && item.type !== "bun") {
        const uuid = uuidv4(); // генерация уникального id для ингредиента конструктора
        dispatch(ingredientsSlice.actions.addIngredient({ item, uuid }));
      }
    },

    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });


  // обработчик удаления ингредиента
  const handleClose = (item) => {
    dispatch(ingredientsSlice.actions.removeIngredient(item));
  };

  // колбэк смены ингредиентов местами
  const moveCard = useCallback((sourceIndex, hoverIndex) => {
    dispatch(ingredientsSlice.actions.reorderIngredients({ sourceIndex, hoverIndex }));
  }, [])


  // стили для контейнера ингредиентов
  const ingredientsContainerStyle = isHover ? `${styles.ingredients} ${styles.ingredientsHover}` : `${styles.ingredients}`;

  return (
    <section
      className={`${styles.container} pt-25 pl-4 pr-4`}
    >
      <div className={`${ingredientsContainerStyle}`} ref={dropTarget}>

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
        <ul className={styles.ingredientsCenter} >
          {currentIngredients.ingredients.map((item, index) => {
            return item
              ? (
                <DraggableIngredient
                  key={item.uuid}
                  uuid={item.uuid}
                  item={item}
                  handleClose={handleClose}
                  index={index}
                  moveCard={moveCard} />
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
          <p className="text text_type_digits-medium">{totalPrice}</p>
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
