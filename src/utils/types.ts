
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
    uid?: number; // + unique_id
}

export enum EOrderStatus { 
    CREATED = 'created', 
    PENDING = 'pending', 
    DONE = 'done' 
}

export interface IOrderOwner {
    name: string; 
    email: string; 
    createdAt: string;
    updatedAt: string;
}

export interface IOrder {
    ingredients: IIngredient[];
    _id: string;
    name: string;
    status: EOrderStatus;
    number: number;    
    price: number;    
    createdAt: string;
    updatedAt: string;
    owner: IOrderOwner;    
}