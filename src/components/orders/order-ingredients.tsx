
import styles from "./order-ingredients.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {FC} from "react";
import { IIngredient } from "../../utils/types";

type TOrderIngredients = {
    ingredients: IIngredient[];
    ingredientsIds: string[];
};

export const OrderIngredients:FC<TOrderIngredients> = ({ingredients: cards, ingredientsIds: card}) => {
    const ingredientsInOrder = cards.filter((item) => card.includes(item._id));

    return (
        <>
            {ingredientsInOrder.map((ingredient) => {
                const ingredientsQuantity = card.filter(ingredients => ingredients === ingredient._id).length;
                return (
                <div className={styles.order_ingredient + " mt-6"} key={ingredient._id}>
                    <div className={styles.ingredient_details_in_order}>
                        <img
                            src={ingredient.image}
                            alt={ingredient.name}
                            className={styles.order_ingredient_image}
                        />
                        <p className="text text_type_main-small ml-4">
                            {ingredient.name}
                        </p>
                    </div>
                    <div className={styles.ingredient_details_in_order + " mr-6"}>
                        <p className="text text_type_digits-default mr-2">
                            {ingredientsQuantity} x {ingredient.price}
                        </p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
                )
            })}
        </>
    );
};

export default OrderIngredients;