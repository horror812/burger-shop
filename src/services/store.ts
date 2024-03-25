import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import loadIngredientsSlice, { ILoadIngredientsState } from './load-ingredients';
import constructorBurgerSlice, { IConstructorBurgerState } from './constructor-burger';
import postOrderSlice, { IPostOrderState } from './post-order';
import userSlice, { IUserState } from './user';
import { socketMiddleware } from './socket-middleware';
import { wsOrderActions } from './orders';

export const rootReducer = combineReducers({
    loadIngredients: loadIngredientsSlice.reducer,
    constructorBurger: constructorBurgerSlice.reducer,
    postOrder: postOrderSlice.reducer, 
    user: userSlice.reducer
});

export interface IStore {
    loadIngredients: ILoadIngredientsState;
    constructorBurger: IConstructorBurgerState;
    postOrder: IPostOrderState;
    user: IUserState;
}

export const store = configureStore({
    // devTools: true,
    reducer: rootReducer,    
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware(wsOrderActions)),
})

export type StoreDispatch = typeof store.dispatch;
export type StoreRootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>

export const useStoreDispatch = () => useDispatch<StoreDispatch>();
export const useStoreSelector: TypedUseSelectorHook<StoreRootState> = useSelector;