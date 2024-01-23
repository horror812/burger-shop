
export type TIngredientItem = {
    dragId?: string;
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export type TOrderIds = {
    bun?: string, // _id
    ingredients?: string[] // _ids
}

export type TOrderItem = {
    bun?:TIngredientItem
    ingredients?:TIngredientItem[]
}