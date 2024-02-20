import { setLocalStorageItem, getLocalStorageItem } from "./storage";
import { IUserResponse, IUserAuthResponse, TLoginData, TPostIngredientsData, TRegisterData, TUpdateUserData, TPostForgotData,TPostResetPasswordData } from "./types";

const API_URL = 'https://norma.nomoreparties.space/api';

// helpers \\

const checkResponse = (res:Response) => {return res.ok ? res.json() : Promise.reject('Connection has failed!');};
const request = (url:RequestInfo, options?:RequestInit) => { return fetch(url, options).then(checkResponse);};

const BEARER = ''; // 'Bearer ';
//const formatBearer = (str:string)=>{
//  return (str && str.indexOf(BEARER) === 0) ? str.split(BEARER)[1] : str
//}

// api \\

const fetchRequest = (seqUrl:RequestInfo, options?:RequestInit)=>{
    return request(API_URL+seqUrl, options)
};

const refreshTokenRequest = () => {
  return fetchRequest('/auth/token', {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8",},
    body: JSON.stringify({
      token: getLocalStorageItem('refreshToken') ,
    }),
  })
  .then((res) => {
    if (res.success) {
      setLocalStorageItem("refreshToken", res.refreshToken); 
      setLocalStorageItem("accessToken", res.accessToken);
      return res as IUserAuthResponse;     
    }
    return Promise.reject(res);    
  });
};

const fetchRequestWithRefresh = async(seqUrl:RequestInfo, options:RequestInit) => {
  try {    
    const res = await fetchRequest(seqUrl, options);
    return res;
  } catch (err) {
    const e = err as Error;
    if (e.message === "jwt expired") {
      const refreshData = await refreshTokenRequest(); 
      if (options.headers && refreshData.accessToken) {
        const headers = options.headers as { [key: string]: string }
        headers['Authorization'] = BEARER + refreshData.accessToken;       
      }
      const res = await fetchRequest(seqUrl, options); 
      return res;
    } 
    return Promise.reject(err);    
  }
};

// ingredients \\

export const getIngredients = async () => {
  const res = await fetchRequest('/ingredients'); 
  return res;
};

// post-order \\

export const postOrderIngredients = async (postData:TPostIngredientsData)=> { 
  const res = await fetchRequest('/orders',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': BEARER + getLocalStorageItem('accessToken') || ''
    },
    body: JSON.stringify(postData)
  });
  return res;
};


// user reg/log=in/log-out \\

export const registerRequest = async (userData: TRegisterData) => {
  return await fetchRequest('/auth/register', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(userData)
  });
};

export const loginRequest = async (userData: TLoginData) => {
  return await fetchRequest('/auth/login', {
      method: 'POST',
      headers: {'Content-type': 'application/json' },
      body: JSON.stringify(userData)
  });
};

export const logoutRequest = async () => {
  return await fetchRequest('/auth/logout', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({ 
        token: getLocalStorageItem('refreshToken')      
      })
  });
};

export const forgotPasswordRequest = async (data:TPostForgotData) => {
  return fetchRequest('/password-reset',{
    method: 'POST',
    headers: {
         'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: data.email }),
  });
};

export const resetPasswordRequest = async (data:TPostResetPasswordData) => {
  return fetchRequest('/password-reset/reset',{
    method: 'POST',
    headers: {
         'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password: data.password, token: data.token,}),
  });
};

// user-profile get/update \\

export const getUserRequest = async () => {
  return await fetchRequestWithRefresh('/auth/user', {
      method: 'GET',
      headers: {
          'Content-type': 'application/json',
          'Authorization': BEARER + getLocalStorageItem('accessToken') || ''
      }
  }).then((res) => {    
    if (res.success) {return res as IUserResponse;}
    return Promise.reject(res);
  });  
};

export const updateUserRequest = async (userData: TUpdateUserData) => {
  return await fetchRequestWithRefresh('/auth/user', {
      method: 'PATCH',
      headers: {
          'Content-type': 'application/json',
          'Authorization': BEARER + getLocalStorageItem('accessToken') || ''
      },
      body: JSON.stringify(userData)
  }).then((res) => {
    if (res.success) {return res as IUserResponse;} 
    return Promise.reject(res);
  });
};