import {FC, useMemo} from 'react';

import styles from './burger-ingredients.module.css'
import BurgerIngredientsTabs from './burger-ingredients-tabs';
import BurgerIngredientsItemList from './burger-ingredients-list';
import { TIngredientItem } from '../../utils/types';

type BurgerIngredientsProps = { 
    ingredients: TIngredientItem[]; // data:TIngredientItem[]
    onItemClick: (item:TIngredientItem)=>void
}

const BurgerIngredients: FC<BurgerIngredientsProps> = (props) =>{
    const ingredients = props.ingredients //useAppSelector((store) => store.ingredientsItems.items);
    const onItemClick = props.onItemClick

    // fixed: to one memo
    const {buns, mains, sauces} = useMemo(()=>{
        return {
            buns:ingredients.filter((item: TIngredientItem) => item.type === 'bun')
            , mains:ingredients.filter((item: TIngredientItem) => item.type === 'main')
            , sauces:ingredients.filter((item: TIngredientItem) => item.type === 'sauce')
        }
    },[ingredients])

    const currentCategory = 0
    const setCategory = (i:number) => {
        console.log("setCategory", i)
    }

    return (
           <div className={styles.main + " mr-5"}>
               <div className={styles.header + " mt-10"}>
                   <p>Соберите бургер</p>
               </div>          
               <BurgerIngredientsTabs currentCategory={currentCategory} setCategory={setCategory} />
               <section className={styles.scroll} id = "tabsDiv" >
                    <BurgerIngredientsItemList index={0} type='bun' title='Булки' ingredients={buns} onItemClick = {onItemClick}/>
                    <BurgerIngredientsItemList index={1} type='sauce' title='Соусы' ingredients={sauces} onItemClick = {onItemClick}/>
                    <BurgerIngredientsItemList index={2} type='main' title='Начинки' ingredients={mains} onItemClick = {onItemClick} />
               </section>
           </div>
       )

}

export default BurgerIngredients;