import { getLocalStorageItem } from "./storage";
import { TLoginData, TPostIngredientsData, TRegisterData, TUpdateUserData } from "./types";

// helpers \\

const checkResponse = (res:Response) => {return res.ok ? res.json() : Promise.reject('Connection has failed!');};
const request = (url:RequestInfo, options?:RequestInit) => { return fetch(url, options).then(checkResponse);};

// api \\

const API_URL = 'https://norma.nomoreparties.space/api'

const apiRequest = (url:RequestInfo, options?:RequestInit)=>{
    return request(API_URL+url, options)
}

// ingredients \\

export const getIngredients = async () => {
  const res = await apiRequest('/ingredients'); 
  return res;
};

// post-order \\

export const postOrderIngredients = async (postData:TPostIngredientsData)=> { 
  const res = await apiRequest('/orders',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getLocalStorageItem('accessToken') || ''
    },
    body: JSON.stringify(postData)
  });
  return res;
};

// user reg/log=in/log-out \\

export const registerRequest = async (userData: TRegisterData) => {
  return await apiRequest('/auth/register', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(userData)
  });
}

export const loginRequest = async (userData: TLoginData) => {
  return await apiRequest('/auth/login', {
      method: 'POST',
      headers: {'Content-type': 'application/json' },
      body: JSON.stringify(userData)
  });
}

export const logoutRequest = async () => {
  return await apiRequest('/auth/logout', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({ 
        token: getLocalStorageItem('refreshToken')      
      })
  });
}

// user-profile get/update \\

export const getUserRequest = async () => {
  return await apiRequest('/auth/user', {
      method: 'GET',
      headers: {
          'Content-type': 'application/json',
          'Authorization': getLocalStorageItem('accessToken') || ''
      }
  });
}

export const updateUserRequest = async (userData: TUpdateUserData) => {
  return await apiRequest('/auth/user', {
      method: 'PATCH',
      headers: {
          'Content-type': 'application/json',
          'Authorization': getLocalStorageItem('accessToken') || ''
      },
      body: JSON.stringify(userData)
  });
}