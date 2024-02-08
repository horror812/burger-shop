import { createSlice, nanoid } from '@reduxjs/toolkit';
import { EIngredientType, IIdOrIngredientAction, IIngredient, IIngredientAction, ISortAction } from '../utils/types';

interface ICounter {
  [idProps: string]: number; // ex: [item.id] = num
}

export interface IConstructorBurgerState {
    bun:null|IIngredient;
    main:IIngredient[];
    counter:ICounter; // quantity of main quantity[item.id] = num
    // counter - подсчитывает количество при добавление и удаление по item._id
}

// INIT-STATE:

const initialState:IConstructorBurgerState = {
  bun: null,
  main: [],
  counter: {}
};

// REDUCERS: 

const clearReducer = (state:IConstructorBurgerState)=>{
    state.bun = initialState.bun; 
    state.main = initialState.main;
    state.counter = {};   
}

const removeReducer = (state:IConstructorBurgerState, action:IIdOrIngredientAction)=> {
    const uid_or_item = action.payload; // item or uid
    if(uid_or_item == null || uid_or_item == undefined) return; 
    // from bun 
    if(state.bun && (state.bun.uid == uid_or_item || state.bun == uid_or_item)){
        // decrease quantity
        if (state.bun!._id){state.counter[state.bun!._id] = 0; }        
        state.bun = null;
        return;
    }  
    // from ingredients
    const index = state.main.findIndex((item) => item.uid === uid_or_item || item == uid_or_item);
    if (index != -1) {
      const main = state.main[index]
      state.main.splice(index, 1);
      // decrease quantity
      if (main && main!._id && typeof state.counter[main!._id] === 'number'){
        state.counter[main!._id]--;
      } 
    } 
}

const addReducer = (state:IConstructorBurgerState, action:IIngredientAction)=> {
    const item = action.payload;
    // buns
    if (item.type === EIngredientType.BUN) {
      if(state.bun && state.bun._id){ state.counter[state.bun!._id] = 0;}
      state.bun = item;
      if(state.bun && state.bun._id){ state.counter[state.bun!._id] = 2;}
      return;
    }    
    // mains
    state.main.push(item);
    // increase quantity
    if (item && item!._id){
      if(typeof state.counter[item!._id] !== 'number') {state.counter[item!._id] = 1; }
      else {state.counter[item!._id]++; }        
    }     
}

const onAdded = (ingredient:IIngredient):IIngredientAction => {
  return { payload: { ...ingredient, uid: nanoid() }, type:"constructorBurger/addIngredient" };
}

// {hoverIndex, dragIndex}
const sortReducer = (state:IConstructorBurgerState, action:ISortAction) => {
    const { hoverIndex, dragIndex } = action.payload;
    const dragItem = state.main[dragIndex];
    if (dragItem) {
      const prevItem = state.main.splice(hoverIndex, 1, dragItem);
      state.main.splice(dragIndex, 1, prevItem[0]);
    }
}

// SLICE:

const constructorBurgerSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {    
    addIngredient: {reducer:addReducer, prepare:onAdded},    
    removeIngredient: removeReducer,
    clearIngredients: clearReducer,
    sortIngredients: sortReducer    
  }
});


// ACTIONS:

export const { 
  addIngredient, 
  removeIngredient, 
  sortIngredients, 
  clearIngredients 
} = constructorBurgerSlice.actions;

export default constructorBurgerSlice;