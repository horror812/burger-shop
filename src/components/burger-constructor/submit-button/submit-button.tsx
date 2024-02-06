import { FC } from 'react';
import { Button,  CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './submit-button.module.css';

type SubmitButtonProps = {
  totalPrice: number; // totalSum
  onClick: ()=>void; 
}

const SubmitButton: FC<SubmitButtonProps> = ({totalPrice, onClick}) => {  
  return (<div className={`${styles.total} mt-10 pr-8`}>
      <span className={`${styles.totalSum} mr-10 text_type_digits-medium`}>
        {totalPrice}
        <CurrencyIcon type="primary" />
      </span>        
      <Button 
          htmlType="button"
          type="primary" 
          size="large" 
          onClick={() => {onClick();}}>
        Оформить заказ
      </Button>
    </div>);
}

export default SubmitButton;