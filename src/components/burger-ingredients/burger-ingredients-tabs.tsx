import {FC} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css'

type BurgerIngredientsTabsProps = { 
    currentCategory: number;
    setCategory: (index: number) => void;
}

const BurgerIngredientsTabs: FC<BurgerIngredientsTabsProps> = ({currentCategory, setCategory }) =>{
   return (
        <div className={styles.ingrTab + " mb-10"}>
            <Tab value={'0'} active={currentCategory === 0} onClick={() => setCategory(0)}>
            Булки
            </Tab>
            <Tab value={'1'} active={currentCategory === 1} onClick={() => setCategory(1)}>
            Соусы
            </Tab>
            <Tab value={'2'} active={currentCategory === 2} onClick={() => setCategory(2)}>
            Начинки
            </Tab>
        </div>);
}

export default BurgerIngredientsTabs;