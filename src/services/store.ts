import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';

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