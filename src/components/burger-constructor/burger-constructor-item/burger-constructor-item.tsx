import { useRef, FC } from 'react';
import { TIngredientItem } from '../../../utils/types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor-item.module.css';

type BurgerConstructorItemProps = {
  item: TIngredientItem;
  index: number; // index in array? 
}

const BurgerConstructorItem: FC<BurgerConstructorItemProps> = ({item, index}) => {

  const deleteIngredient = (item: TIngredientItem) => {
    console.log("del-item", item._id, index)
  }; 

  const ref = useRef<HTMLDivElement | null>(null);
  const opacity = 1

  return (
    <div 
      className={styles.item + " mb-4"} 
      style={{ opacity }}
      ref={ref}
      draggable
    >
      <DragIcon type = "primary" />
      <ConstructorElement
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => deleteIngredient(item)}
      />
    </div>
  );
}

export default BurgerConstructorItem;