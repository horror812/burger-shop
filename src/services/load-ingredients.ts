import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../utils/api';
import { EThunkStatus, IIngredient, ILoadIngredientsResponse, ILoadIngredientsAction, INullOrIngredientAction } from '../utils/types';

export interface ILoadIngredientsState {
  ingredients:IIngredient[];
  status: EThunkStatus;
  activeIngredient:IIngredient|null;
}

// INIT-STATE:

const initialState:ILoadIngredientsState = {
  ingredients: [],
  status: EThunkStatus.UNDEFINED ,
  activeIngredient:null
};

// THUNK:

export const loadIngredientsThunk = createAsyncThunk(
  'loadIngredientsThunk',
  getIngredients
);

// SLICE:

const loadIngredientsSlice = createSlice({
  name: 'loadIngredients',
  initialState,
  reducers: {
    // show modal-ingredient-details
    setActiveIngredient: (state, action:INullOrIngredientAction)=>{ 
      state.activeIngredient = action.payload;
    },
    freeActiveIngredient: (state)=>{
      state.activeIngredient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredientsThunk.pending, (state) => {
        state.ingredients = initialState.ingredients;
        state.status = EThunkStatus.REQUEST;
      })
      .addCase(loadIngredientsThunk.fulfilled, (state, action:ILoadIngredientsAction) => {
        const res:ILoadIngredientsResponse = action.payload; 
        state.ingredients = (res && res.success && res.data) ? res.data : initialState.ingredients;
        state.status = EThunkStatus.SUCCESS;  
      })
      .addCase(loadIngredientsThunk.rejected, (state) => { 
        state.status = EThunkStatus.FAILED;
      });
    }
});

// ACTIONS: 

export const {      
  setActiveIngredient, 
  freeActiveIngredient,
} = loadIngredientsSlice.actions;


export default loadIngredientsSlice;