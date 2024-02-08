import { IngredientIds } from "./types";

const API_URL = 'https://norma.nomoreparties.space/api'

const checkResponse = (res:Response) => {
  return res.ok ? res.json() : Promise.reject('Connection has failed');
};

/* при этой записи vscode рекомендует доавить async
const request = (url:RequestInfo, options?:RequestInit) => {
  return fetch(url, options).then(checkResponse);
};*/

const request = async(url: RequestInfo, options?: RequestInit) => {
  const res = await fetch(url, options);
  return checkResponse(res);
};

export const getIngredients = async () => {
  const res = await request(API_URL+'/ingredients'); 
  return res;
};

export const postOrderIngredients = async (ingredients:IngredientIds)=> { 
  const res = await request(API_URL+'/orders',{
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients: ingredients })
  });
  return res;
};


 