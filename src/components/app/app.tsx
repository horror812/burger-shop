import {FC} from 'react';

import AppHeader from '../app-header/app-header'
import BurgerIngrediets from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

import styles from './app.module.css'
import appData from '../../utils/data'
import appOrder from '../../utils/order'

const App:FC = () => {
  
  const apiData = appData // api.get ??
  const apiOrder = appOrder

  return (
    <>
      <AppHeader />  
      <main className={styles.main}>
        <BurgerIngrediets ingredientes = {apiData} /> 
        <BurgerConstructor ingredientes = {apiData} order = {apiOrder}/>
      </main>
    </>); 
}

export default App;