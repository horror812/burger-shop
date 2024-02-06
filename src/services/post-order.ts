import { UnknownAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postOrder } from '../utils/api';
import { IOrder } from '../utils/types';

export interface IPostOrderState {
  order:IOrder|null;
  isLoading: boolean;
  isRequest: boolean;
  isFailed: boolean; 
}

// INIT-STATE:

const initialState:IPostOrderState = {
  order: null, 
  isLoading: false, 
  isRequest: false,
  isFailed: false  
};

// REDUCERS:

const requestReducer = (state:IPostOrderState) => {
  state.isRequest = true;
  state.isFailed = false;
  state.isLoading = true;
  state.order = null; 
}

const successReducer = (state:IPostOrderState, action:UnknownAction) => {
  state.order = action.payload ? action.payload as IOrder : initialState.order;  
  state.isRequest = false;
  state.isLoading = false;
}

const failedReducer = (state:IPostOrderState) => {
  state.isRequest = false;
  state.isFailed = true;
  state.isLoading = false;
  state.order = null;
}

// THUNK:

export const postOrderThunk = createAsyncThunk(
  'postOrderThunk',
  async (order:IOrder) => {
    const response = await postOrder(order);
    return response;
  }
);

// SLICE:

const postOrderSlice = createSlice({
  name: 'postOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postOrderThunk.pending, requestReducer)
      .addCase(postOrderThunk.fulfilled, successReducer)
      .addCase(postOrderThunk.rejected, failedReducer);
    }
});

// ACTIONS: 
/* export const actions = {***} = loadIngredients.actions; */

export default postOrderSlice;