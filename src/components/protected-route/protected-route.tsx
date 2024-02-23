import { getUserState } from "../../services/selectors";
import { FC, ReactElement } from "react";
import {  Navigate, useLocation} from "react-router-dom";
import { useStoreSelector } from "../../services/store";

type ProtectedRouteProps = {
    authorized?:boolean;
    children:ReactElement;
}

const ProtectedRoute:FC<ProtectedRouteProps> = ({ children, authorized }) => {
    const { isAuth } = useStoreSelector(getUserState); 
    const location = useLocation();
    const from = location.state?.from || '/';

    if (!authorized && isAuth) { 
        return <Navigate to={ from } />; 
    }

    if (authorized && !isAuth) { 
        return <Navigate to="/login" state={{ from: location}}/>; 
    }
    return children;    
};

export default ProtectedRoute;