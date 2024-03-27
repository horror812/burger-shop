import { FC, useEffect } from 'react';
import styles from './orders.module.css';
import { useStoreDispatch, useStoreSelector } from '../../services/store';
import { IOrder } from '../../utils/types';
import OrderList from '../../components/orders/orders-list';
import { getOrdersState } from '../../services/selectors';
import { wsOrdersActions } from '../../services/orders';
import { API_WSS_ALL_ORDERS } from '../../utils/api';

// status: done|pending
interface IOrderCounter {
  done: number[]; 
  pending: number[];
}

const Orders: FC = () => {
  const dispatch = useStoreDispatch();
  const ordersState = useStoreSelector(getOrdersState);
  const ordersNumbers: IOrderCounter = {done: [], pending: [] };

  const orderData = ordersState.data;
  const orderList = orderData?.orders || [];
  const ordersTotal = orderData?.total|| 0;
  const ordersTotalToday = orderData?.totalToday || 0;  

  orderList.forEach((item: IOrder) => {
    if (item.status === 'done' || item.status === 'pending') {
      ordersNumbers[item.status].push(item.number);
    }
  });
  
  useEffect(() => {
    if(!ordersState.isConnected) {
      dispatch(wsOrdersActions.connect({ url: API_WSS_ALL_ORDERS,withTokenRefresh: false}));
    }
  }, [dispatch, ordersState.isConnected]);
  
  return (
    <section className={styles.root}>
      <h1 className={`${styles.title} text_type_main-large mb-5`}>Лента заказов</h1>
      <div className={styles.mainContainer}>
        <OrderList orderList={orderList} showStatus={false}/>
        <div className={`${styles.info} ml-15`}>
          <div className={`${styles.statusContainer} mb-15`}>
            <div className={`${styles.status} mr-9`}>
              <h2 className={`text text_type_main-medium mb-6`}>Готовы:</h2>
              <ul className={styles.list}>
                {ordersNumbers && ordersNumbers.done.map(order => (
                  <li 
                    className={`text text_type_digits-default ${styles.done}`}
                    key={order}
                  >
                    {order}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.status}>
              <h2 className={`text text_type_main-medium mb-6`}>В работе:</h2>
              <ul className={styles.list}>
                {ordersNumbers && ordersNumbers.pending.map(order => (
                  <li 
                    className={`text text_type_digits-default ${styles.pending}`}
                    key={order}
                  >
                    {order}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className={`text text_type_main-medium ${styles.textShadow}`}>Выполнено за все время:</p>
          <p className={`text text_type_digits-large mb-15 ${styles.textShadow}`}>{ordersTotal}</p>
          <p className={`text text_type_main-medium ${styles.textShadow}`}>Выполнено за сегодня:</p>
          <p className={`text text_type_digits-large ${styles.textShadow}`}>{ordersTotalToday}</p>
        </div>
      </div>
    </section>
  )
}

export default Orders;