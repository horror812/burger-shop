import {FC} from 'react';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { getConstructorBurgerState } from '../../../services/selectors';
import ConstructorItem from '../constructor-item/constructor-item';

import styles from './constructor-list.module.css'

const ConstructorList: FC = () => {

    //const dispatch:StoreDispatch = useDispatch();
   
    const {bun, main} = useSelector(getConstructorBurgerState); 
        
    return (<div className={styles.container + " ml-4 mt-25"}>
            {bun ? (<div className={"ml-8"} >
                         <ConstructorElement
                                type="top"
                                isLocked={true}
                                text= {bun.name + " (верх)"}
                                price={bun.price}
                                thumbnail={bun.image_mobile}
                            />
                    </div>) : (<div className={"pt-10 ml-20 pl-15"}>
                        <p className="text text_type_main-medium "> Добавьте булку! </p>
                        </div>)
            }            
            
            { main && main.length >0 ? ( <div className = {styles.scroll + " mb-3 mt-3" }  >
                { main.map((item, index) => {
                    return ( <ConstructorItem key = {item.uid} item = {item} index={index} /> )
                    })
                }
                </div>) 
                : (<div className={"ml-20 mt-5 pt-5 pb-5"}><p className="text text_type_main-medium "> Добавьте игредиенты!</p></div>)
            }            

            {bun ? ( <div className={"ml-8"} >
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text= {bun.name + " (низ)"}
                                price={bun.price} 
                                thumbnail={bun.image_mobile}
                            />
                        </div>) 
                    : (<div className={"pt-10 ml-20 pl-15"}><p className="text text_type_main-medium "> Добавьте булку! </p></div>)
            }                       
    </div> )    
}

export default ConstructorList;