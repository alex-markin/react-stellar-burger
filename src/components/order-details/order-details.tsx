// импорт стилей и изображений
import styles from "./order-details.module.css";
import orderAcceptedImage from "../../images/order-accepted.svg";

// импорт хуков и функций
import { getCurrentOrder } from "../../services/store-selectors";
import { useSelector } from "../../hooks/redux-hooks";

// импорт компонентов
import LoadingSpinner from "../loading-spinner/loading-spinner";

export default function OrderDetails() {
  const { order, loading } = useSelector(getCurrentOrder);
  let orderNumber: number;

  return (
    <div className={`${styles.container} mt-30 mb-30`}>
    
      {loading || !order ? (
        <LoadingSpinner loadingText={'Оформляем Ваш заказ...'} />
      ) : (

        <>
          <h1 className={`${styles.title} text text_type_digits-large mb-8`}>{orderNumber = order.number}</h1>
          <p className={`${styles.text} text text_type_main-medium`}>идентификатор заказа</p>
          <img className={`${styles.image} mt-15 mb-15`} src={orderAcceptedImage} alt="Заказ подтверждён" />
          <p className={`${styles.text} text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
          <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
        </>
      )}
    </div>
  );
}

