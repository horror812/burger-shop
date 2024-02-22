import {  FC,  useCallback } from "react";
import {  useNavigate } from "react-router-dom";
import { resetPasswordRequest } from "../../utils/api";
import { TPostResetPasswordData } from "../../utils/types";
import ResetPasswordForm from "../../components/user-auth/reset-password";

const ResetPasswordPage:FC = () => {

   // cnst's

  const navigate = useNavigate(); 

  const handleReset = useCallback((resetData:TPostResetPasswordData) => {
    // заменить на thunk? dispatch(resetPassworThunk({...}));     
    resetPasswordRequest(resetData)
     .then((res) => {
       if (res.success) {
         navigate('/login', { replace: true, state: true });
       }
     }).catch(()=>{
        console.log("reset-pass: что-то не так!")
     });
  },[navigate])   

  // comp
  return (<ResetPasswordForm onSubmit={handleReset} />);
};

export default ResetPasswordPage;