import { FC, useState } from 'react';
import { TIngredientItem} from '../../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../../modal/modal';

import styles from './burger-ingredients-item.module.css'

type BurgerIngredientsItemProps = {
  count?:number; // counter
  item: TIngredientItem; // item
} 

const BurgerIngredientsItem: FC<BurgerIngredientsItemProps> = ({ item , count}) => {
  
  // const ref = useRef<HTMLDivElement | null>(null);
  // count == item._v ??
  // потом поменяю  нв Link кoгда дойду до Реакт-Роутер
  
  const [modalVisible, setModalVisible] = useState(false);
  const handleCloseModal = () => { setModalVisible(false) }
  const handleOpenModal = () => { setModalVisible(true)}

  return ( 
      <div onClick = { () => { handleOpenModal()}           
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
        {modalVisible &&  (
          <Modal onClick={handleCloseModal} header = "Детали Ингредиента">            
            <IngredientDetails item={item}  />
          </Modal>
        )}    
      </div>         
  );
}

export default BurgerIngredientsItem;