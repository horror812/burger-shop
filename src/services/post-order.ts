import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postOrderIngredients } from '../utils/api';
import { EThunkStatus, IPostOrderData, IngredientIds } from '../utils/types';

export interface IPostOrderState {
  orderInfo: null|{number?:number, name?:string};
  status:EThunkStatus; 
}

// INIT-STATE:

const initialState:IPostOrderState = {
  orderInfo:null,
  status:EThunkStatus.UNDEFINED
};

// THUNK:

export const postOrderThunk = createAsyncThunk(
  'postOrderThunk',
  async (orderIngredients:IngredientIds) => {
    const response = await postOrderIngredients(orderIngredients);
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
      .addCase(postOrderThunk.pending, (state:IPostOrderState) => {
        state.orderInfo = null; 
        state.status = EThunkStatus.REQUEST;
      })
      .addCase(postOrderThunk.fulfilled, (state:IPostOrderState, action) => {
        const res:IPostOrderData = action.payload; 
        state.orderInfo = (res.success && res.order && res.order.number) ? {number: res.order.number, name: res.name} : null;
        state.status = EThunkStatus.SUCCESS;
      })
      .addCase(postOrderThunk.rejected, (state:IPostOrderState) => {
        state.orderInfo = null;
        state.status = EThunkStatus.FAILED;
      });
    }
});

// ACTIONS: 
/* export const actions = {***} = postOrderSlice.actions; */

export default postOrderSlice;