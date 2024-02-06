import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import IngredientItem from '../ingredient-item/ingredient-item';

import { StoreDispatch } from '../../../services/store';
import { setActiveIngredient } from '../../../services/active';
import { addIngredient } from '../../../services/constructor-burger';
import { getConstructorBurgerState } from '../../../services/selectors';

import { IIngredient} from '../../../utils/types';

import styles from './ingredient-active-item.module.css'

// Расширенная версия burger-ingredients-item с драгом, кликом

type IngredientActiveItemProps = {
  // count?:number; // counter
  item: IIngredient; // item
} 

const IngredientActiveItem: FC<IngredientActiveItemProps> = ({ item }) => {
    
  const dispatch:StoreDispatch = useDispatch();
  const {counter} = useSelector(getConstructorBurgerState);

  // берем количество из конструктора
  const count = counter[item._id] || 0 ;
       
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