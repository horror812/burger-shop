import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EThunkStatus, IUserAuthResponse, IUserData, IUserResponse } from '../utils/types';
import { getUserRequest, loginRequest, logoutRequest, registerRequest, updateUserRequest } from '../utils/api';

export interface IUserState {     
     user: IUserData;
     isAuth: boolean; // authorized SUCCESS  
     status: EThunkStatus;

     registerStatus: EThunkStatus; 
     loginStatus: EThunkStatus;   
     // logoutStatus: EThunkStatus;          
} 

// INIT-STATE:

const initialState:IUserState = {
    user: {email: '',  name: ''},    
    status: EThunkStatus.UNDEFINED,
    registerStatus: EThunkStatus.UNDEFINED,
    loginStatus: EThunkStatus.UNDEFINED,    
    isAuth: false, // authorized  
};

// clone of user to new-obj
function objUser(user?: IUserData) {return user ? {email:user.email, name:user.name} : initialState.user;}

// THUNKS: 

export const registerThunk = createAsyncThunk('registerThunk', registerRequest);
export const loginThunk = createAsyncThunk('loginThunk', loginRequest);
export const logoutThunk = createAsyncThunk('logoutThunk', logoutRequest);
export const loadUserThunk = createAsyncThunk('loadUserThunk', getUserRequest);
export const updateUserThunk = createAsyncThunk('updateUserThunk', updateUserRequest);
//export const resetPasswordThunk = createAsyncThunk('resetPasswordThunk', resetPasswordRequest);
//export const forgotPasswordThunk = createAsyncThunk('forgotPasswordThunk', forgotPasswordRequest);

// SLICE:

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
     loginAccepted:(state)=>{
          if(state.loginStatus === EThunkStatus.SUCCESS){
               state.loginStatus = EThunkStatus.ACCEPTED
          }
     },
     registerAccepted:(state)=>{
          if(state.registerStatus === EThunkStatus.SUCCESS){
               state.registerStatus = EThunkStatus.ACCEPTED
          }
     }, 
     // tryAuth:(state)=>{ if(!state.isAuth){}}
    },
    extraReducers:(builder)=> {  
        // log-in \\
       builder.addCase(loginThunk.pending, (state) => {
            state.loginStatus = EThunkStatus.REQUEST; 
       });
       builder.addCase(loginThunk.rejected, (state) => {
            state.loginStatus = EThunkStatus.FAILED; 
       });
       builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.loginStatus = EThunkStatus.SUCCESS; 
            const res = action.payload as IUserAuthResponse;
            state.user = objUser(res.user);
            state.isAuth = true;        
       });

       // registration \\
       builder.addCase(registerThunk.pending, (state) => {
            state.registerStatus = EThunkStatus.REQUEST;               
       });
       builder.addCase(registerThunk.rejected, (state) => {
            state.registerStatus = EThunkStatus.FAILED;
       });
       builder.addCase(registerThunk.fulfilled, (state, action) => {
            state.registerStatus = EThunkStatus.SUCCESS;
            const res = action.payload as IUserAuthResponse;
            state.user = objUser(res.user);             
            state.isAuth = true;                     
       });
       
       // log-out \\
       builder.addCase(logoutThunk.pending, (state) => {
            state.status = EThunkStatus.REQUEST;
       });
       builder.addCase(logoutThunk.rejected, (state) => {
            state.status = EThunkStatus.FAILED;
            // при ошибки выхода всеровно сбрасываем ? 
            // state.isAuth = false;
            // state.user = initialState.user;  
       });
       builder.addCase(logoutThunk.fulfilled, (state) => {
            state.status = EThunkStatus.SUCCESS; 
            state.isAuth = false;
            state.user = initialState.user;                      
       });

       // get-profile-auto-auth \\
       builder.addCase(loadUserThunk.pending, (state) => {
            state.status = EThunkStatus.REQUEST;
       });
       builder.addCase(loadUserThunk.rejected, (state) => {
            state.status = EThunkStatus.FAILED;
       });
       builder.addCase(loadUserThunk.fulfilled, (state, action) => {
            state.status = EThunkStatus.SUCCESS;
            const res = action.payload as IUserResponse;            
            state.isAuth = true;
            state.user = objUser(res.user);          
       });

       // update-profile \\
       builder.addCase(updateUserThunk.pending, (state) => {
            state.status = EThunkStatus.REQUEST;
       });
       builder.addCase(updateUserThunk.rejected, (state) => {
            state.status = EThunkStatus.FAILED;
       });
       builder.addCase(updateUserThunk.fulfilled, (state, action) => {
            state.status = EThunkStatus.SUCCESS;
            const res = action.payload as IUserResponse;           
            state.user = objUser(res.user);
       });        
    },
});


// ACTIONS:

export const {loginAccepted, registerAccepted} = userSlice.actions;

// export const activeReducer = activeSlice.reducer;

export default userSlice;