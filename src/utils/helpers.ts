import { EIngredientType, EThunkStatus, IIngredient } from "./types"
import {differenceInDays, isSameDay, format, subDays} from 'date-fns';

// useful utils 

export function isThunkLoading(status:EThunkStatus, isRequestOnly?:boolean) {
    return isRequestOnly ? status === EThunkStatus.REQUEST : status === EThunkStatus.REQUEST || status === EThunkStatus.UNDEFINED;
}

// HELPERS: 

type TRefObject = React.RefObject<HTMLDivElement>;

// helpers for ingredients \\

export const filterIngredientsByType = (ingredients:IIngredient[], type:EIngredientType)=> {
    return ingredients.filter((item: IIngredient) => item.type === type);
}

// поменять на массив of Refs?
// возвращает index of Tab
export const calcScrollIndex = (scrollRef:TRefObject, bunsRef:TRefObject, saucesRef:TRefObject, mainRef:TRefObject) => {
    const scrollPos = scrollRef?.current?.getBoundingClientRect().top as number;
    const bunsPos = bunsRef.current?.getBoundingClientRect().top as number;
    const saucesPos = saucesRef.current?.getBoundingClientRect().top as number;
    const mainPos = mainRef.current?.getBoundingClientRect().top as number;
    const bunsDist = Math.abs(scrollPos - bunsPos);
    const saucesDist = Math.abs(scrollPos - saucesPos);
    const mainDist = Math.abs(scrollPos - mainPos);        
    if(bunsDist < saucesDist) {return 0; } // булки
    else if (saucesDist < mainDist) { return 1;}  // соусы         
    return 2; // начинка
}

// скролит к рефу
export const updateScrollByIndex = (index:number,  refs:TRefObject[]) => {
    const element = refs[index];          
    if (!element || !element.current) return false;  
    element?.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    return true;
}

//'created' | 'pending' | 'done'

// ru/style.color
export const statusValues:{[status:string]:[ru:string, style:{color?:string}]} = {
    'created' : ["Создан", {}],
    'pending' : ["Готовится", {}],
    'done' : ["Выполнен", {color : "#00CCCC"}],
    'def' : ["ХЗ!!", {color : "#CC0000"}],
}

export const formatStatusValue = (status: string) => {
    return statusValues[status] || statusValues['def'];      
}
  
export const formatDate = (strDate:string) => {
    const inputDate = new Date(strDate);
    const today = new Date();
    const yesterday = subDays(today, 1);  
    let result = '';
    if (isSameDay(inputDate, today)) {
      result = 'Сегодня';
    } else if (isSameDay(inputDate, yesterday)) {
      result = 'Вчера';
    } else if (differenceInDays(today, inputDate) <= 7) {
      const daysWord = differenceInDays(today, inputDate) <= 5 ? 'дня' : 'дней';
      result = `${differenceInDays(today, inputDate)} ${daysWord} назад`;
    } else {
      result = format(inputDate, 'dd.MM.yyyy')
    }
    result += `, ${format(inputDate, 'HH:mm')} i-${format(inputDate, 'O')}`;
    return result;
};

// все/стр-йдишки
export function calcTotalPrice(ingredients: IIngredient[], ingredientIds: string[]) {
    let totalPrice = 0;  
    ingredientIds.forEach((idIngredient) => {
        const ingredientInOrder = ingredients?.find((ingredient) => ingredient._id === idIngredient);
        return totalPrice = ingredientInOrder?.price
            ? ingredientInOrder.price + totalPrice
            : totalPrice;
    });
    return totalPrice;
}
 

   