import {FC, useMemo, useRef, useState} from 'react';

import styles from './burger-ingredients.module.css'

import BurgerIngredientsItemList from './burger-ingredients-list';
import { TIngredientItem } from '../../utils/types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

type BurgerIngredientsProps = { 
    ingredients: TIngredientItem[]; // data:TIngredientItem[]
}

const BurgerIngredients: FC<BurgerIngredientsProps> = (props) =>{

    const {ingredients} = props;

    const refScroll = useRef<HTMLDivElement>(null);
    const refBuns = useRef<HTMLDivElement>(null); // bunsRef
    const refSauces = useRef<HTMLDivElement>(null);
    const refMain = useRef<HTMLDivElement>(null);
  
    const [category, setCategory] = useState(0); 
    const gotoCategory = (id:number) => {    
        let element       
        switch(id){
            case 0: element = refBuns; break;
            case 1: element = refSauces; break;            
            case 2: element = refMain; break;            
        }         
        element && element.current && element.current.scrollIntoView({ behavior: 'smooth' });
        setCategory(id) 
    }
 
    const {buns, mains, sauces} = useMemo(()=>{   
        return {
            buns:ingredients.filter((item: TIngredientItem) => item.type === 'bun')
            , mains:ingredients.filter((item: TIngredientItem) => item.type === 'main')
            , sauces:ingredients.filter((item: TIngredientItem) => item.type === 'sauce')
        }
    },[ingredients]) 
    
    return (
           <div className={styles.main}>
               <div className={styles.header + " mb+10"}>
                   <p>Соберите бургер</p>
               </div>   
               <section className={styles.ingrTab + " mb-10"}>
                    <Tab value={'0'} active = {category == 0} onClick={()=>gotoCategory(0)}>Булки</Tab>
                    <Tab value={'1'} active = {category == 1} onClick={()=>gotoCategory(1)}>Соусы</Tab>
                    <Tab value={'2'} active = {category == 2} onClick={()=>gotoCategory(2)}>Начинки</Tab>
               </section>       
               <section className={styles.scroll} ref = {refScroll}>
                    <BurgerIngredientsItemList ref = {refBuns} index={0} type='bun' title='Булки' ingredients={buns} />
                    <BurgerIngredientsItemList ref = {refSauces} index={1} type='sauce' title='Соусы' ingredients={sauces} />
                    <BurgerIngredientsItemList ref = {refMain} index={2} type='main' title='Начинки' ingredients={mains} />
               </section>
           </div>
       )

}

export default BurgerIngredients;