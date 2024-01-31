import {ReactElement, FC} from 'react';

import styles from './link-button.module.css';

type LinkButtonProps = {
    icon: ReactElement,
    type: 'primary' | 'secondary', // string,    
    text: string
    // link: string, or onClick    
}

const LinkButton: FC<LinkButtonProps> = (props) =>{    
    return (
    <div>      
    <a href="#" className = {styles.button}>
        {props.icon}
            <span className={props.type === 'primary' ? styles.fontPrimary : styles.fontSecondary}>
                {props.text}
            </span>
    </a>
    </div>);
    // <Button htmlType='button' type={props.type} size="medium">
    //  {props.icon}
    //  <span className={props.type === 'primary' ? styles.fontPrimary : styles.fontSecondary}>
    //      {props.text}
    //  </span>
    // </Button>

   // <NavLink to={props.link} className={style.button}>
   //      {props.icon}
   //      <p className={props.type === 'primary' ? styles.fontPrimary : styles.fontSecondary}>{props.text}</p>
   // </NavLink>
   
}

export default LinkButton;