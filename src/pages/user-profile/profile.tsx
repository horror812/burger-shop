import { ChangeEvent, FC, FormEvent, useCallback, useState } from "react";
import { useStoreDispatch, useStoreSelector } from "../../services/store";

import { getUserState } from "../../services/selectors";
import { logoutThunk, updateUserThunk } from "../../services/user";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useNavigate } from "react-router-dom";

import styles from './profile.module.css';

const ProfilePage:FC = () => {

  // не использую useForm потому что тут еще wasChanged

  const navigate = useNavigate();
  const dispatch = useStoreDispatch();
  const userState = useStoreSelector(getUserState);

  const [userData, setUserData] = useState({ name:userState.user.name || '', email: userState.user.email || '', password: '' });
  const [wasChanged, setChanged] = useState(false);
  
  // cb's

  const handleChangeFormData = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setUserData({...userData,[e.target.name]: e.target.value });
    setChanged(true);
  }, [userData, setChanged])

  const handleLogout = useCallback(() => {    
    dispatch(logoutThunk()).finally(()=>{navigate("/");}); 
  }, [dispatch, navigate]);

  const handleUpdate = useCallback((e:FormEvent) => {
    e.preventDefault();    
    dispatch(updateUserThunk(userData));
    setChanged(false);
    setUserData({...userData,password: ''});  
  }, [dispatch, userData, setUserData, setChanged]);

  const handleCancelUpdate = useCallback(() => {
    setChanged(false);
    setUserData({
      ...userData,
      name: userState.user.name || '',
      email: userState.user.email || '',
      password: ''
    });      
  }, [userState, userData, setUserData, setChanged]);

  // comp
  return (
    <section className={styles.profile}>
        <nav className={styles.navigation + ' mt-3 mr-15'}>
          <NavLink to='/profile' className={styles.link + 'text_type_main-medium'}>    
          {({ isActive }) => (<>                               
              <span className = {isActive ? styles.fontPrimary : styles.fontSecondary}>
              Профиль
              </span>
          </>)}              
          </NavLink>
          <NavLink to='/profile/orders' className={styles.link + 'text_type_main-medium'}>    
          {({ isActive }) => (<>                               
              <span className = {isActive ? styles.fontPrimary : styles.fontSecondary}>
              История заказов
              </span>
          </>)}              
          </NavLink>             
          <div className={styles.link + 'text_type_main-medium'}             
            onClick={handleLogout}>
            <span className = {styles.fontSecondary}>
            Выход
            </span>
          </div>
          <span className='text text_type_main-default text_color_inactive mt-20'>В этом разделе вы можете изменить свои персональные данные</span>
        </nav>
    <form 
      id="profile-form" 
      className={styles.form}
      onSubmit={handleUpdate}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={handleChangeFormData}
        icon={'EditIcon'}
        value={userData.name}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
      />
      <Input
        type={'email'}
        placeholder={'E-mail'}
        onChange={handleChangeFormData}
        icon={'EditIcon'}
        value={userData.email}
        name={'email'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
      />
      <Input
        type={'password'}
        placeholder={'Пароль'}
        onChange={handleChangeFormData}
        icon={'EditIcon'}
        value={userData.password}
        name={'password'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
      />
      {wasChanged && (<div className={styles.container}>
        <Button htmlType="submit" 
          type={"primary"} 
          size={"medium"}
        >
          Сохранить
        </Button>
        <Button htmlType="button" 
          type={"secondary"} 
          size={"medium"} 
          onClick={handleCancelUpdate}
        >
          Отмена
        </Button>
      </div>)}
    </form>
    </section>
  );
};

export default ProfilePage;