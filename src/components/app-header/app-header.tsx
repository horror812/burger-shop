import {FC} from 'react';
import { NavLink } from 'react-router-dom';
import {BurgerIcon, ListIcon, ProfileIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components';

import { useStoreSelector } from '../../services/store';
import { getUserState } from '../../services/selectors';

import styles from './app-header.module.css'

const AppHeader: FC = () => {

    const userState = useStoreSelector(getUserState);      

    return (
        <header className={styles.header}>
            <div className={styles.center}>
                <nav className={styles.nav + " mt-4"}>
                    <div className={styles.container}>  
                        <NavLink className = {styles.button} to = {"/"}> 
                            {({ isActive }) => (<>
                                <BurgerIcon type = {isActive ? 'primary' :'secondary'} />
                                <span className = {isActive ? styles.fontPrimary : styles.fontSecondary}>
                                Конструктор
                                </span>
                            </>)}         
                        </NavLink>
                        <NavLink className = {styles.button} to = {"/orders"}> 
                            {({ isActive }) => (<>
                                <ListIcon type = {isActive ? 'primary' :'secondary'} />
                                <span className = {isActive ? styles.fontPrimary : styles.fontSecondary}>
                                Лента заказов
                                </span>
                            </>)}         
                        </NavLink>                      
                    </div>                    
                    <div className={styles.logo}>                 
                      <Logo/>                                  
                    </div>
                    <div className={styles.profile}>
                        <NavLink className = {styles.button} to = {"/profile"}> 
                            {({ isActive }) => (<>
                                <ProfileIcon type = {isActive ? 'primary' :'secondary'} />
                                <span className = {isActive ? styles.fontPrimary : styles.fontSecondary}>
                                {userState.isAuth ? "Я тут," + userState.user.name : "Войти/Регистрация"}
                                </span>
                            </>)}         
                        </NavLink>    
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default AppHeader;