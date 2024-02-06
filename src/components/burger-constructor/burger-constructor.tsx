import {FC, useCallback, useMemo} from 'react';
import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';
import { StoreDispatch } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveState, getConstructorBurgerState } from '../../services/selectors';
import { freeActiveOrder } from '../../services/active';
import SubmitButton from './submit-button/submit-button';
import ConstructorList from './constructor-list/constructor-list';

import styles from './burger-constructor.module.css'

const BurgerConstructor: FC = () => {

    const dispatch:StoreDispatch = useDispatch();

    const {activeOrder} = useSelector(getActiveState);
    const {bun, main} = useSelector(getConstructorBurgerState);
        
    // close-modal-order:
    const handleCloseModal = useCallback(()=>{
      dispatch(freeActiveOrder());
    }, [dispatch])
       
    // calc-total-sum:
    const totalPrice = useMemo(() => {
      return main.reduce((acc, curr) => acc + curr.price, 0) + (bun ? bun.price * 2 : 0);
    }, [main, bun]);      
   
    // component:
    return (<div className = {styles.main + " ml-5"} >          
      <ConstructorList />

      {totalPrice > 0 && bun && main.length > 0 && 
          (<SubmitButton onClick={()=>{}} totalPrice={totalPrice}/>)}       
      
      {activeOrder && activeOrder.number &&
          (<Modal onClick={handleCloseModal}>            
            <OrderDetails orderNumber={activeOrder.number} />
          </Modal>)}
    </div>)    
}

export default BurgerConstructor;