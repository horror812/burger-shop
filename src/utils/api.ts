import { IOrder } from "./types";


const API_URL_GET_INGREDIENTS = "https://norma.nomoreparties.space/api/ingredients"
const API_URL_POST_ORDER ='https://norma.nomoreparties.space/api/orders';


export const getIngredients = async () => {
    const res = await fetch(API_URL_GET_INGREDIENTS)
      .then(res => {
        if (res.ok) { return res.json(); }
        return Promise.reject("Error in getIngredients " + res.status);
      });
    return res;
}

export const postOrder = async (order:IOrder)=> {
  const res = await fetch(API_URL_POST_ORDER,{
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  })
  return res;
}


 