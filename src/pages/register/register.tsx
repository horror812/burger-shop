import { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './registration.module.css';
import { registerThunk } from '../../services/user';
import { useStoreDispatch } from '../../services/store';

const RegisterPage:FC = () => {

  // const's

  const dispatch = useStoreDispatch();
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: ''});

  // cb's

  const handleChangeFormData = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setRegisterData({...registerData,[e.target.name]: e.target.value });
  }, [registerData])

  const handleRegister = useCallback((e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    dispatch(registerThunk({name:registerData.name, 
      email: registerData.email, 
      password: registerData.password})); 
  },[registerData, dispatch])

  // comp
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={`${styles.title} text_type_main-medium mb-6`}>Регистрация</h1>
        <form 
          id="registration-form" 
          className={`${styles.form} mb-20`}
          onSubmit={handleRegister}
        >
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleChangeFormData}
            value={registerData.name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleChangeFormData}
            value={registerData.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={handleChangeFormData}
            value={registerData.password}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Button htmlType="button" type="primary" size="medium">
            Зарегистироваться
          </Button>
        </form>
        <div className={styles.logging}>
          <span className="text_type_main-default">Уже зарегистированы?</span>
          <Link to="/login" className={`${styles.link} ml-2 text_type_main-default`}>Войти</Link>
        </div>
      </div>
    </div>
  )
};

export default RegisterPage;