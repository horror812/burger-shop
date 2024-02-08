import { createSlice } from '@reduxjs/toolkit';
import { INullOrIngredientAction, INullOrNumberAction as INullOrNumberAction, INumberAction, IIngredient } from '../utils/types';

export interface IActiveState {
    activeTabIndex:number; // current tab-state
    activeIngredient:null|IIngredient; // if exists then modal
    activeOrderNumber:null|number; // if exists then modal
} 

// INIT-STATE:

const initialState:IActiveState = {
    activeTabIndex: 0,
    activeIngredient: null, 
    activeOrderNumber:null
};

// SLICE:

const activeSlice = createSlice({
    name: 'active',
    initialState,
    reducers: {          
        // active-tab(bun|sauce|main)
        setActiveTabIndex:(state, action:INumberAction)=>{ state.activeTabIndex = action.payload; },

        // show modal-ingredient-details
        setActiveIngredient: (state, action:INullOrIngredientAction)=>{ state.activeIngredient = action.payload;},
        freeActiveIngredient: (state)=>{state.activeIngredient = null; },
        
        // show modal-order-details
        setActiveOrderNumber: (state, action:INullOrNumberAction)=>{ state.activeOrderNumber = action.payload;},
        freeActiveOrderNumber: (state)=>{state.activeOrderNumber = null; },
    }
});


// ACTIONS:

export const { 
    setActiveTabIndex, 
    setActiveOrderNumber, 
    freeActiveOrderNumber,
    setActiveIngredient, 
    freeActiveIngredient,
} = activeSlice.actions;

// export const activeReducer = activeSlice.reducer;

export default activeSlice;