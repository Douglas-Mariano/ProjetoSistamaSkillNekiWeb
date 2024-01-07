import React from "react";
import { Navigate, Route, useLocation } from "react-router-dom";

const PrivateRoute = ({ element, ...props }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const location = useLocation();

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
};

export default PrivateRoute;
