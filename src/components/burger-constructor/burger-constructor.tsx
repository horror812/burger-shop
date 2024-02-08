import {FC, useCallback, useEffect, useMemo} from 'react';
import { useDrop } from 'react-dnd';

import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';
import SubmitButton from './submit-button/submit-button';
import ConstructorList from './constructor-list/constructor-list';

import { useStoreDispatch, useStoreSelector } from '../../services/store';
import { getActiveState, getConstructorBurgerState, getPostOrderState } from '../../services/selectors';
import { freeActiveOrderNumber, setActiveOrderNumber } from '../../services/active';
import { clearIngredients } from '../../services/constructor-burger';
import { postOrderThunk } from '../../services/post-order';
import { addIngredient } from '../../services/constructor-burger';
import { EThunkStatus, IIngredient } from '../../utils/types';

import styles from './burger-constructor.module.css'

const BurgerConstructor: FC = () => {

    const dispatch = useStoreDispatch();
    
    const {bun, main} = useStoreSelector(getConstructorBurgerState);
    const {orderInfo, status} = useStoreSelector(getPostOrderState);      
    const {activeOrderNumber} = useStoreSelector(getActiveState);

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
    
    // catch post-order event
    useEffect(() => {       
      if(status == EThunkStatus.SUCCESS) {
        dispatch(setActiveOrderNumber(orderInfo?.number || null));
        dispatch(clearIngredients()); 
      }
    }, [orderInfo, status, dispatch]);

    // drop 
    const [,dragRef] = useDrop({
      accept: 'drag-ingredient',
      drop(dragItem:{item:IIngredient}) {       
        dispatch(addIngredient(dragItem.item)); // to end, not sorted
      }
    });
    
    // component:
    return (<div className = {styles.main + " ml-5"} ref = {dragRef} > 
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