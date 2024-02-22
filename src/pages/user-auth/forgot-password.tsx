import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordRequest } from "../../utils/api";
import { TPostForgotData } from "../../utils/types";
import ForgotPasswordForm from "../../components/user-auth/forgot-password";

const ForgotPasswordPage:FC = () => {

  // cnst's

  const navigate = useNavigate();

  // cb's 

  const handleEmailConfirm = useCallback((data:TPostForgotData) => {    
    // заменить на thunk? dispatch(forgotPasswordThunk({...})); 
    forgotPasswordRequest(data)
    .then((res) => {
      if (res.success) {
        navigate('/reset-password', { replace: true, state: true });
      }
    }).catch(()=>{
      console.log("forgot-pass: что-то не так!")
    });
  },[navigate])

  // comp
  return <ForgotPasswordForm onSubmit={handleEmailConfirm} />;
};

export default ForgotPasswordPage;