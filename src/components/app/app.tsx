import {FC, useState} from 'react';

import AppHeader from '../app-header/app-header'
import BurgerIngrediets from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import styles from './app.module.css'
import appData from '../../utils/data'
import appOrder from '../../utils/order'
import { TIngredientItem } from '../../utils/types';
import IngredientDetails from '../ingredient-details/ingredient-details';

const App:FC = () => {
  
  // во втором спринте Добавить api для загрузки и проверку 
  // api.get или что-то такое
  const apiData = appData 
  const apiOrder = appOrder

  
  // order-modal
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const handleCloseOrderModal = () => { setOrderModalVisible(false) }
  const handleOpenOrderModal = () => { setOrderModalVisible(true) }

  // Q1: item-modal fix: наверное нужно использовать один useState({visible, item}) ?
  
  const [ingrModalVisible, setIngrModalVisible] = useState(false);
  const [ingrModalItem, setIngrModalItem] = useState<TIngredientItem|null>(null);
  const handleCloseIngrModal = () => { setIngrModalVisible(false) }
  const handleOpenIngrModal = (item:TIngredientItem) => { 
    setIngrModalVisible(true) 
    setIngrModalItem(item)
  }

  // Q2: Может перенести модальные окна 
  //    внутрь BurgerIngrediets и BurgerConstructor?

  return (
    <>
      <AppHeader />  
      <main className={styles.main}>
        <BurgerIngrediets ingredients = {apiData} onItemClick = {handleOpenIngrModal}/> 
        <BurgerConstructor ingredients = {apiData} order = {apiOrder} onOrderClick = {handleOpenOrderModal} />
      </main>
      {
        ingrModalVisible && ingrModalItem && 
        (
          <Modal onClick={handleCloseIngrModal} header = "Св-ва Ингредиента">            
            <IngredientDetails item={ingrModalItem}  />
          </Modal>
        )
      }
      {
        orderModalVisible &&
        (
          <Modal onClick={handleCloseOrderModal} header = "Заказ">            
            <OrderDetails orderNumber={123}  />
          </Modal>
        )
      }
    </>); 
}

export default App;