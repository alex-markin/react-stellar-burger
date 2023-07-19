// импорт библиотек
import { useEffect } from "react";

// импорт компонентов
import OrdersList from "../../components/orders-list/orders-list.jsx"; // импорт компонента списка заказов
import OrdersSummary from "../../components/orders-summary/orders-summary.jsx"; // импорт компонента суммарной информации о заказах

// импорт хуков и экшенов
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../services//store-selectors';
import { connect, disconnect } from '../../services/socket-connection/actions.js';

// импорт стилей
import styles from "./order-feed.module.css";

// адрес сервера для подключения к вебсокету
export const ALL_ORDERS_URL = "wss://norma.nomoreparties.space/orders";

function OrderFeed() {
  const accessToken = localStorage.getItem('accessToken').replace('Bearer ', '');

  const ordersData = useSelector(getOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    // Start the socket connection when the component mounts
    // socket.connect();
    // console.log(orders)
    dispatch(connect(`${ALL_ORDERS_URL}/all`));

    // Clean up the socket connection when the component unmounts
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
