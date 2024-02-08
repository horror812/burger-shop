import {FC, useEffect} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppHeader from '../app-header/app-header'
import BurgerIngrediets from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { loadIngredientsThunk } from '../../services/load-ingredients';
import { getLoadIngredientsState, getPostOrderState } from '../../services/selectors';
import { useStoreDispatch, useStoreSelector } from '../../services/store';
import { EThunkStatus } from '../../utils/types';

import styles from './app.module.css'

const App:FC = () => {  
  
  const dispatch = useStoreDispatch();

  const ingredientsState = useStoreSelector(getLoadIngredientsState);
  const orderState = useStoreSelector(getPostOrderState);  

  // load-ingredients
  useEffect(() => {    
    dispatch(loadIngredientsThunk());
  }, [dispatch]);
  
  // поменять на модальку с загрузкой  
  // загрузка-индикатор
  if(ingredientsState.status === EThunkStatus.UNDEFINED 
    || ingredientsState.status === EThunkStatus.REQUEST) 
    return <div> Загрузка... </div>  
  
  // ожидание-индикатор
  if(orderState.status === EThunkStatus.REQUEST) 
    return <div> Отправка... </div>    

  return (
    <>
      <AppHeader />  
      <main className={styles.main}>   
        <DndProvider backend={HTML5Backend}>  
          <BurgerIngrediets /> 
          <BurgerConstructor />      
        </DndProvider>     
      </main>         
    </>); 
}

export default App;