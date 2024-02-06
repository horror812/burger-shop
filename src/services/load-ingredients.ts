import { UnknownAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../utils/api';
import { IIngredient } from '../utils/types';

export interface ILoadIngredientsState {
  ingredients:IIngredient[];
  isLoading: boolean;
  isRequest: boolean;
  isFailed: boolean; 
}

export interface ILoadIngredientsAction extends UnknownAction {
  payload?: {success?: boolean, data?:IIngredient[]}
}

// INIT-STATE:

const initialState:ILoadIngredientsState = {
  ingredients: [], 
  isLoading: false, 
  isRequest: false,
  isFailed: false  
};

// REDUCERS:

const requestReducer = (state:ILoadIngredientsState) => {
  state.isRequest = true;
  state.isFailed = false;
  state.isLoading = true;
}

const successReducer = (state:ILoadIngredientsState, action:ILoadIngredientsAction) => {
  const payload = action.payload; 
  state.ingredients = (payload && payload.success && payload.data) ? payload.data : initialState.ingredients;
  state.isRequest = false;
  state.isLoading = false;
}

const failedReducer = (state:ILoadIngredientsState) => {
  state.isRequest = false;
  state.isFailed = true;
  state.isLoading = false;
}

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
      .addCase(loadIngredientsThunk.pending, requestReducer)
      .addCase(loadIngredientsThunk.fulfilled, successReducer)
      .addCase(loadIngredientsThunk.rejected, failedReducer);
    }
});

// ACTIONS: 
/* export const actions = {***} = loadIngredients.actions; */

export default loadIngredientsSlice;