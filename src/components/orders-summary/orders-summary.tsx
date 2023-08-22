
import styles from './orders-summary.module.css';

// импорт хуков и функций
import { getOrders } from '../../services/store-selectors';
import { useSelector } from '../../hooks/redux-hooks';
import { webSocketStatus } from '../../utils/web-socket-status';


type OrderType = {
  number: number;
  status: string;
}

function OrdersSummary() {

  const ordersData = useSelector(getOrders);
  const { total, totalToday, orders, status } = ordersData;

  return (
    <section className={styles.ordersSummary}>
      <div className={styles.ordersContainer}>

        <div className={styles.orders}>
          <h3 className={`${styles.header} text text_type_main-medium`}>Готовы:</h3>
          <ul className={`${styles.ordersList} ${styles.ordersList_prepared}`}>
            {status === webSocketStatus.CONNECTING ? (
              <span className={`${styles.order} text text_type_main-default`}>Подключение...</span>
            ) : (

              !orders || (orders.filter((order: OrderType) => order.status === 'done').length === 0) ? (
                <span className={`${styles.order} text text_type_main-default`}>Пока нет заказов</span>
              ) : (
                orders.map((order: OrderType) => {
                  if (order.status === 'done') {
                    return (
                      <span className={`${styles.order} text text_type_digits-default`} key={order.number}>
                        {order.number}
                      </span>
                    );
                  }
                  return null;
                })
              )
            )}

          </ul>
        </div>

        <div className={styles.orders}>
          <h3 className={`${styles.header} text text_type_main-medium`}>В работе:</h3>
          <ul className={styles.ordersList}>
            {status === webSocketStatus.CONNECTING ? (
              <span className={`${styles.order} text text_type_main-default`}>Подключение...</span>
            ) : (

              !orders || (orders.filter((order: OrderType) => order.status === 'pending').length === 0) ? (
                <span className={`${styles.order}  text text_type_main-default`}>Пока нет заказов</span>
              ) : (
                orders.map((order: OrderType) => {
                  if (order.status === 'pending') {
                    return (
                      <span className={`${styles.order} text text_type_digits-default`} key={order.number}>
                        {order.number}
                      </span>
                    );
                  }
                  return null;
                })
              )
            )}

          </ul>
        </div>
      </div>

      <div className={styles.completedTotal}>
        <h2 className={`${styles.header} text text_type_main-medium`}>Выполнено за все время:</h2>
        <span className={`${styles.completedTotalValue} text text_type_digits-large`}>{total}</span>
      </div>

      <div className={styles.completedTotal}>
        <h2 className={`${styles.header} text text_type_main-medium`}>Выполнено за сегодня:</h2>
        <span className={`${styles.completedTotalValue} text text_type_digits-large`}>{totalToday}</span>
      </div>

    </section>
  )
}

export default OrdersSummary;
