import {FC, useState} from 'react';
import styles from './burger-constructor.module.css'
import { TIngredientItem, TOrderItem } from '../../utils/types';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

type BurgerConstructorProps = {
    ingredients: TIngredientItem[]; // all_ingredients   
    order: TOrderItem; // bun and ingredients 
    // orderIngredients: TIngredientItem[];
    // orderBun?: TIngredientItem;   
}

const BurgerConstructor: FC<BurgerConstructorProps> = (props) => {
   
    // order-modal
    const [orderModalVisible, setOrderModalVisible] = useState(false);
    const handleCloseOrderModal = () => { setOrderModalVisible(false) }
    const handleOpenOrderModal = () => { setOrderModalVisible(true) }

    // order просто готовый бургер-заглушка сейчас
    // const allIngredients = props.ingredients
    const order = props.order    
    const bun = order.bun
    const orderIngredients = order.ingredients
    const totalSum = 1000 // bun.price + ingredients[...].price
    // const onOrderClick = props.onOrderClick
   
return (<div className = {styles.main + " ml-5"} >    
        <div className={styles.container + " ml-4 mt-25"}>
            {bun ? (<div className={"ml-8"} >
                                        <ConstructorElement
                                            type="top"
                                            isLocked={true}
                                            text= {bun.name + " (верх)"}
                                            price={bun.price}
                                            thumbnail={bun.image_mobile}
                                        />
                                    </div>) : (<div className={"pt-10 ml-20 pl-15"}>
                        <p className="text text_type_main-medium "> Добавьте булку </p></div>)
            }
            <div className={styles.scroll + " mb-3 mt-3" }  >
                {                 
                orderIngredients && orderIngredients.length >0 ? (
                    orderIngredients.map((item, index) => {
                    return( 
                        <BurgerConstructorItem /*key={item._id}*/ key = {index} item = {item} index={index} />
                    )
                    })) : (<div className={"ml-20 mt-25 pt-30"}><p className="text text_type_main-medium "> Добавьте игредиенты!</p></div>)
                    
                }
            </div>
            {bun ?
                ( <div className={"ml-8"} >
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text= {bun.name + " (низ)"}
                                price={bun.price}
                                thumbnail={bun.image_mobile}
                            />
                        </div>) : (<div className={"pt-10 ml-20 pl-15"}><p className="text text_type_main-medium "> Добавьте булку </p></div>)
            }
            <div className={`${styles.total} mt-10 pr-8`}>
        <span className={`${styles.totalSum} mr-10 text_type_digits-medium`}>
          {totalSum}
          <CurrencyIcon type="primary" />
        </span>
        <Button 
            htmlType="button"
            type="primary" 
            size="large" 
            onClick={() => { 
            if(bun && orderIngredients && orderIngredients!.length >= 1) {
                handleOpenOrderModal()               
            }
          }}
        >
          Оформить заказ
        </Button>
      </div>              
    </div>    

    {
        orderModalVisible &&
        (
          <Modal onClick={handleCloseOrderModal}>            
            <OrderDetails orderNumber={123}  />
          </Modal>
        )
      }

    </div>)    
}

export default BurgerConstructor;