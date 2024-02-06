import {FC, useCallback, useMemo, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientsItemList from './ingredients-list/ingredients-list';
import Modal from '../modal/modal';
import IngredientDetails from './ingredient-details/ingredient-details';

import { EIngredientType} from '../../utils/types';
import { getActiveState, getLoadIngredientsState } from '../../services/selectors';
import { StoreDispatch } from '../../services/store';
import { freeActiveIngredient, setActiveTabIndex } from '../../services/active';

import { calcScrollIndex, filterIngredientsByType, updateScrollByIndex  } from '../../utils/helpers';

import styles from './burger-ingredients.module.css'

const BurgerIngredients: FC = () =>{

    const dispatch:StoreDispatch = useDispatch();

    const {ingredients} = useSelector(getLoadIngredientsState); // all
    const {activeIngredient, activeTabIndex} = useSelector(getActiveState);
       
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
     },[ingredients])   
   
    // close-active-modal
    const handleCloseModal = useCallback(()=>{        
        dispatch(freeActiveIngredient());
    }, [dispatch]);
   
    // set-tab-index:
    const setTabIndex = useCallback((index:number) => {   
        updateScrollByIndex(index, [bunsRef, saucesRef, mainRef]);
        dispatch(setActiveTabIndex(index));
    },[dispatch]);

    // handle-of-scroll:
    const calcTabIndex = useCallback(()=>{
        const index = calcScrollIndex(scrollRef, bunsRef, saucesRef, mainRef);           
        dispatch(setActiveTabIndex(index));  
    },[dispatch]);  
      
    // component
    return (
        <div className={styles.main}>
            <div className={styles.header + " mb+10"}>
                <p>Соберите бургер</p>
            </div>   
            <section className={styles.ingrTab + " mb-10"}>
                <Tab value={'bun'} active = {activeTabIndex == 0} onClick={()=>setTabIndex(0)}>Булки</Tab>
                <Tab value={'sauce'} active = {activeTabIndex == 1} onClick={()=>setTabIndex(1)}>Соусы</Tab>
                <Tab value={'main'} active = {activeTabIndex == 2} onClick={()=>setTabIndex(2)}>Начинки</Tab>
            </section>       
            <section className={styles.scroll} ref = {scrollRef} onScroll = {()=>{calcTabIndex()}}>
                <IngredientsItemList listRef = {bunsRef} index={0} type='bun' title='Булки' ingredients={buns} />
                <IngredientsItemList listRef = {saucesRef} index={1} type='sauce' title='Соусы' ingredients={sauces} />
                <IngredientsItemList listRef = {mainRef} index={2} type='main' title='Начинки' ingredients={mains} />
            </section>
            {activeIngredient && (<Modal onClick={handleCloseModal} header = "Детали Ингредиента">            
                <IngredientDetails item={activeIngredient}  />
            </Modal>)}
        </div>)

}

export default BurgerIngredients;