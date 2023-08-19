import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components"; // импорт компонентов из библиотеки Яндекс.Практикум
import { v4 as uuidv4 } from 'uuid'; // импорт библиотеки uuid

// импорт типов
import { Item } from "../../utils/types";

// импорт стилей
import styles from "./burger-constructor-styles.module.css";


// импорт слайсов и редьюсеров Redux toolkit
import { ingredientsSlice } from "../../services/ingredients-slice";

// импорт хуков
import { useSelector, useDispatch } from "react-redux"; // импорт хука редакса
import { useCallback } from "react";
import { useDrop } from 'react-dnd'; // импорт хука для перетаскивания

// импорт компонентов
import DraggableIngredient from "../draggable-ingredient/draggable-ingredient";


// импорт функций useSelector
import { getCurrentIngredients, getData } from "../../services/store-selectors";

// Burger Ingredients component

type BurgerConstructorProps = {
  handleOrderDetailsOpen: () => void;
}

export default function BurgerConstructor({ handleOrderDetailsOpen }: BurgerConstructorProps) {

  const dispatch = useDispatch(); // диспатч Redux

  // получение данных из хранилища Redux
  const currentIngredients = useSelector(getCurrentIngredients); // выбранные ингредиенты для конструктора
  const { data } = useSelector(getData); // данные с сервера



  // рассчёт итоговой стоимости заказа
  type Ingredient = {
    price: number;
  }

  const totalPrice: number = currentIngredients.ingredients.reduce((acc: number, ingredient: Ingredient) => {
    return acc + ingredient.price;
  }, 0) + (currentIngredients.bun ? currentIngredients.bun.price * 2 : 0);


  // перетаскивание ингредиентов

  type DragItem = {
    type: string;
    item: Item;
    source: string;
  }

  type isHover = {
    isHover: boolean;
  }

  const [{ isHover }, dropTarget] = useDrop<DragItem, void, isHover>({
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
  const handleClose = (item: Item) => {
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
          {data.map((item: Item) => {
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
          {currentIngredients.ingredients.map((item: Item, index: number) => {
            return item
              ? (
                <DraggableIngredient
                  key={item.uuid}
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
          {data.map((item: Item) => {
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
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={handleOrderDetailsOpen} type="primary" size="large" htmlType="submit">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}


