import { type JSX } from "react";
import { Navigate } from "react-router-dom";

// if user loggedin chaina bhane home page ma janu mildaina

interface AuthGuardProps { 
    children: JSX.Element; 
}

const AuthGuard = ({ children }: AuthGuardProps) => {   
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('currentUser');

    if(!token || !user) {  //token & user dubai cha bhane login page ma return
        return <Navigate to="/login" replace />;
    } else { // token & user dubai chaina bhane children return 
        return children;
    }
};

export default AuthGuard;