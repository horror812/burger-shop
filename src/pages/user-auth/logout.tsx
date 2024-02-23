import { FC,  useEffect } from 'react';
import Loader from '../../components/loader/loader';

import { logoutThunk } from '../../services/user';
import { useStoreDispatch, useStoreSelector } from '../../services/store';
import { getUserState } from '../../services/selectors';
import { Navigate } from 'react-router-dom';

const LogoutPage:FC = () => {

  // cnst's

  const dispatch = useStoreDispatch();
  const userState = useStoreSelector(getUserState);

  // eff
  useEffect(()=>{
    //if(userState.isAuth){
      dispatch(logoutThunk());
    //}
  },[dispatch, userState]);
 
  if(userState.isAuth){ 
    return <Loader message = "выхожу..."/>
  }
  return <Navigate to={"/"}/>;   // goto-main-page
};

export default LogoutPage;