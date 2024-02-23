import { FC,  useEffect, useCallback } from 'react';
import LoginForm from '../../components/user-auth/login';
import Loader from '../../components/loader/loader';

import { loginAccepted, loginThunk } from '../../services/user';
import { useStoreDispatch, useStoreSelector } from '../../services/store';
import { getUserState } from '../../services/selectors';
import { EThunkStatus, TLoginData } from '../../utils/types';
import { Navigate } from 'react-router-dom';

const LoginPage:FC = () => {

  // cnst's

  const dispatch = useStoreDispatch();
  const userState = useStoreSelector(getUserState);

  const handleLogin = useCallback((userData:TLoginData) => {    
    dispatch(loginThunk(userData)); 
  },[dispatch]);

  // eff
  useEffect(()=>{
    if(userState.loginStatus === EThunkStatus.SUCCESS){
      dispatch(loginAccepted());
    }
  },[dispatch, userState]);


  let message // нет кода ошибки, да и не надо)
  // good/error/accepted login
  if(userState.loginStatus === EThunkStatus.REQUEST) return <Loader />
  if(userState.loginStatus === EThunkStatus.ACCEPTED) return <Navigate to="/" />  
  if(userState.loginStatus === EThunkStatus.FAILED) message = "Что-то не так!" 
  
  //if (isAuth) {
  //  return <Navigate to={location.state?.from || "/"} />;
  // }

  // comp-form
  return <LoginForm onSubmit={handleLogin} message = {message}/>;
};

export default LoginPage;