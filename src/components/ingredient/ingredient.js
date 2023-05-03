import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredientStyle.module.css';
import PropTypes from 'prop-types';


function Ingredient (props) {

  const [count, setCount] = React.useState(1);

  const onClick = () => {
    setCount(count + 1);
  }

    return (
      <div className={styles.container} onClick={onClick}>
        <Counter count={count} size="default" />
        <img className={styles.img} src={props.image} alt={props.name} />
        <div className={`${styles.price} mt-1 mb-1`}>
          <span className="text text_type_digits-default">{props.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{props.name}</p>
      </div>


    );

  }

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['default', 'small']),
  extraClass: PropTypes.string,
};


export default Ingredient;
