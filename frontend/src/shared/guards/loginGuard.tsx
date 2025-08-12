import { type JSX } from "react";
import { Navigate } from "react-router-dom";

// if browser ko url bata home bata login ki register ma janu chan bhane request block gardincha ra home nai display huncha 

interface LoginGuardProps {  //login guard bhitra kasto data aoocha bhanera guard banakko 
    children: JSX.Element; //(children aoocha login guard bhitra)
}

const LoginGuard = ({ children }: LoginGuardProps) => {   //LoginGuard bhanera function declare jun kobhitra children aoocha
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('currentUser');

    if(token && user) {  //token & user dubai cha bhane home page ma return
        return <Navigate to="/home" replace />;
    } else { // token & user dubai chaina bhane children return 
        return children;
    }
};

export default LoginGuard;