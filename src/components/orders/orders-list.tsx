import { FC, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './orders-list.module.css';

import { useStoreDispatch, useStoreSelector } from '../../services/store';
import { loadIngredientsThunk } from '../../services/load-ingredients';
import { getLoadIngredientsState } from '../../services/selectors';
import Loader from '../loader/loader';
import { IOrder } from '../../utils/types';
import OrderItem from './order-item';

interface IOrderListProps {
  orderList: IOrder[];
  showStatus: boolean;
}

const OrderList: FC<IOrderListProps> = ({ orderList, showStatus }) => {

    const location = useLocation();
    const dispatch = useStoreDispatch();   
    const {ingredients} = useStoreSelector(getLoadIngredientsState);

    useEffect(() => {
        if(ingredients.length === 0 ) {
            dispatch(loadIngredientsThunk());
        }
    }, [dispatch, ingredients.length]);

    if (ingredients.length === 0) 
        return  <Loader message = "Жду итемы..." />

  

    return (<div className={styles.list}>
          { orderList &&
            orderList.map(item => (
              <div key={item._id}>             
                <NavLink reloadDocument 
                  to = {location.pathname + '/' + item._id} 
                  state={{ background: location }}>                 
                    <OrderItem order={item} key={item._id} showStatus={showStatus}/>                              
                </NavLink>
              </div>
            ))
          }
     </div>)
}

export default OrderList;