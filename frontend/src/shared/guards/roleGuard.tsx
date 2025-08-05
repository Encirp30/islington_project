import { type JSX } from "react";
import { Navigate } from "react-router-dom";

// if user loggedin chaina bhane home page ma janu mildaina

interface RoleGuardProps { 
    allowedRoles: string[];
    children: JSX.Element; 
}

const RoleGuard = ({ allowedRoles, children }: RoleGuardProps) => {   
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('currentUser')!);

    if(!token || !user) {  //token & user dubai cha bhane login page ma return
        return <Navigate to="/login" replace />;
    } 
    if(allowedRoles.includes(user.role)) {
        return <Navigate to="/notFound" replace />;
    }
        return children;
};

export default RoleGuard;