import { PayloadAction, UnknownAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { IIngredient } from '../utils/types';

export interface IConstructorBurgerState {
    bun:null|IIngredient;
    main:IIngredient[];
}

// INIT-STATE:

const initialState:IConstructorBurgerState = {
  bun: null,
  main: []  
};

// REDUCERS: 

const clearReducer = (state:IConstructorBurgerState)=>{
    state.bun = initialState.bun 
    state.main = initialState.main     
}

const removeReducer = (state:IConstructorBurgerState, action:PayloadAction<IIngredient|null|number>)=> {
    const uid_or_item = action.payload; // item or uid
    if(uid_or_item == null || uid_or_item == undefined) return; 
    // from bun 
    if(state.bun && (state.bun.uid == uid_or_item || state.bun == uid_or_item)){
        state.bun = null;
        return;
    }  
    // from ingredients
    const index = state.main.findIndex((item) => item.uid === uid_or_item || item == uid_or_item);
    if (index != -1) {state.main.splice(index, 1);} 
}

const addReducer = (state:IConstructorBurgerState, action:PayloadAction<IIngredient|null>)=> {
    const item = action.payload ? action.payload as IIngredient : null; // item 
    if(item == null || item == undefined) return; 
    if (item.type === 'bun') {state.bun = item;} 
    else {state.main.push(item);}
}

const onAdded = (ingredient:IIngredient)=> {
    const uid = nanoid();
    return { payload: { ...ingredient, uid } };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sortReducer = (_state:IConstructorBurgerState, _action:UnknownAction) => {
    /*const { hoverIndex, dragIndex } = action.payload;
    const dragItem = state.main[dragIndex];
    if (dragItem) {
      const prevItem = state.main.splice(hoverIndex, 1, dragItem);
      state.main.splice(dragIndex, 1, prevItem[0]);
    }*/
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

export const { addIngredient, removeIngredient, sortIngredients, clearIngredients } 
    = constructorBurgerSlice.actions;

export default constructorBurgerSlice;