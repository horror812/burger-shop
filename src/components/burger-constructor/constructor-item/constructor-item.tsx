import { useRef, FC, useCallback } from 'react';
import { IIngredient } from '../../../utils/types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './constructor-item.module.css';
import { StoreDispatch } from '../../../services/store';
import { useDispatch } from 'react-redux';
import { removeIngredient } from '../../../services/constructor-burger';

type ConstructorItemProps = {
  item: IIngredient;
  index: number; // index of array not used
}

const ConstructorItem: FC<ConstructorItemProps> = ({item}) => {

  const dispatch:StoreDispatch = useDispatch();

  // remove-item from constructor
  const handleRemoveIngredient = useCallback((item: IIngredient) => {
    dispatch(removeIngredient(item.uid || item));
  },[dispatch]); 

  const ref = useRef<HTMLDivElement | null>(null);
  const opacity = 1

  return (<div className={styles.item + " mb-4"} 
      style={{ opacity }}
      ref={ref}
      draggable>
      <DragIcon type = "primary" />
      <ConstructorElement
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleRemoveIngredient(item)}
      />
    </div>
  );
}

export default ConstructorItem;