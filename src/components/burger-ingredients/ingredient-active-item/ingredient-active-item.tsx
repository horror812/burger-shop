import { FC, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

import IngredientItem from '../ingredient-item/ingredient-item';

import { useStoreDispatch, useStoreSelector } from '../../../services/store';
import { getConstructorBurgerState } from '../../../services/selectors';

import { IIngredient} from '../../../utils/types';

import styles from './ingredient-active-item.module.css'
import { setActiveIngredient } from '../../../services/load-ingredients';

// Расширенная версия burger-ingredients-item с драгом, кликом

type IngredientActiveItemProps = {
  item: IIngredient; // item
} 

const IngredientActiveItem: FC<IngredientActiveItemProps> = ({ item }) => {
    
  const location = useLocation();
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
      <Link 
          to={'/ingredients/' + item._id}
          state={{ background: location }}
          className = {styles.itemContainer}
          style = { { opacity:isDragging ? 0.25 : 1 }}
          ref = {dragRef}
          draggable>
          <div onClick = {handleActiveItem}>
            <IngredientItem  item = {item} count = {count} />
          </div>         
      </Link>       
  );
}

export default IngredientActiveItem;