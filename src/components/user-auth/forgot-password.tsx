import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { TPostForgotData } from "../../utils/types";

import styles from './user.module.css';
import { useSubmitForm } from "../../utils/hooks/use-form";

type ForgotPasswordFormProps = {
  onSubmit: (userData:TPostForgotData)=>void; // item
  message?:string; // for error
};

const ForgotPasswordForm:FC<ForgotPasswordFormProps> = ({onSubmit, message}) => {

  // cnst's

  const forgotData = useSubmitForm({email:''}, onSubmit);

  // comp
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title + ' text_type_main-medium mb-6'}>Восстановление пароля</h1>
        <form 
          id="forgot-password-form" 
          className={styles.form + ' mb-20'}
          onSubmit={forgotData.handleSubmit}
        >
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={forgotData.handleChange}
            value={forgotData.values.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          {message && (<span className={styles.message}>
          {message}
          </span>)}
          <Button htmlType ="submit" type="primary" size="medium">
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

export default ForgotPasswordForm;