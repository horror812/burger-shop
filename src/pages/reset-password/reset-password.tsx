import { ChangeEvent, FC, FormEvent, useCallback, useState } from "react";
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './reset-password.module.css';
import { Link, useNavigate } from "react-router-dom";
import { resetPasswordRequest } from "../../utils/api";

const ResetPasswordPage:FC = () => {

   // cnst's

  const navigate = useNavigate();
  const [resetData, setResetData] = useState({token: '', password: ''});
  
  // cb's

  const handleChangeFormData = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setResetData({...resetData,[e.target.name]: e.target.value });
  }, [resetData])

  const handleReset = useCallback((e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // заменить на thunk? dispatch(resetPassworThunk({...}));     
    resetPasswordRequest({password:resetData.password, token:resetData.token})
     .then((res) => {
       if (res.success) {
         navigate('/login', { replace: true, state: true });
       }
     });
  },[resetData,navigate])   

  // comp
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title + ' text_type_main-medium mb-6'}>Восстановление пароля</h1>
        <form 
          id="forgot-password-form" 
          className={styles.form + ' mb-20'}
          onSubmit={handleReset}
        >
          <Input
            type={'password'}
            placeholder={'Введите новый пароль'}
            onChange={handleChangeFormData}
            value={resetData.password}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={handleChangeFormData}
            value={resetData.token}
            name={'token'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Button htmlType = "submit" type="primary" size="medium">
            Сохранить
          </Button>
        </form>
        <div className={styles.logging}>
          <span className="text_type_main-default">Вспомнили пароль?</span>
          <Link to="/login" className={styles.link + ' ml-2 text_type_main-default'}>Войти</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;