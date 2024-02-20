import { ChangeEvent, FC, FormEvent, useCallback, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { forgotPasswordRequest } from "../../utils/api";

import styles from './forgot-password.module.css';

const ForgotPasswordPage:FC = () => {

  // cnst's

  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  // cb's 
 
  const handleChangeFormData = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }, [setEmail])

  const handleEmailConfirm = useCallback(async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // заменить на thunk? dispatch(forgotPasswordThunk({...})); 
    forgotPasswordRequest({email:email})
    .then((res) => {
      if (res.success) {
        navigate('/reset-password', { replace: true, state: true });
      }
    });
  },[email, navigate])

  // comp
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title + ' text_type_main-medium mb-6'}>Восстановление пароля</h1>
        <form 
          id="forgot-password-form" 
          className={styles.form + ' mb-20'}
          onSubmit={handleEmailConfirm}
        >
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleChangeFormData}
            value={email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Button htmlType ="button" type="primary" size="medium">
            Восстановить
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

export default ForgotPasswordPage;