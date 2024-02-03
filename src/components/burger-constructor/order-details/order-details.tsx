import { FC } from 'react';
import styles from './order-details.module.css'
import doneIcon from '../../../images/done.svg';

type OrderDetailsProps = {
  orderNumber:number // или сторка? 
}

const OrderDetails:FC<OrderDetailsProps> = (props) => {

  const orderNumber = props.orderNumber;

  return (
    <section className={styles.orderDetails + " pt-30 pb-30"}>
      <span className={styles.orderNumber + " text text_type_digits-large mb-8"}>
        {orderNumber}
      </span>
      <span className='text text_type_main-medium'>
        Идентефикатор заказа
      </span>
      <img src={doneIcon} alt="done" className={styles.doneIcon + " mt-15 mb-15"} />
      <span className='text text_type_main-small mb-2'>
        Ваш заказ начали готовить
      </span>
      <span className='text text_type_main-small text_color_inactive'>
        Дождитесь готовности на орбитной станции
      </span>
    </section>
  );
};

export default OrderDetails;