import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { FC, useCallback, useEffect } from 'react';

import AppHeader from '../app-header/app-header'
import MainPage from '../../pages/main/main';
import IngredientDetailsPage from '../../pages/ingredient-details/ingredient-details';

import { loadIngredientsThunk } from '../../services/load-ingredients';
import { loadUserThunk } from '../../services/user';
import { useStoreDispatch, useStoreSelector } from '../../services/store';

import ProtectedRoute from '../protected-route/protected-route';
import NotFoundPage from '../../pages/not-found/not-found';
import LoginPage from '../../pages/user-auth/login';
import RegisterPage from '../../pages/user-auth/register';
import ForgotPasswordPage from '../../pages/user-auth/forgot-password';
import ResetPasswordPage from '../../pages/user-auth/reset-password';
import ProfilePage from '../../pages/user-profile/profile';
import Modal from '../modal/modal';
import { IngredientDetailsByPathId } from '../burger-ingredients/ingredient-details/ingredient-details';
import { getUserState } from '../../services/selectors';
import FeedDetailsPage from '../../pages/feed/feed-details';
import FeedPage from '../../pages/feed/feed';

const App: FC = () => {  
  
  const dispatch = useStoreDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isBackground = (location.state && location.state.background) ? true : false;
  const { isAuth } = useStoreSelector(getUserState);

  // close-active-modal
  const handleCloseModal = useCallback(() => {        
    navigate(-1);
  }, [navigate]);    

  // load-ingredients/user-info
  useEffect(() => { 
    dispatch(loadIngredientsThunk());
  }, [dispatch]);

  // load-auth-user-info
  useEffect(() => {     
    //if(!isAuth){
    dispatch(loadUserThunk()); 
    //}
  }, [dispatch, isAuth]);

  // comp
  return (<>
    <AppHeader />          
    <Routes location={location.state?.background || location}>
      <Route path='*' element={<NotFoundPage />} />
      <Route path='/' element={<MainPage />} />      
      <Route path='/feed' element={<FeedPage />} /> 
      <Route path='/feed/:id' element={<FeedDetailsPage />} />      
      <Route path='/ingredients/:id' element={<IngredientDetailsPage />} />
      <Route path='/login' element={<ProtectedRoute><LoginPage /></ProtectedRoute>} />
      <Route path='/register' element={<ProtectedRoute><RegisterPage /></ProtectedRoute>} />
      <Route path='/forgot-password' element={<ProtectedRoute><ForgotPasswordPage /></ProtectedRoute>} />
      <Route path='/reset-password' element={<ProtectedRoute><ResetPasswordPage /></ProtectedRoute>} />   
      <Route path='/profile' element={<ProtectedRoute authorized><ProfilePage /></ProtectedRoute>} /> 
      <Route path='/profile/orders/' element={<ProtectedRoute authorized><ProfilePage /></ProtectedRoute>} />
      <Route path='/profile/orders/:id' element={<ProtectedRoute authorized><ProfilePage /></ProtectedRoute>} />
      {/*  TODO: сделать outlet
           <Route path='/profile' element={<ProtectedRoute authorized><ProfilePage/></ProtectedRoute>}>
            <Route path='' element={<EditProfile />}></Route>
            <Route path='orders' element={''}></Route>
          </Route>*/}
    </Routes>  

    {isBackground && (<Routes>
      <Route path="/ingredients/:id" element={
        (<Modal onClick={handleCloseModal} header="Детали Ингредиента">            
          <IngredientDetailsByPathId />     
        </Modal>)} />
    </Routes>)}               
  </>); 
}

export default App;