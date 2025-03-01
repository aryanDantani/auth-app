import { Navigate } from "react-router-dom";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login-admin" />;
};

export default ProtectedRoute;
