import OrdersList from "../orders-list/orders-list";
import styles from './orders-history.module.css';

function OrdersHistory() {
  return (
    <div className={styles.ordersHistory}>
      <OrdersList />
    </div>
  )
}

export default OrdersHistory;
