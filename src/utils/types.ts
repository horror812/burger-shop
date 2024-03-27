import { PayloadAction } from "@reduxjs/toolkit";
import { ActionCreatorWithOptionalPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';

interface IResponse {
    success?: boolean;
}

// ingredients \\ 

export enum EIngredientType {
    BUN = 'bun',
    MAIN = 'main',
    SOUCE = 'sauce'
}

export interface IIngredient {    
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
    // for active: 
    dragId?: string; // use for drag ?
    uid?: string; // + unique_id
}

export type TPostIngredientsData = {
    ingredients: string[];
};

export type TLoginData = {
    email: string;
    password: string;
};

export type TRegisterData = {
    name: string;
    email: string;
    password: string;
}; 

export type TUpdateUserData = {
    name: string;
    email: string;
    password?: string;
};

export type TPostForgotData = {
    email: string;
};

export type TPostResetPasswordData = {
    password: string;
    token: string;
};


// \\

export enum EThunkStatus {
    REQUEST = 'request', // LOADING
    SUCCESS = 'success', 
    ACCEPTED = 'accepted',  // after success->dispatch(accept)->accepted
    FAILED = 'failed',
    UNDEFINED = 'undefined' // on init
}

// action-types \\

export interface INumberAction extends PayloadAction<number> {}
export interface INullOrNumberAction extends PayloadAction<number | null> {}

export interface IIngredientAction extends PayloadAction<IIngredient> {}
export interface IIdOrIngredientAction extends PayloadAction<IIngredient | string | null> {}
export interface INullOrIngredientAction extends PayloadAction<IIngredient | null> {}

export interface ISortAction extends PayloadAction<{ hoverIndex: number, dragIndex: number }> {}

export interface ILoadIngredientsResponse extends IResponse {
    data?: IIngredient[]
} 
export interface ILoadIngredientsAction extends PayloadAction<ILoadIngredientsResponse> {}

export interface IPostOrderResponse extends IResponse {
    name?: string;
    order?: { number: number };
} 
export interface IPostOrderAction extends PayloadAction<IPostOrderResponse> {}

export interface IUserData {
    email?: string; 
    name?: string;
}
export interface IUserResponse extends IResponse {
    user?: IUserData
}
export interface IUserAction extends PayloadAction<IUserResponse> {}

export interface IUserAuthResponse extends IUserResponse {
    accessToken?: string;
    refreshToken?: string;
}
export interface IUserAuthAction extends PayloadAction<IUserAuthResponse> {}

export type wsActions = {
    connect: ActionCreatorWithPayload<wsPayloadConnect>;
    disconnect: ActionCreatorWithOptionalPayload<string | undefined>;
    connecting: ActionCreatorWithOptionalPayload<string | undefined>;
    open: ActionCreatorWithOptionalPayload<string | undefined>;
    close: ActionCreatorWithOptionalPayload<string | undefined>;
    error: ActionCreatorWithOptionalPayload<string | undefined>;
    message: ActionCreatorWithPayload<IOrderList>;
};

export type wsPayloadConnect = {
    url: string;
    withTokenRefresh: boolean
};

export interface IOrder {
    _id: string;
    ingredients: string[];
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
}  

export interface IOrderList extends IResponse {
    orders: IOrder[];
    total: number;
    totalToday: number;
}  
