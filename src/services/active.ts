import { PayloadAction, UnknownAction, createSlice } from '@reduxjs/toolkit';
import { IIngredient, IOrder } from '../utils/types';

export interface IActiveState {
    activeTabIndex:number; // не уверен что нужно ? 
    activeIngredient:null|IIngredient; // if exists then modal
    activeOrder:null|IOrder; // if exists then modal
}

// INIT-STATE:

const initialState:IActiveState = {
    activeTabIndex: 0,
    activeIngredient: null, 
    activeOrder:null
};

// REDUCERS: 

const setTabIndexReducer = (state:IActiveState, action:PayloadAction<number>)=>{
    state.activeTabIndex = action.payload ? action.payload as number : 0
}

const setOrderReducer = (state:IActiveState, action:UnknownAction)=>{
    state.activeOrder = action.payload ? action.payload as IOrder : null
}

const setIngredientReducer = (state:IActiveState, action:PayloadAction<IIngredient>)=>{
    state.activeIngredient = action.payload ? action.payload as IIngredient : null
}

const freeIngredientReducer = (state:IActiveState)=>{
    state.activeIngredient = null
}

const freeOrderReducer = (state:IActiveState)=>{
    state.activeOrder = null
}


// SLICE:

const activeSlice = createSlice({
  name: 'active',
  initialState,
  reducers: {          
    setActiveTabIndex: setTabIndexReducer,
    setActiveOrder: setOrderReducer,
    setActiveIngredient: setIngredientReducer,
    freeActiveOrder: freeOrderReducer,
    freeActiveIngredient: freeIngredientReducer,
  }
});


// ACTIONS:

export const { setActiveTabIndex, 
    setActiveOrder, freeActiveOrder,
    setActiveIngredient, freeActiveIngredient } 
    = activeSlice.actions;

export default activeSlice;