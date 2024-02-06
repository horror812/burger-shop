import { FC } from 'react';
import { IIngredient} from '../../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient-item.module.css'

// было: BurgerIngredientsItem c Burger слишком длинно (  

type IngredientItemProps = {
  count?:number; // counter
  item: IIngredient; // item
} 

const IngredientItem: FC<IngredientItemProps> = ({ item , count}) => {
  
  return ( 
      <div className = {styles.item + " mb-8"}>
        {
          count !== undefined && count > 0 && 
          (<span className={styles.count + " text_type_digits-default"}>{count}</span>) 
        }  
        <img src={item.image} alt={item.name}/>
        <span className={styles.price + " mt-2 mb-1 text_type_digits-default"}>
        {item.price}
        <CurrencyIcon type="primary" />
        </span>
        <p className={styles.name + " text_type_main-default"}>{item.name}</p> 
      </div>         
  );
}

export default IngredientItem;