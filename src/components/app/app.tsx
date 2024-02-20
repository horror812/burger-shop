import { Routes, Route, useLocation } from 'react-router-dom';
import {FC, useEffect} from 'react';

import AppHeader from '../app-header/app-header'
import MainPage from '../../pages/main/main';
import IngredientDetailsPage from '../../pages/ingredient-details/ingredient-details';
import Loader from '../loader/loader';

import { loadIngredientsThunk } from '../../services/load-ingredients';
import { loadUserThunk } from '../../services/user';
import { getLoadIngredientsState, getPostOrderState, getUserState } from '../../services/selectors';
import { useStoreDispatch, useStoreSelector } from '../../services/store';

import { isThunkLoading } from '../../utils/helpers';
import ProtectedRoute from '../protected-route/protected-route';
import NotFoundPage from '../../pages/not-found/not-found';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/profile/profile';
import OrdersPage from '../../pages/orders/orders';

const App:FC = () => {  
  
  const dispatch = useStoreDispatch();
  const location = useLocation();
  //const background = location.state && location.state.background ? true : false;

  // states
  const ingredientsState = useStoreSelector(getLoadIngredientsState);
  const orderState = useStoreSelector(getPostOrderState);  
  const userState = useStoreSelector(getUserState);  

  // load-ingredients/user-info
  useEffect(() => {    
    dispatch(loadIngredientsThunk());
    dispatch(loadUserThunk())
  }, [dispatch]);

  // check app busy, statuses for load-ingredients/post-order/user-auth
  const isLoader = isThunkLoading(ingredientsState.status) 
    || isThunkLoading(orderState.status, true)
    || isThunkLoading(userState.status)

  return (
    <>
        <AppHeader />  
        <Routes location={location}>
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/' element={<MainPage />} />
          <Route path='/orders' element={<OrdersPage />} />           
          <Route path='/ingredients/:ingredientId' element={<IngredientDetailsPage />}/>
          <Route path='/login' element={<ProtectedRoute><LoginPage /></ProtectedRoute>} />
          <Route path='/register' element={<ProtectedRoute><RegisterPage /></ProtectedRoute>} />
          <Route path='/forgot-password' element={<ProtectedRoute><ForgotPasswordPage/></ProtectedRoute>} />
          <Route path='/reset-password' element={<ProtectedRoute><ResetPasswordPage/></ProtectedRoute>} />   
          <Route path='/profile' element={<ProtectedRoute authorized><ProfilePage/></ProtectedRoute>} />          
        </Routes>  
        {isLoader && (<Loader />)}
    </>); 
}

export default App;