import { ChangeEvent, FC,FormEvent, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { TLoginData } from '../../utils/types';

import styles from './user.module.css';

type LoginFormProps = {
  onSubmit: (userData:TLoginData)=>void; // item
  message?:string; // for error
};

const LoginForm:FC<LoginFormProps> = ({onSubmit, message}) => {

  // cnst's

  const [loginData, setLoginData] = useState({email: '', password: ''});

  // cb's

  const handleChangeFormData = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setLoginData({...loginData,[e.target.name]: e.target.value });
  }, [loginData])

  const handleLogin = useCallback((e:FormEvent<HTMLFormElement>) => {    
    e.preventDefault();
    onSubmit(loginData);
    // dispatch(loginThunk({email: loginData.email, password: loginData.password})); 
  },[onSubmit, loginData])
  
  // comp-form
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title + ' text_type_main-medium mb-6'}>
          Вход
        </h1>
        <form 
          id="login-form" 
          className={styles.form + ' mb-20'}
          onSubmit={handleLogin}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleChangeFormData}
            value={loginData.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={handleChangeFormData}
            value={loginData.password}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          {message && (<span className={styles.message}>
          {message}
          </span>)}
          <Button htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </form>
        <div className={styles.logging + ' mb-4'}>
          <span className="text_type_main-default">Вы — новый пользователь?</span>
          <Link to="/register" className={styles.link + ' ml-2 text_type_main-default'}>Зарегистироваться</Link>
        </div>
        <div className={styles.logging}>
          <span className="text_type_main-default">Забыли пароль?</span>
          <Link to="/forgot-password" className={styles.link + ' ml-2 text_type_main-default'}>Восстановить пароль</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;