import React from "react";
import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon

} from "@ya.praktikum/react-developer-burger-ui-components";
// import data from "../../utils/data.js";
import styles from "./burgerConstructorStyles.module.css";
import PropTypes from 'prop-types';
import iconPropTypes from '../appHeader/appHeader.js';

// Burger Ingredients component

function BurgerConstructor({data}) {

    return (
      <section
        className={`${styles.container} pt-25 pl-4 pr-4`}
      >
        <div className={`${styles.ingredients}`}>

          <ul className={`${styles.ingredientsTop}`}>
            {data.map((item) => {
              if (item.name === "Краторная булка N-200i")
                return (
                  <ConstructorElement
                    key={item._id}
                    type="top"
                    isLocked={true}
                    text={`${item.name} (верх)`}
                    price={item.price}
                    thumbnail={item.image}
                  />
                );
            })}

          </ul>


          <ul className={styles.ingredientsCenter}>
            {data.map((item) => {
              if (item.name !== "bun")
                return (
                  <li key={item._id} className={styles.listElement}>
                    <DragIcon type="TIconTypes" />
                    <ConstructorElement
                      isLocked={false}
                      type="bottom"
                      text={item.name}
                      price={item.price}
                      thumbnail={item.image}
                    />
                  </li>
                );
            })}
          </ul>


          <ul className={`${styles.ingredientsBottom}`}>
          {data.map((item) => {
              if (item.name === "Краторная булка N-200i")
                return (
                  <ConstructorElement
                    key={item._id}
                    type="bottom"
                    isLocked={true}
                    text={`${item.name} (низ)`}
                    price={item.price}
                    thumbnail={item.image}
                  />
                );
            })}
          </ul>
        </div>

        <div className={`${styles.totalPrice} mt-10`}>

          <div className={`${styles.totalPriceText}`}>
            <p className="text text_type_digits-medium">{610}</p>
            <CurrencyIcon type="TIconTypes" />
          </div>
          <Button type="primary" size="large" htmlType="submit">
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }// добавил проход по массиву для добавления ингредиентов, так как пока нет логики того, как это должно быть на промежуточном этапе


ConstructorElement.propTypes = {
  type: PropTypes.oneOf(['top', 'bottom']),
  isLocked: PropTypes.bool,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
  handleClose: PropTypes.func,
};


CurrencyIcon.propTypes = iconPropTypes;
DragIcon.propTypes = iconPropTypes;

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
  extraClass: PropTypes.string,
  htmlType: PropTypes.oneOf(['button', 'submit', 'reset']).isRequired
};





export default BurgerConstructor;
