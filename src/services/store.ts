import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import loadIngredientsSlice, { ILoadIngredientsState } from './load-ingredients';
import constructorBurgerSlice, { IConstructorBurgerState } from './constructor-burger';
import postOrderSlice, { IPostOrderState } from './post-order';
import activeSlice, { IActiveState } from './active';

export const rootReducer = combineReducers({
    loadIngredients: loadIngredientsSlice.reducer,
    constructorBurger: constructorBurgerSlice.reducer,
    postOrder: postOrderSlice.reducer, 
    active : activeSlice.reducer
});

export interface IStore {
    loadIngredients:ILoadIngredientsState;
    constructorBurger:IConstructorBurgerState;
    postOrder:IPostOrderState;
    active:IActiveState;
}

export const store = configureStore({
  reducer: rootReducer,
  // devTools: true
})

export type StoreDispatch = typeof store.dispatch;
export type StoreRootState = ReturnType<typeof store.getState>;

export const useStoreDispatch = () => useDispatch<StoreDispatch>();
export const useStoreSelector: TypedUseSelectorHook<StoreRootState> = useSelector;