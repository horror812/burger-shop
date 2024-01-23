import {ReactElement, FC} from 'react';

import styles from './link-button.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

//# Использую Button потому что пока не разобрался с NavLink

type LinkButtonProps = {
    icon: ReactElement,
    type: 'primary' | 'secondary', // string,    
    text: string
    // link: string,
    // onClick    
}

const LinkButton: FC<LinkButtonProps> = (props) =>{    
    return (<div className={styles.button}>
        <Button htmlType='button' type={props.type} size="medium">
            {props.icon}
            <span className={props.type === 'primary' ? styles.fontPrimary : styles.fontSecondary}>
                {props.text}
            </span>
        </Button>
        </div>);
   //     <NavLink to={props.link} className={style.button}>
   //         {props.icon}
   //         <p className={props.type === 'primary' ? styles.fontPrimary : styles.fontSecondary}>{props.text}</p>
   //     </NavLink>
   
}

export default LinkButton;