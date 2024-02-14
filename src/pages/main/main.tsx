import {FC} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

import styles from './main.module.css'

const MainPage:FC = () => {    
  return ( <>
      <main className={styles.main}>               
        <DndProvider backend={HTML5Backend}>  
          <BurgerIngredients /> 
          <BurgerConstructor />      
        </DndProvider>     
      </main>         
    </>); 
}

export default MainPage;