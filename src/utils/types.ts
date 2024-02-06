import { PayloadAction } from "@reduxjs/toolkit";

// ingredients \\ 

export enum EIngredientType {
    BUN = 'bun',
    MAIN = 'main',
    SOUCE = 'sauce'
}

export interface IIngredient {
    dragId?: string;
    _id: string;
    name: string;
    type: EIngredientType;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;

    uid?: string; // + unique_id
}

export type IngredientIds = string[];

// \\

export enum EThunkStatus {
    REQUEST = 'request', // LOADING
    SUCCESS = 'success', 
    FAILED = 'failed',
    UNDEFINED = 'undefined'
}

// action-types \\

export interface INumberAction extends PayloadAction<number> {}
export interface INullOrNumberAction extends PayloadAction<number|null> {}

export interface IIngredientAction extends PayloadAction<IIngredient> {}
export interface IIdOrIngredientAction extends PayloadAction<IIngredient|string|null> {}
export interface INullOrIngredientAction extends PayloadAction<IIngredient|null> {}

export interface ILoadIngredientsData {success?: boolean, data?:IIngredient[]} 
export interface ILoadIngredientsAction extends PayloadAction<ILoadIngredientsData> {}

export interface IPostOrderData {success?: boolean, name?:string, order?:{number:number}} 
export interface IPostOrderAction extends PayloadAction<IPostOrderData>{}
