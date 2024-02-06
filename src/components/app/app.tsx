import {FC, useEffect} from 'react';

import AppHeader from '../app-header/app-header'
import BurgerIngrediets from '../burger-ingredients/burger-ingredients'
// import BurgerConstructor from '../burger-constructor/burger-constructor'

import styles from './app.module.css'

import { useDispatch, useSelector } from 'react-redux';
import { loadIngredientsThunk } from '../../services/load-ingredients';
import { getLoadIngredientsState } from '../../services/selectors';
import { StoreDispatch } from '../../services/store';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const App:FC = () => {  

  const { isLoading } = useSelector(getLoadIngredientsState);
  const dispatch:StoreDispatch = useDispatch();

  useEffect(() => {    
    dispatch(loadIngredientsThunk());
  }, [dispatch]);
  
  if(isLoading) return <div> Загрузка... </div>  

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