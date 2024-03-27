import {useLocation, useParams} from "react-router";
import {useEffect} from "react";
import styles from "./order-details.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import { useStoreDispatch, useStoreSelector } from "../../services/store";
import { wsOrdersActions } from "../../services/orders";
import { API_WSS_ALL_ORDERS, API_WSS_USER_ORDERS } from "../../utils/api";
import { calcTotalPrice  } from "../../utils/helpers";
import { getLoadIngredientsState, getOrdersState } from "../../services/selectors";
import OrderIngredients from "../../components/orders/order-ingredients";

export const OrderDetailsPage = () => {    
    
    const location = useLocation();
    const dispatch = useStoreDispatch();
    const {id} = useParams();
    const isBackground = (location.state && location.state.background) ? true : false;
    const {ingredients} = useStoreSelector(getLoadIngredientsState);
    const ordersState = useStoreSelector(getOrdersState);        
    const order = ordersState.data?.orders?.find((order) => order._id === id);

    useEffect(() => {
        if (location.pathname.startsWith('/profile') && !isBackground) {
            dispatch(wsOrdersActions.connect({
                url: API_WSS_USER_ORDERS,
                withTokenRefresh: true
            }))
        } else if ((location.pathname.startsWith('/orders')) && !isBackground) {
            dispatch(wsOrdersActions.connect({
                url: API_WSS_ALL_ORDERS,
                withTokenRefresh: false
            }))
        } else {
            return () => { dispatch(wsOrdersActions.disconnect())  }
        }
    }, [location.pathname, dispatch, isBackground]);

    return (
        <>
            {order &&
                <div className={styles.order_detail}>
                    <p className={styles.order_number + " text text_type_digits-default"}>
                        {`#${order.number}`}
                    </p>
                    <p className="text text_type_main-medium mt-10">
                        {order.name}
                    </p>
                    <p className={styles.status + " text text_type_main-small mt-3"}>
                        {order.status === "done" && "Выполнен"}
                        {order.status !== "done" && "В работе"}
                    </p>
                    <div>
                        <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
                        <div className={styles.scroll_ingredients}>
                            <OrderIngredients 
                            ingredients={ingredients} 
                            ingredientsIds={order.ingredients}/>
                        </div>
                    </div>
                    <div className={styles.order_info + " mt-10 mb-10"}>
                        <p className="text text_type_main-default text_color_inactive">
                            <FormattedDate date={new Date(order.createdAt)}/>
                        </p>
                        <div className={styles.price}>
                            <p className="text text_type_digits-default mr-2">
                                {calcTotalPrice(ingredients, order.ingredients)}
                            </p>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default OrderDetailsPage;