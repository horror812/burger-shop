import { FC, useCallback, useEffect } from 'react';
import { registerAccepted, registerThunk } from '../../services/user';
import { useStoreDispatch, useStoreSelector } from '../../services/store';

import RegisterForm from '../../components/user-auth/register';
import { EThunkStatus, TRegisterData,  } from '../../utils/types';
import { getUserState } from '../../services/selectors';
import Loader from '../../components/loader/loader';
import { Navigate } from 'react-router-dom';

//import styles from './register.module.css';

const RegisterPage:FC = () => {

  // const's
  const dispatch = useStoreDispatch();
  const userState = useStoreSelector(getUserState);

  // cb's
  const handleRegister = useCallback((userData:TRegisterData) => {    
    dispatch(registerThunk(userData)); 
  },[dispatch]);

  // eff
  useEffect(()=>{
    if(userState.registerStatus === EThunkStatus.SUCCESS){
      dispatch(registerAccepted());
    }
  },[dispatch, userState]);

  let message 
  // good/error/accepted login
  if(userState.registerStatus === EThunkStatus.REQUEST) return <Loader />
  if(userState.registerStatus === EThunkStatus.ACCEPTED) return <Navigate to="/" />  
  if(userState.registerStatus === EThunkStatus.FAILED) message = "Что-то не так!" 
  
  // comp
  return <RegisterForm onSubmit={handleRegister} message = {message}/>
};

export default RegisterPage;