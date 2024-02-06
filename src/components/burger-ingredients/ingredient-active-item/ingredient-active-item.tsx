import { FC, useCallback } from 'react';
import { IIngredient} from '../../../utils/types';
import IngredientItem from '../ingredient-item/ingredient-item';

import styles from './ingredient-active-item.module.css'
import { useDispatch } from 'react-redux';
import { StoreDispatch } from '../../../services/store';
import { setActiveIngredient } from '../../../services/active';
import { addIngredient } from '../../../services/constructor-burger';

// Расширенная версия burger-ingredients-item с драгом, кнопкой и кликом

type IngredientActiveItemProps = {
  count?:number; // counter
  item: IIngredient; // item
} 

const IngredientActiveItem: FC<IngredientActiveItemProps> = ({ item , count}) => {
    
  const dispatch:StoreDispatch = useDispatch();
   
  const handleActiveItem = useCallback(()=>{
    dispatch(addIngredient(item)); // tmp-for-test without drag
    dispatch(setActiveIngredient(item));
  },[dispatch, item]);

  return ( 
      <div onClick = {handleActiveItem} 
          draggable /*key={item._id}*/ 
          className = {styles.itemContainer}>
            <IngredientItem item = {item} count = {count} />
      </div>         
  );
}

export default IngredientActiveItem;