import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon

} from "@ya.praktikum/react-developer-burger-ui-components"; // импорт компонентов из библиотеки
import styles from "./burger-constructor-styles.module.css"; // импорт стилей
import PropTypes from 'prop-types'; // импорт проптайпсов
import iconPropTypes from '../appHeader/app-header.js'; // импорт проптайпсов для иконок
import { priceSlice } from "../../services/price-slice.js"; // импорт редьюсера для подсчёта цены
import { ingredientsSlice } from "../../services/ingredients-slice"; // импорт редьюсера для подсчёта цены
import { useSelector, useDispatch } from "react-redux"; // импорт хука редакса



// Burger Ingredients component

function BurgerConstructor({ handleOrderDetailsOpen }) {

  const dispatch = useDispatch(); // диспатч Redux

  // получение данных из хранилища Redux
  const { totalPrice } = useSelector((store) => store.price); // общая стоимость заказа
  const currentIngredients = useSelector((store) => store.ingredients); // выбранные ингредиенты для конструктора
  const { data } = useSelector((store) => store.data); // данные с сервера


  // обработчик удаления ингредиента
  const handleClose = (item) => {
    dispatch(ingredientsSlice.actions.removeIngredient(item));
    dispatch(priceSlice.actions.removeIngredient(item.price));
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
