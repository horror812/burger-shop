import { EIngredientType, EThunkStatus, IIngredient } from "./types"


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
