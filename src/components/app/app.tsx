import {FC, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppHeader from '../app-header/app-header'
import BurgerIngrediets from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { loadIngredientsThunk } from '../../services/load-ingredients';
import { getLoadIngredientsState, getPostOrderState } from '../../services/selectors';
import { StoreDispatch } from '../../services/store';
import { EThunkStatus } from '../../utils/types';

import styles from './app.module.css'

const App:FC = () => {  
  
  const dispatch:StoreDispatch = useDispatch();

  const ingredientsState = useSelector(getLoadIngredientsState);
  const orderState = useSelector(getPostOrderState);  

  // грузим игредиенты
  useEffect(() => {    
    dispatch(loadIngredientsThunk());
  }, [dispatch]);
  
  // поменять на модальку с загрузкой  
  // загрузка-индикатор
  if(ingredientsState.status === EThunkStatus.UNDEFINED 
    || ingredientsState.status === EThunkStatus.REQUEST) return <div> Загрузка... </div>  
  
  // ожидание-индикатор
  if(orderState.status === EThunkStatus.REQUEST) return <div> Отправка... </div>    

  return (
    <>
      <AppHeader />  
      <main className={styles.main}>       
        <BurgerIngrediets /> 
        <BurgerConstructor />         
      </main>         
    </>); 
}

export default App;