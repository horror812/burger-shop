import { useSelector } from "react-redux";
import { getUserState } from "../../services/selectors";
import { FC, ReactNode } from "react";
import {  Navigate, To} from "react-router-dom";

type ProtectedRouteProps = {
    authorized?:boolean;
    children:ReactNode;
    redirectTo?:To;
}

const ProtectedRoute:FC<ProtectedRouteProps> = ({ children, authorized, redirectTo }) => {
    const { isAuth } = useSelector(getUserState); 
    if ((isAuth && authorized) || (!isAuth && !authorized)){
        return children
    }
    if(redirectTo){ return <Navigate to ={redirectTo} /> }    
    //  login/mainPage
    return <Navigate to ={(!isAuth && authorized) ? "/login" : "/"}/>
    // return <Navigate to = {"*"}/> // 404
};

export default ProtectedRoute;