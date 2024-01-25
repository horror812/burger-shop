import { FC } from 'react';
import { TIngredientItem } from '../../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients-item.module.css'

type BurgerIngredientsItemProps = {
  item: TIngredientItem; // item
  count?:number // counter
  onItemClick?: (item: TIngredientItem)=>void; 
} 

const BurgerIngredientsItem: FC<BurgerIngredientsItemProps> = ({ item , count, onItemClick}) => {
  
  //const ref = useRef<HTMLDivElement | null>(null);

  // потом поменяю  нв Link кoгда дойду до Реакт-Роутер

  return (   
        <button onClick = { 
            () => {
              console.log("click-item", item.name);
              onItemClick && onItemClick!(item);             
            }           
          } 
          draggable /*key={item._id}*/ 
          className={styles.container + " mb-8"} 
          >
        {
            (count && count > 0) && (
              <span className={styles.count + " text_type_digits-default"}>{count}</span>
            ) 
          }  
          <img src={item.image} alt={item.name}/>
          <span className={styles.price + " mt-2 mb-1 text_type_digits-default"}>
            {item.price}
            <CurrencyIcon type="primary" />
          </span>
          <p className={styles.name + " text_type_main-default"}>{item.name}</p>       
        </button>  
  );
}

export default BurgerIngredientsItem;