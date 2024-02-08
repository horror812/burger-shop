import { useRef, FC, useCallback } from 'react';
import { IIngredient } from '../../../utils/types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './constructor-item.module.css';
import { useStoreDispatch } from '../../../services/store';
import { removeIngredient, sortIngredients } from '../../../services/constructor-burger';
import { useDrag, useDrop } from 'react-dnd';

type ConstructorItemProps = {
  item: IIngredient;
  index: number; // arr index in main-constructor
}

const ConstructorItem: FC<ConstructorItemProps> = ({item, index}) => {

  const dispatch = useStoreDispatch(); 

  const ref = useRef<HTMLDivElement | null>(null);

  // remove-item from constructor on trash-icon
  const handleRemoveIngredient = useCallback((item: IIngredient) => {
    dispatch(removeIngredient(item.uid || item));
  },[dispatch]);   
 
  // drop 
  const [, drop] = useDrop({
      accept: 'sort',      
      hover(dragItem:{index:number}, monitor) {
          if (!ref.current) { return; } 
          const hoverIndex = index;
          const dragIndex = dragItem.index;
          if (dragIndex === hoverIndex) { return; }  
          const hoverBoundingRect = ref.current!.getBoundingClientRect();
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          const clientOffset = monitor.getClientOffset()!;
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {return; }
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {return; }
          dispatch(sortIngredients({dragIndex, hoverIndex}));
          dragItem.index = hoverIndex;
      }
  });

  // drag
  const [{ isDragging }, drag] = useDrag({
    type: 'sort',  
    item: { index },
    collect: monitor => ({isDragging: monitor.isDragging()})   
  });

  // apply 
  drag(drop(ref));

  return (<div className={styles.item + " mb-4"} 
      style = { { opacity:isDragging ? 0.5 : 1 }}
      ref = {ref}     
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
};

export default ConstructorItem;