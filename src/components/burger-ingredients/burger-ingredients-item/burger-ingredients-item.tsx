import { FC, useRef } from 'react';
import { TIngredientItem } from '../../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients-item.module.css'

type BurgerIngredientsItemProps = {
  item: TIngredientItem; // item
  count?:number // counter
} 

const BurgerIngredientsItem: FC<BurgerIngredientsItemProps> = ({ item , count}) => {
  const ref = useRef<HTMLDivElement | null>(null);
// draggable
  return (   
      <div key={item._id} className={styles.container + " mb-8"}   
      ref={ref}>
        {
          (count && count > 0) && (
            <span className={styles.count + " text_type_digits-default"}>{count}</span>
          ) 
        }  
        <img src={item.image} alt=""/>
        <span className={styles.price + " mt-2 mb-1 text_type_digits-default"}>
          {item.price}
          <CurrencyIcon type="primary" />
        </span>
        <p className={styles.name + " text_type_main-default"}>{item.name}</p>
      </div>
  );
}

export default BurgerIngredientsItem;