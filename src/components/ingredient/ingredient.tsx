
// ипорт библиотек
import { useDrag } from 'react-dnd';
import { useLocation, Link } from 'react-router-dom';

// импорт компонентов
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// импорт стилей
import styles from './ingredient.module.css';

// импорт хуков
import { useSelector } from "../../hooks/redux-hooks";

// импорт функций useSelector
import { getCurrentIngredients } from "../../services/store-selectors";

// импорт типов
import { Item } from '../../utils/types'


type IngredientProps = {
  item: Item,
  onClick: () => void
}

export default function Ingredient({ item, onClick }: IngredientProps) {

  const ingredientId = item['_id'];
  const location = useLocation();

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
      to={`/ingredients/${ingredientId}`}
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