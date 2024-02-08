import { FC, useCallback } from 'react';

import IngredientItem from '../ingredient-item/ingredient-item';

import { useStoreDispatch, useStoreSelector } from '../../../services/store';
import { setActiveIngredient } from '../../../services/active';
import { getConstructorBurgerState } from '../../../services/selectors';

import { IIngredient} from '../../../utils/types';

import styles from './ingredient-active-item.module.css'
import { useDrag } from 'react-dnd';

// Расширенная версия burger-ingredients-item с драгом, кликом

type IngredientActiveItemProps = {
  item: IIngredient; // item
} 

const IngredientActiveItem: FC<IngredientActiveItemProps> = ({ item }) => {
    
  const dispatch = useStoreDispatch();
  const {counter} = useStoreSelector(getConstructorBurgerState);

  // quatinity from costructor
  const count = counter[item._id] || 0;
  
  // set-active-item
  const handleActiveItem = useCallback(()=>{    
    dispatch(setActiveIngredient(item));
  },[dispatch, item]);

   // drag
   const [{ isDragging }, dragRef] = useDrag({
    type: 'drag-ingredient',  
    item: {item},
    collect: monitor => ({isDragging: monitor.isDragging()})   
  });

  // component 
  return ( 
      <div className = {styles.itemContainer}
          style = { { opacity:isDragging ? 0.25 : 1 }}
          ref = {dragRef}
          draggable 
          /*key={item._id}*/           
          onClick = {handleActiveItem}>
          <IngredientItem item = {item} count = {count} />
      </div>         
  );
}

export default IngredientActiveItem;