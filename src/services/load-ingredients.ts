import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../utils/api';
import { EThunkStatus, IIngredient, ILoadIngredientsData, ILoadIngredientsAction } from '../utils/types';

export interface ILoadIngredientsState {
  ingredients:IIngredient[];
  status: EThunkStatus;
}

// INIT-STATE:

const initialState:ILoadIngredientsState = {
  ingredients: [],
  status: EThunkStatus.UNDEFINED 
};

// THUNK:

export const loadIngredientsThunk = createAsyncThunk(
  'loadIngredientsThunk',
  async () => {
    const response = await getIngredients();
    return response;
  }
);

// SLICE:

const loadIngredientsSlice = createSlice({
  name: 'loadIngredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredientsThunk.pending, (state:ILoadIngredientsState) => {
        state.ingredients = initialState.ingredients;
        state.status = EThunkStatus.REQUEST;
      })
      .addCase(loadIngredientsThunk.fulfilled, (state:ILoadIngredientsState, action:ILoadIngredientsAction) => {
        const res:ILoadIngredientsData = action.payload; 
        state.ingredients = (res && res.success && res.data) ? res.data : initialState.ingredients;
        state.status = EThunkStatus.SUCCESS;  
      })
      .addCase(loadIngredientsThunk.rejected, (state:ILoadIngredientsState) => { 
        state.status = EThunkStatus.FAILED;
      });
    }
});

// ACTIONS: 
/* export const actions = {***} = loadIngredients.actions; */

export default loadIngredientsSlice;