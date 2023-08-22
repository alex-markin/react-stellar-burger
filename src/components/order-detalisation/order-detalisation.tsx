
// импорт стилей
import styles from './order-detalisation.module.css';

// импорт компонентов
import IngredientCircle from '../ingredient-circle/ingredient-circle';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"; // импорт компонентов из библиотеки Яндекс.Практикум

// импорт хуков и функций
import { useParams } from 'react-router-dom';
import { formatDate } from '../../utils/format-date';
import { getOrders, resetOrder } from '../../services/order-details-slice';
import { useSelector, useDispatch } from '../../hooks/redux-hooks';
import { getOrderDetails } from '../../services/store-selectors';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// импорт типов
import { Item } from '../../utils/types';

export default function OrderDetalisation() {

  const dispatch = useDispatch();
  const { orderId } = useParams();
  const location = useLocation();
  const background = location.state && location.state.background;

  // получение данных с сервера
  useEffect(() => {
    orderId && dispatch(getOrders(orderId));

    return () => {
      dispatch(resetOrder());
    }

  }, [orderId]);

  // получение данных из хранилища Redux
  const { order, loading } = useSelector(getOrderDetails);

  if (!order || loading) {
    return <LoadingSpinner loadingText={'Загрузка...'} />
  } else {

    const { ingredients, name, number, createdAt, status } = order;

    // получение базы ингредиентов из хранилища
    let ingredientsDatabase: Item[] | null;
    try {
      const storedIngredients = localStorage.getItem('ingredients');
      ingredientsDatabase = storedIngredients ? JSON.parse(storedIngredients) : null;
    } catch (e) {
      ingredientsDatabase = null;
    }

    // фильрация ингредиентов по id
    const filteredIngredients: Item[] | null = ingredientsDatabase ? ingredientsDatabase.filter((ingredient) => ingredients.includes(ingredient._id)) : [];
    
    // форматирование даты
    const date = formatDate(createdAt);

    // суммарная стоимость ингредиентов
    const totalPrice = filteredIngredients.reduce((acc: number, ingredient: Item) => acc + ingredient.price, 0);

    // статус заказа
    const statusStyle = status === 'done' ? `text text_type_main-default ${styles.statusComplete}` : `text text_type_main-default`;

    // стили для контейнера детализации заказа
    const orderDetalisationStyle = background ? `${styles.orderDetalisation} ${styles.orderDetalisation_modal}` : `${styles.orderDetalisation}`;

    return (
      <section className={orderDetalisationStyle}>
        <p className={`${styles.number} text text_type_main-medium mb-10`}>#{number}</p>
        <h2 className={`${styles.header} text text_type_main-medium mb-3`}>{name}</h2>
        <p className={`${statusStyle} text text_type_main-default mb-15`}> {status === 'done' ? 'Выполнен' : 'Готовится'}</p>
        <h3 className={`${styles.header} text text_type_main-medium mb-6`}>Состав:</h3>
        <ul className={`${styles.ingredientsList} mb-10`}>

          {filteredIngredients.map((ingredient: Item) => {
            return (
              <li className={`${styles.ingredient}`} key={ingredient._id}>
                <IngredientCircle ingredient={ingredient} />
                <span className={`${styles.ingredientName} text text_type_main-default`}>{ingredient.name}</span>
                <div className={styles.priceContainer}>
                  <span className={`${styles.ingredientPrice} text text_type_digits-default`}>{ingredient.count} x {ingredient.price}</span>
                  <div className={styles.iconWrapper}><CurrencyIcon type="primary" /></div>
                </div>
              </li>
            )
          })}

        </ul>

        <div className={`${styles.orderSummary}`}>
          <span className={`${styles.time} text text_type_main-default text_color_inactive`}>{date}</span>
          <div className={`${styles.timePrice} text text_type_digits-default`}>
            <span className={`${styles.totalPrice} text text_type_digits-default`}>{totalPrice}</span>
            <div className={styles.iconWrapper}><CurrencyIcon type="primary" /></div>
          </div>

        </div>
      </section>
    )
  }
}