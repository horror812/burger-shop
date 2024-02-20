import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EThunkStatus, IUserAuthResponse, IUserData, IUserResponse } from '../utils/types';
import { removeLocalStorageItem, setLocalStorageItem } from '../utils/storage';
import {  getUserRequest, loginRequest, logoutRequest, registerRequest, updateUserRequest } from '../utils/api';

export enum EUserRequest{
     UNDEFINED = 'undefined',
     LOGIN = 'login',
     LOGOUT = 'logout',
     REGISTER = 'register',
     LOAD = 'load', // get-user
     UPDATE = 'update', // update-user
}

export interface IUserState {
     request:EUserRequest; // current thunk request
     user: IUserData;
     status: EThunkStatus;
     isAuth: boolean; // logged      
} 

// INIT-STATE:

const initialState:IUserState = {
    user: {email: '',  name: ''},    
    status: EThunkStatus.UNDEFINED,
    request: EUserRequest.UNDEFINED,
    isAuth: false,    
};

// clone of user to new-obj
function objUser(user?: IUserData) {return user ? {email:user.email, name:user.name} : initialState.user;}

// THUNKS: 

export const registerThunk = createAsyncThunk('registerThunk', registerRequest);
export const loginThunk = createAsyncThunk('loginThunk', loginRequest);
export const logoutThunk = createAsyncThunk('logoutThunk', logoutRequest);
export const loadUserThunk = createAsyncThunk('loadUserThunk', getUserRequest);
export const updateUserThunk = createAsyncThunk('updateUserThunk', updateUserRequest);
// export const resetPasswordThunk = createAsyncThunk('resetPasswordThunk', resetPasswordRequest);
// export const forgotPasswordThunk = createAsyncThunk('forgotPasswordThunk', forgotPasswordRequest);

// SLICE:

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers:(builder)=> {     
        // log-in
        builder.addCase(loginThunk.pending, (state) => {
            state.user = initialState.user;
            state.status = EThunkStatus.REQUEST;
            state.request = EUserRequest.LOGIN;
        });
       builder.addCase(loginThunk.rejected, (state) => {
            state.user = initialState.user;
            state.status = EThunkStatus.FAILED;
       });
       builder.addCase(loginThunk.fulfilled, (state, action) => {
            const res = action.payload as IUserAuthResponse
            state.status = EThunkStatus.SUCCESS;          
            state.isAuth = true;
            state.user = objUser(res.user);
            setLocalStorageItem('accessToken', res.accessToken);
            setLocalStorageItem('refreshToken', res.refreshToken);
       });
       // registration
       builder.addCase(registerThunk.pending, (state) => {
            state.status = EThunkStatus.REQUEST;
            state.request = EUserRequest.REGISTER;
       });
       builder.addCase(registerThunk.rejected, (state) => {
            state.status = EThunkStatus.FAILED;
       });
       builder.addCase(registerThunk.fulfilled, (state, action) => {
            const res = action.payload as IUserAuthResponse;
            state.status = EThunkStatus.SUCCESS; 
            state.isAuth = true;
            state.user = objUser(res.user);                       
            setLocalStorageItem('accessToken', res.accessToken);
            setLocalStorageItem('refreshToken', res.refreshToken);
       });
       // log-out
       builder.addCase(logoutThunk.pending, (state) => {
            state.status = EThunkStatus.REQUEST;
            state.request = EUserRequest.LOGOUT;
       });
       builder.addCase(logoutThunk.rejected, (state) => {
            state.status = EThunkStatus.FAILED;
       });
       builder.addCase(logoutThunk.fulfilled, (state) => {
            state.status = EThunkStatus.SUCCESS; 
            state.isAuth = false;
            state.user = initialState.user;                      
            removeLocalStorageItem('accessToken');
            removeLocalStorageItem('refreshToken');
       });
       // get-profile
       builder.addCase(loadUserThunk.pending, (state) => {
            state.status = EThunkStatus.REQUEST;
            state.request = EUserRequest.LOAD;
       });
       builder.addCase(loadUserThunk.rejected, (state) => {
            state.status = EThunkStatus.FAILED;
       });
       builder.addCase(loadUserThunk.fulfilled, (state, action) => {
            const res = action.payload as IUserResponse;
            state.status = EThunkStatus.SUCCESS;
            state.isAuth = true;
            state.user = objUser(res.user);          
       });
       // update-profile
       builder.addCase(updateUserThunk.pending, (state) => {
            state.status = EThunkStatus.REQUEST;
            state.request = EUserRequest.UPDATE;
       });
       builder.addCase(updateUserThunk.rejected, (state) => {
            state.status = EThunkStatus.FAILED;
       });
       builder.addCase(updateUserThunk.fulfilled, (state, action) => {
            const res = action.payload as IUserResponse;
            state.status = EThunkStatus.SUCCESS;
            state.user = objUser(res.user);
       });        
    },
});


// ACTIONS:

// export const { } = userSlice.actions;

// export const activeReducer = activeSlice.reducer;

export default userSlice;