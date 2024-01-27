import {FC, useState, useEffect} from 'react';

import AppHeader from '../app-header/app-header'
import BurgerIngrediets from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

import styles from './app.module.css'

import appOrder from '../../utils/order'
import { TIngredientItem } from '../../utils/types';
import {getIngredients} from '../../utils/api'


const App:FC = () => {  
  
  // apiOrder временный заказ
  const apiOrder = appOrder;

  // apiData load ingredients
  const [apiData, setAPIData] = useState<TIngredientItem[]|null>(null);   

  useEffect(() => {    
    const fetchData = async() => {
      const {data} = await getIngredients()  
      setAPIData(data)
    }
    fetchData();     
  }, []);

  return (
    <>
      <AppHeader />  
      <main className={styles.main}>
        {apiData && <>          
            <BurgerIngrediets ingredients = {apiData}/> 
            <BurgerConstructor ingredients = {apiData} order = {apiOrder}/>            
        </>}
      </main>         
    </>); 
}

export default App;