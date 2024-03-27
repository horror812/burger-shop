import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import loadIngredientsSlice, { ILoadIngredientsState } from './load-ingredients';
import constructorBurgerSlice, { IConstructorBurgerState } from './constructor-burger';
import postOrderSlice, { IPostOrderState } from './post-order';
import userSlice, { IUserState } from './user';
import ordersReducer,{ wsOrdersActions, IOrdersState } from './orders';
import { socketMiddleware } from './socket-middleware';

export const rootReducer = combineReducers({
    loadIngredients: loadIngredientsSlice.reducer,
    constructorBurger: constructorBurgerSlice.reducer,
    postOrder: postOrderSlice.reducer, 
    user: userSlice.reducer,
    orders: ordersReducer,
});

export interface IStore {
    loadIngredients: ILoadIngredientsState;
    constructorBurger: IConstructorBurgerState;
    postOrder: IPostOrderState;
    user: IUserState;
    orders:IOrdersState
}

export const store = configureStore({
    // devTools: true,
    reducer: rootReducer,    
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware(wsOrdersActions)),
})

export type StoreDispatch = typeof store.dispatch;
export type StoreRootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>

export const useStoreDispatch = () => useDispatch<StoreDispatch>();
export const useStoreSelector: TypedUseSelectorHook<StoreRootState> = useSelector;