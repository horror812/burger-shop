import { useSelector } from "react-redux";
import { getUserState } from "../../services/selectors";
import { FC, ReactNode } from "react";

type ProtectedRouteProps = {
    authorized?:boolean;
    children:ReactNode;
}

const ProtectedRoute:FC<ProtectedRouteProps> = ({ children, authorized }) => {
    const { isAuth } = useSelector(getUserState); 
    if ((isAuth && authorized) || (!isAuth && !authorized)){
        return children
    }
    // redirect or 404?
    return <>Что-то не так?</>
};

export default ProtectedRoute;