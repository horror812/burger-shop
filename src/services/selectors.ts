import { IStore } from "./store";

export const getLoadIngredientsState = (store:IStore) => store.loadIngredients;
export const getConstructorBurgerState = (store:IStore) => store.constructorBurger;
export const getUserState = (store:IStore) => store.user;
export const getPostOrderState = (store:IStore) => store.postOrder;
export const getOrdersState = (store:IStore) => store.orders;