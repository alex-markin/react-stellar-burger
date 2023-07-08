
// ипорт библиотек
import React from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';

// импорт компонентов
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// импорт стилей
import styles from './ingredient.module.css';

// импорт хуков
import { useSelector } from 'react-redux';

// импорт функций useSelector
import { getCurrentIngredients } from "../../services/store-selectors.js";


function Ingredient({ item, onClick }) {

  // const location = useLocation();
  const ingredientId = item['_id'];
  const location = useLocation();

  // диспатч Redux

  // получение данных из хранилища Redux
  const { count } = useSelector(getCurrentIngredients);

  // перетаскивание ингредиентов
  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: ({ item, source: "ingredients" }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });


  return (
    <Link
      key={ingredientId}
      // Тут мы формируем динамический путь для нашего ингредиента
      to={`/ingredients/${ingredientId}`}
      // а также сохраняем в свойство background роут,
      // на котором была открыта наша модалка
      className={styles.link}
      state={{ background: location }}

    >
      <div className={styles.container} onClick={onClick} ref={dragRef}>
        {count[item._id] > 0 && <Counter count={count[item._id]} size="default" />}
        <img className={styles.img} src={item.image} alt={item.name} />
        <div className={`${styles.price} mt-1 mb-1`}>
          <span className="text text_type_digits-default">{item.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{item.name}</p>
      </div>
    </Link>
  );

}

Ingredient.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};


export default Ingredient;
