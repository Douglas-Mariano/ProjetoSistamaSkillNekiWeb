import React from "react";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ element, ...props }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: props.location.pathname }} />
  );
};

export default PrivateRoute;
