import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import { TRegisterData } from '../../utils/types';
import { useSubmitForm } from '../../utils/hooks/use-form';

import styles from './user.module.css';

type RegisterFormProps = {
  onSubmit: (userData:TRegisterData)=>void; // item
  message?:string; // for error
};

const RegisterForm:FC<RegisterFormProps> = ({onSubmit, message}) => {

  // const's

  const registerData = useSubmitForm({ name: '', email: '', password: ''}, onSubmit);
   
  // comp
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={`${styles.title} text_type_main-medium mb-6`}>Регистрация</h1>
        <form 
          id="registration-form" 
          className={`${styles.form} mb-20`}
          onSubmit={registerData.handleSubmit}
        >
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={registerData.handleChange}
            value={registerData.values.name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={registerData.handleChange}
            value={registerData.values.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={registerData.handleChange}
            value={registerData.values.password}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          {message && (<span className={styles.message}>
          {message}
          </span>)}
          <Button htmlType="submit" type="primary" size="medium">
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

export default RegisterForm;