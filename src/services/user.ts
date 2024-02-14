import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EThunkStatus, IUserAuthResponse, IUserData, IUserResponse } from '../utils/types';
import { removeLocalStorageItem, setLocalStorageItem } from '../utils/storage';
import { getUserRequest, loginRequest, logoutRequest, registerRequest, updateUserRequest } from '../utils/api';

export interface IUserState {
    user: IUserData;
    status: EThunkStatus;
    isAuth: boolean; // logged      
} 

// INIT-STATE:

const initialState:IUserState = {
    user: {email: '',  name: ''},    
    status: EThunkStatus.UNDEFINED,
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
       // check-auth
       builder.addCase(loadUserThunk.pending, (state) => {
            state.status = EThunkStatus.REQUEST;
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