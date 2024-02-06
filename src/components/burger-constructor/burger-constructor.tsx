import {FC, useCallback, useEffect, useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';
import SubmitButton from './submit-button/submit-button';
import ConstructorList from './constructor-list/constructor-list';

import { StoreDispatch } from '../../services/store';
import { getActiveState, getConstructorBurgerState, getPostOrderState } from '../../services/selectors';
import { freeActiveOrderNumber, setActiveOrderNumber } from '../../services/active';
import { clearIngredients } from '../../services/constructor-burger';
import { postOrderThunk } from '../../services/post-order';

import { EThunkStatus } from '../../utils/types';

import styles from './burger-constructor.module.css'

const BurgerConstructor: FC = () => {

    const dispatch:StoreDispatch = useDispatch();
    
    const {bun, main} = useSelector(getConstructorBurgerState);
    const {orderInfo, status} = useSelector(getPostOrderState);      
    const {activeOrderNumber} = useSelector(getActiveState);

    // canSubmit / calc-total-sum:
    const totalPrice = useMemo(() => {      
      return main.reduce((acc, curr) => acc + curr.price, 0) + (bun ? bun.price * 2 : 0);      
    }, [main, bun]);        

    // close-modal-order:
    const handleCloseModal = useCallback(()=>{
      dispatch(freeActiveOrderNumber());
    }, [dispatch]);         

    // post-order: 
    const handleSubmit = useCallback(()=>{  
      if(!bun || main.length === 0) return; // можно не проверять
      const ids = [bun!._id, ...main.map((item) => item._id), bun!._id];
      dispatch(postOrderThunk(ids));           
    },[dispatch, bun, main]);    

    
    // ловим изменния после отправки
    useEffect(() => {       
      if(status == EThunkStatus.SUCCESS) {
        dispatch(setActiveOrderNumber(orderInfo?.number || null));
        dispatch(clearIngredients()); 
      }
    }, [orderInfo, status, dispatch]);

    
    // component:
    return (<div className = {styles.main + " ml-5"} > 

      <ConstructorList />

      {totalPrice > 0 && bun && main.length > 0 && 
          (<SubmitButton onClick={handleSubmit} totalPrice={totalPrice}/>)}       
      
      {activeOrderNumber &&
          (<Modal onClick={handleCloseModal}>            
            <OrderDetails number={activeOrderNumber} />
          </Modal>)}
    </div>)    
}

export default BurgerConstructor;