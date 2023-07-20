// импорт библиотек
import { useEffect } from 'react';

// импорт компонентов
import Order from '../order/order';

// импорт стилей
import styles from './orders-list.module.css';

// импорт хуков и функций
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../services/store-selectors';
import { useMatch, useNavigate } from 'react-router-dom';
import { connect, disconnect } from '../../services/socket-connection/actions.js';
import { webSocketStatus } from '../../utils/web-socket-status.js';

// импорт url адресов
import { ALL_ORDERS_URL } from '../../pages/order-feed/order-feed';

function OrdersList() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const match = useMatch({
    path: 'profile/orders',
    end: true,
    caseSensitive: true,
  })

  useEffect(() => {

    if(match) {
      const accessToken = localStorage.getItem('accessToken').replace('Bearer ', '');
      if (accessToken) {
        dispatch(connect(`${ALL_ORDERS_URL}?token=${accessToken}`));
      } else {
        navigate('/login');
      }
    }
    return () => {
      dispatch(disconnect());
    }
  }, [dispatch]);

  const ordersData = useSelector(getOrders);
  const { orders, status } = ordersData;

  // фильтруем по актуальности личные заказы
  const reverseOrders = orders && orders.slice().reverse();

  return (
    <section className={styles.ordersList}>
      {status === webSocketStatus.CONNECTING ? (
        <span className={`${styles.order} text text_type_main-default`}>Подключение...</span>
      ) : (
        orders && match ?
          reverseOrders.map((order) => {
          return (
            <Order order={order} key={order._id} />
          )
        })
        : orders && orders.map((order) => {
          return (
            <Order order={order} key={order._id} />
          )
        })
      )}
    </section>
  )
}

export default OrdersList;