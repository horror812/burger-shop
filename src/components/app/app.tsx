import {FC, useState, useEffect} from 'react';

import AppHeader from '../app-header/app-header'
import BurgerIngrediets from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import {TIngredientItem} from '../../utils/types';

import styles from './app.module.css'

import {getIngredients} from '../../utils/api'
import appOrder from '../../utils/order'

const App:FC = () => {  
  
  // apiOrder временный заказ
  const apiOrder = appOrder;

  // apiData load ingredients
  const [apiData, setAPIData] = useState<TIngredientItem[]|null>(null);  
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);   

  useEffect(() => {    
    const fetchData = async() => {
       await getIngredients()
        .then((res)=>{setAPIData(res.data)})
        .catch(()=>{setIsError(true) })
        .finally(()=>{setIsLoading(false)})      
    }
    fetchData();     
  }, []);

  //{isError && "Error Message or Component"  }

  return (
    <>
      <AppHeader />  
      <main className={styles.main}>       
        {apiData && !isError && !isLoading && <>          
            <BurgerIngrediets ingredients = {apiData}/> 
            <BurgerConstructor ingredients = {apiData} order = {apiOrder}/>            
        </>}
      </main>         
    </>); 
}

export default App;