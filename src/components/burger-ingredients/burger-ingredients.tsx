import {FC, useCallback, useMemo, useRef, useState} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientsItemList from './ingredients-list/ingredients-list';

import { EIngredientType, EThunkStatus} from '../../utils/types';
import { getLoadIngredientsState } from '../../services/selectors';
import { useStoreSelector } from '../../services/store';
import { calcScrollIndex, filterIngredientsByType, updateScrollByIndex  } from '../../utils/helpers';

import styles from './burger-ingredients.module.css'
import Loader from '../loader/loader';

const BurgerIngredients: FC = () =>{

    const {ingredients, status} = useStoreSelector(getLoadIngredientsState); // all
    const [activeTabIndex, setActiveTabIndex] = useState(0);  

    const scrollRef = useRef<HTMLDivElement>(null);    
    const bunsRef = useRef<HTMLDivElement>(null); 
    const saucesRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    // group-types:
    const {buns, mains, sauces} = useMemo(()=>{ 
        return {        
             buns:filterIngredientsByType(ingredients, EIngredientType.BUN)
             , mains:filterIngredientsByType(ingredients, EIngredientType.MAIN)
             , sauces:filterIngredientsByType(ingredients, EIngredientType.SOUCE)
         }
     },[ingredients]);   
    
    // set-tab-index:
    const setTabIndex = useCallback((index:number) => {   
        updateScrollByIndex(index, [bunsRef, saucesRef, mainRef]);
        setActiveTabIndex(index);
    },[setActiveTabIndex]);

    // handle-of-scroll:
    const calcTabIndex = useCallback(()=>{
        const index = calcScrollIndex(scrollRef, bunsRef, saucesRef, mainRef);           
        setActiveTabIndex(index);
    },[setActiveTabIndex]);  
      
    // component
    return (
        <div className={styles.main}>
            <div className={styles.header + " mb+10"}>
                <p>Соберите бургер</p>              
            </div>   
            <section className={styles.ingrTab + " mb-10"}>
                    <Tab value={'bun'} active={activeTabIndex == 0} onClick={() => setTabIndex(0)}>Булки</Tab>
                    <Tab value={'sauce'} active={activeTabIndex == 1} onClick={() => setTabIndex(1)}>Соусы</Tab>
                    <Tab value={'main'} active={activeTabIndex == 2} onClick={() => setTabIndex(2)}>Начинки</Tab>
            </section>
            { status === EThunkStatus.REQUEST 
            ?  <Loader message = "Загрузка..." />             
            : (<section className={styles.scroll} ref={scrollRef} onScroll={() => { calcTabIndex(); } }>
                    <IngredientsItemList listRef={bunsRef} index={0} type='bun' title='Булки' ingredients={buns} />
                    <IngredientsItemList listRef={saucesRef} index={1} type='sauce' title='Соусы' ingredients={sauces} />
                    <IngredientsItemList listRef={mainRef} index={2} type='main' title='Начинки' ingredients={mains} />
                </section>)      
            }      
        </div>)

}

export default BurgerIngredients;