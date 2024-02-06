import { IStore } from "./store";

export const getLoadIngredientsState = (store:IStore) => store.loadIngredients;
export const getConstructorBurgerState = (store:IStore) => store.constructorBurger;
export const getOrderState = (store:IStore) => store.postOrder;
export const getActiveState = (store:IStore) => store.active;
