

export const getLocalStorageItem = (key:string) => {
    return localStorage.getItem(key);
}
  
export const setLocalStorageItem = (key:string, value?:string) => {
    if (value == null || value == undefined){
        return localStorage.removeItem(key);
    }
    return localStorage.setItem(key, value);
}
  
export const removeLocalStorageItem = (key:string) => {
    return localStorage.removeItem(key);
}