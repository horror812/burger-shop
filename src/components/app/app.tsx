import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {FC, useCallback, useEffect} from 'react';

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
import Modal from '../modal/modal';
import { IngredientDetailsByActive } from '../burger-ingredients/ingredient-details/ingredient-details';

const App:FC = () => {  
  
  const dispatch = useStoreDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isBackground = (location.state && location.state.background) ? true : false;
 
  // close-active-modal
  const handleCloseModal = useCallback(()=>{        
    navigate(-1)
  },[navigate]);

  // states
  const ingredientsState = useStoreSelector(getLoadIngredientsState);
  const orderState = useStoreSelector(getPostOrderState);  
  const userState = useStoreSelector(getUserState);  
  
  // check app busy, statuses for load-ingredients/post-order/user-auth
  const isLoader = isThunkLoading(ingredientsState.status) 
    || isThunkLoading(orderState.status, true)
    || isThunkLoading(userState.status);    

  // load-ingredients/user-info
  useEffect(() => {    
    dispatch(loadIngredientsThunk());
  }, [dispatch]);

  // load-auth-user-info
  useEffect(() => {        
    dispatch(loadUserThunk());   
  }, [dispatch, userState]);

  return (<>
        <AppHeader />  
        
        <Routes location = {location.state?.background || location}>
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/' element={<MainPage />} />
          <Route path='/orders' element={<OrdersPage />} />           
          <Route path='/ingredients/:ingredientId' element={<IngredientDetailsPage />}/>
          <Route path='/login' element={<ProtectedRoute><LoginPage /></ProtectedRoute>} />
          <Route path='/register' element={<ProtectedRoute><RegisterPage /></ProtectedRoute>} />
          <Route path='/forgot-password' element={<ProtectedRoute><ForgotPasswordPage/></ProtectedRoute>} />
          <Route path='/reset-password' element={<ProtectedRoute><ResetPasswordPage/></ProtectedRoute>} />   
          <Route path='/profile' element={<ProtectedRoute authorized redirectTo='/login'><ProfilePage/></ProtectedRoute>} /> 
          {/*  TODO: сделать outlet
           <Route path='/profile' element={<ProtectedRoute authorized><ProfilePage/></ProtectedRoute>}>
            <Route path='' element={<EditProfile />}></Route>
            <Route path='orders' element={''}></Route>
          </Route>*/}
        </Routes>  

        {isBackground && (<Routes>
          <Route path="/ingredients/:idIngredient" element = {
              (<Modal onClick={handleCloseModal} header = "Детали Ингредиента">            
                {/* TODO: почему по use Param null - узнать!
                <IngredientDetailsByPathId/>*/}                
                <IngredientDetailsByActive />
              </Modal>)}/>
          </Routes>)}

        {isLoader && (<Loader />)}        
    </>); 
}

export default App;