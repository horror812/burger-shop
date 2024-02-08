import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postOrderIngredients } from '../utils/api';
import { EThunkStatus, IPostOrderData } from '../utils/types';

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
  postOrderIngredients
);

// SLICE:

const postOrderSlice = createSlice({
  name: 'postOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postOrderThunk.pending, (state) => {
        state.orderInfo = null; 
        state.status = EThunkStatus.REQUEST;
      })
      .addCase(postOrderThunk.fulfilled, (state, action) => {
        const res:IPostOrderData = action.payload; 
        state.orderInfo = (res.success && res.order && res.order.number) ? {number: res.order.number, name: res.name} : null;
        state.status = EThunkStatus.SUCCESS;
      })
      .addCase(postOrderThunk.rejected, (state) => {
        state.orderInfo = null;
        state.status = EThunkStatus.FAILED;
      });
    }
});

// ACTIONS: 
/* export const actions = {***} = postOrderSlice.actions; */

export default postOrderSlice;