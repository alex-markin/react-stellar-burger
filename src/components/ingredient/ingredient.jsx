
// ипорт библиотек
import React from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

// импорт компонентов
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// импорт стилей
import styles from './ingredient.module.css';

// импорт хуков
import { useDispatch, useSelector } from 'react-redux';



function Ingredient({item, onClick}) {

  // диспатч Redux
  const dispatch = useDispatch();

  // получение данных из хранилища Redux
  const { count } = useSelector((store) => store.ingredients);


   // перетаскивание ингредиентов
   const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: (item),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });


  return (
    <div className={styles.container} onClick={onClick} ref={dragRef}>
      {count[item._id] > 0 && <Counter count={count[item._id]} size="default" />}
      <img className={styles.img} src={item.image} alt={item.name} />
      <div className={`${styles.price} mt-1 mb-1`}>
        <span className="text text_type_digits-default">{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{item.name}</p>
    </div>
  );

}

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['default', 'small']),
  extraClass: PropTypes.string,
};


export default Ingredient;
