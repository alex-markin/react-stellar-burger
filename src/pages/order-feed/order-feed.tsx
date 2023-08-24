// импорт библиотек
import { useEffect } from "react";

// импорт компонентов
import OrdersList from "../../components/orders-list/orders-list"; // импорт компонента списка заказов
import OrdersSummary from "../../components/orders-summary/orders-summary"; // импорт компонента суммарной информации о заказах

// импорт хуков и экшенов
import { useDispatch } from '../../hooks/redux-hooks';
import { connect, disconnect } from '../../services/socket-connection/actions';

// импорт стилей
import styles from "./order-feed.module.css";

// адрес сервера для подключения к вебсокету
export const ALL_ORDERS_URL = "wss://norma.nomoreparties.space/orders";

function OrderFeed() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connect(`${ALL_ORDERS_URL}/all`));

    return () => {
      dispatch(disconnect());
    };

  }, [dispatch]);

  return (
    <>
      <main className={styles.contentContainer}>
        <h1 className={`${styles.header} text text_type_main-large`}>Лента заказов</h1>
        <div className={styles.sectionsContainer}>
          <OrdersList />
          <OrdersSummary />
        </div>
      </main>
    </>
  );
}

export default OrderFeed;
