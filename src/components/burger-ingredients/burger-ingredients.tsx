import {FC, useMemo, useRef} from 'react';

import styles from './burger-ingredients.module.css'
import BurgerIngredientsTabs from './burger-ingredients-tabs';
import BurgerIngredientsItemList from './burger-ingredients-list';
import { TIngredientItem } from '../../utils/types';

type BurgerIngredientsProps = { 
    ingredientes: TIngredientItem[]; // data:TIngredientItem[]
}

const BurgerIngredients: FC<BurgerIngredientsProps> = (props) =>{
    const ingredientes = props.ingredientes //useAppSelector((store) => store.ingredientsItems.items);
    const buns = useMemo(() => ingredientes.filter((item: TIngredientItem) => item.type === 'bun'), [ingredientes]);
    const mains = useMemo(() => ingredientes.filter((item: TIngredientItem) => item.type === 'main'), [ingredientes]);
    const sauces = useMemo(() => ingredientes.filter((item: TIngredientItem) => item.type === 'sauce'), [ingredientes]);
    const currentCategory = 0
    const setCategory = (i:number) => {
        console.log("setCategory", i)
    }
    const refs = useRef<HTMLParagraphElement[]>([]);
    return (
           <div className={styles.main + " mr-5"}>
               <div className={styles.header + " mt-10"}>
                   <p>Соберите бургер</p>
               </div>          
               <BurgerIngredientsTabs currentCategory={currentCategory} setCategory={setCategory} />
               <section className={styles.scroll} id = "tabsDiv" >
                    <BurgerIngredientsItemList index={0} refs={refs} type='bun' title='Булки' ingredients={buns} />
                    <BurgerIngredientsItemList index={1} refs={refs} type='sauce' title='Соусы' ingredients={sauces} />
                    <BurgerIngredientsItemList index={2} refs={refs} type='main' title='Начинки' ingredients={mains} />
               </section>
           </div>
       )

}

export default BurgerIngredients;