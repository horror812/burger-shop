import {FC} from 'react';
import {BurgerIcon, ListIcon, ProfileIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import LinkButton from './link-button/link-button';
import style from './app-header.module.css'

const getCurrentPage = () => { // util:getCurrentPage
  return 'constrcutor' // 'constrcutor', 'orders', 'profile'
}

const AppHeader: FC = () => {
    const page = getCurrentPage()   // 'constrcutor', 'orders' or 'profile'
    return (
        <header className={style.header}>
            <div className={style.center}>
                <nav className={style.nav + " mt-4"}>
                    <div className={style.container}>                       
                        <LinkButton icon={<BurgerIcon type={page === 'constrcutor' ? 'primary' : 'secondary'}/>}
                                text="Конструктор" type={page === 'constrcutor' ? 'primary' : 'secondary'}/>                                           
                        <LinkButton icon={<ListIcon
                                type={page === 'orders' ? 'primary' : 'secondary'}/>}
                                          text="Лента заказов"
                                          type={page === 'orders' ? 'primary' : 'secondary'}/>
                       
                    </div>
                    <div className={style.logo}>                 
                      <Logo/>                                  
                    </div>
                    <div className={style.profile}>
                        <LinkButton
                            icon={<ProfileIcon type={page === 'profile' ? 'primary' : 'secondary'}/>}
                            text="Личный кабинет"
                            type={page === 'profile' ? 'primary' : 'secondary'}/>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default AppHeader;