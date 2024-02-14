import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postOrderIngredients } from '../utils/api';
import { EThunkStatus, IPostOrderResponse } from '../utils/types';

export interface IPostOrderState {
  status:EThunkStatus; 
  orderInfo: null|{number?:number, name?:string};  
  activeOrderNumber:null|number; // update on success post
}

// INIT-STATE:

const initialState:IPostOrderState = {
  status:EThunkStatus.UNDEFINED,
  orderInfo:null,  
  activeOrderNumber:null
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
  reducers: {           
    // show modal-order-details
    // setActiveOrderNumber: (state, action:INullOrNumberAction)=>{ state.activeOrderNumber = action.payload;},
    freeActiveOrderNumber: (state)=>{state.activeOrderNumber = null;},
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrderThunk.pending, (state) => {
        state.status = EThunkStatus.REQUEST;
        state.orderInfo = null;  
        state.activeOrderNumber = null;       
      })
      .addCase(postOrderThunk.fulfilled, (state, action) => {
        state.status = EThunkStatus.SUCCESS;
        const res:IPostOrderResponse = action.payload; 
        state.orderInfo = (res.success && res.order && res.order.number) ? {number: res.order.number, name: res.name} : null;
        state.activeOrderNumber = state.orderInfo?.number || null;
      })
      .addCase(postOrderThunk.rejected, (state) => {        
        state.status = EThunkStatus.FAILED;
        state.orderInfo = null;
        state.activeOrderNumber = null;
      });
    }
});

// ACTIONS: 

export const {freeActiveOrderNumber} = postOrderSlice.actions; 

export default postOrderSlice;