import { Routes, Route, useLocation } from 'react-router-dom';
import {FC, useEffect} from 'react';

import AppHeader from '../app-header/app-header'
import MainPage from '../../pages/main/main';

import { loadIngredientsThunk } from '../../services/load-ingredients';
import { loadUserThunk } from '../../services/user';
import { getLoadIngredientsState, getPostOrderState, getUserState } from '../../services/selectors';
import { useStoreDispatch, useStoreSelector } from '../../services/store';

import { isLoading } from '../../utils/helpers';
import IngredientDetailsPage from '../../pages/ingredient-details/ingredient-details';


const App:FC = () => {  
  
  const dispatch = useStoreDispatch();
  const location = useLocation();
  //const background = location.state && location.state.background ? true : false;

  // states
  const ingredientsState = useStoreSelector(getLoadIngredientsState);
  const orderState = useStoreSelector(getPostOrderState);  
  //const userState = useStoreSelector(getUserState);  

  // load-ingredients/user-info
  useEffect(() => {    
    dispatch(loadIngredientsThunk());
    //if (!userState.isAuth) {dispatch(loadUserThunk())}
  }, [dispatch]);

  // waiting requests  isLoading(userState.status)|| 
  if(isLoading(ingredientsState.status)) 
    return <div> Загрузка... </div>  
  
  // pending-postion
  if(isLoading(orderState.status, true)) 
    return <div> Отправка... </div>    

  return (
    <>
        <AppHeader />  
        <Routes location={location}>
          <Route path='/' element={<MainPage />} />
          <Route path='/ingredients/:ingredientId' element={<IngredientDetailsPage />}/>
         {/* 
          <Route path='/profile' element={<PR element={<Profile />} />} />
          <Route path='/login' element={<PR anonymous element={<Login />} />} />
          <Route path='/register' element={<PR anonymous element={<Register />} />} />
          <Route path='/forgot-password' element={<PR anonymous element={<ForgotPassword />} />} />
          <Route path='/reset-password' element={<PR anonymous element={<ResetPassword />} />} />
        */}
        </Routes>  
    </>); 
}

export default App;