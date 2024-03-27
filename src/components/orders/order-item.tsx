import { FC } from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-item.module.css';

import { IIngredient, IOrder } from '../../utils/types';
import { formatStatusValue } from '../../utils/helpers';
import { useStoreSelector } from '../../services/store';
import { getLoadIngredientsState } from '../../services/selectors';

interface IOrderItemProps {
  order: IOrder;
  showStatus: boolean;
}

const OrderItem: FC<IOrderItemProps> = ({ order, showStatus = false }) => {
  const {ingredients} = useStoreSelector(getLoadIngredientsState);
  const icons: string[] = [];

  let totalValue = 0;
  const VCOUNT = 6
  const showMore = order.ingredients.length > VCOUNT;
  const extraValue = order.ingredients.length - VCOUNT;

  order.ingredients.slice(0, VCOUNT).forEach(ingredientItem => {
    const ingredient = ingredients.find((component: IIngredient) =>
        component._id === ingredientItem);
    if (!ingredient) { return;  }
    totalValue += ingredient.price;
    icons.push(ingredient.image_mobile);
  });
  
  const [statusText, statusStyle] = formatStatusValue(order.status);

  return (
    <div className={`${styles.root} mb-4  p-6`}>
      <div className={`${styles.header} mb-6`}>
        <span className={`${styles.number} text text_type_main-default`}>#{order.number}</span>
        <span className={'text text_type_main-default text_color_inactive'}>
            {/*formatDate(order.createdAt)*/}
            <FormattedDate date={new Date(order.createdAt)}/>
        </span>
      </div>
      <p className={`${styles.name} text text_type_main-medium ${showStatus ? 'mb-2' : 'mb-6'}`}>{order.name}</p>
      { showStatus && 
      <p className={`${styles.status} text text_type_main-default mb-6`} 
      style={statusStyle}>{statusText}
      </p> }
      <div className={styles.container}>
        <div className={styles.icons}>
        {icons.map((src, index) => (
            <img
              className={`${styles.icon} ${index === 5 && showMore && styles.iconMore}`}
              src={src}
              key={index}
              style={{zIndex: 10 - index}}
              alt=""
            />
          ))}
          {showMore && 
            <div className={`text text_type_main-default ${styles.moreItems}`}>+{extraValue}</div>
          }
        </div>
        <div className={styles.total}>
          <p className={`${styles.totalValue} text text_type_digits-default mr-2`}>{totalValue}</p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  )
}

export default OrderItem;