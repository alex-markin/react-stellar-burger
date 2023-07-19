
// импорт библиотек
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"; // импорт компонентов из библиотеки Яндекс.Практикум
import PropTypes from "prop-types"; // импорт библиотеки prop-types
import { useState } from "react"; // импорт хука useState

// импорт компонентов
import IngredientCircle from "../ingredient-circle/ingredient-circle.jsx"; // импорт компонента круглого ингредиента

// импорт стилей
import styles from "./order.module.css"; // импорт стилей
import othersImage from "../../images/cheese.png"; // импорт изображения

// импорт хуков и функций
import { formatDate } from "../../utils/format-date.js"; // импорт функции форматирования даты
import { useMatch } from 'react-router-dom';
import { useLocation, Link } from 'react-router-dom';
import { useMemo } from "react";

function Order({ order }) {

  const { ingredients, name, number, createdAt, _id } = order;

  // определение маршрута
  const match = useMatch({
    path: 'profile/orders',
    end: true,
    caseSensitive: true,
  })

  // определение пути и id заказа
  const orderNumber = number;
  const location = useLocation();
  const path = location.pathname;

  // получение базы ингредиентов из хранилища
  let ingredientsDatabase;
  try {
    ingredientsDatabase = JSON.parse(localStorage.getItem('ingredients'))
  } catch (e) {
    ingredientsDatabase = null;
  }

  // фильрация ингредиентов по id
  const filteredIngredients = ingredientsDatabase.filter((ingredient) => ingredients.includes(ingredient._id));

  // формат даты
  const date = formatDate(createdAt);

  // суммарная стоимость ингредиентов
  const totalPrice = useMemo(() => {
    return filteredIngredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
  }, [filteredIngredients]);
  // стиль статуса заказа
  const statusStyle = order.status === 'done' ? `text text_type_main-default ${styles.statusComplete}` : `text text_type_main-default`;

  // ограничение количества выводимых ингредиентов
  const MAX_INGREDIENTS = 5;
  const [showRemaining, setShowRemaining] = useState(false);
  let renderedIngredients = filteredIngredients.slice(0, MAX_INGREDIENTS);
  let remainingIngredient;

  if (filteredIngredients.length > MAX_INGREDIENTS) {
    const remainingIngredientsCount = filteredIngredients.length - MAX_INGREDIENTS;

    if (showRemaining) {
      renderedIngredients = filteredIngredients;
    } else {
      // Add a fake ingredient to represent the remaining count
      remainingIngredient = ({
        _id: 'remaining',
        name: `+${remainingIngredientsCount}`,
        count: remainingIngredientsCount,
        image: othersImage,
      });
    }
  }



  return (
    <Link
      key={orderNumber}
      to={`${path}/${orderNumber}`}
      className={styles.link}
      state={{ background: location }}
    >

      <div className={styles.orderContainer}>
        <div className={styles.orderHeader}>
          <span className="text text_type_digits-default">#{number}</span>
          <span className="text text_type_main-default text_color_inactive">
            {date}
          </span>
        </div>
        <h3 className="text text_type_main-medium">{name}</h3>
        {match ? (
          <span className={`${statusStyle} text text_type_main-default`}>
            {order.status === 'done' ? 'Выполнен' : 'Готовится'}
          </span>
        ) : null}
        <div className={styles.orderSummary}>
          <div className={styles.orderIngredients}>
            {renderedIngredients.map((ingredient, index) => {
              const zIndex = index + 1;

              return (
                <IngredientCircle
                  key={ingredient._id}
                  ingredient={ingredient}
                  style={{ zIndex: zIndex }}
                />
              )
            })}
            {filteredIngredients.length > MAX_INGREDIENTS && (

              <IngredientCircle
                key={remainingIngredient._id}
                ingredient={remainingIngredient}
                style={{ zIndex: MAX_INGREDIENTS + 1 }}
                count={remainingIngredient.count}

              />
            )}
          </div>
          <div className={styles.orderPrice}>
            <span className={`${styles.price} text text_type_digits-medium`}>{totalPrice}</span>
            <div className={styles.currencyIcon}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

Order.propTypes = {
  order: PropTypes.shape({
    ingredients: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    number: PropTypes.number,
    createdAt: PropTypes.string,
    _id: PropTypes.string,
  }),
};


export default Order;
