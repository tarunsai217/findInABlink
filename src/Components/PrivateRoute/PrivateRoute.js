import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  // If the user is authenticated, render the protected component
  // Otherwise, redirect them to the login page or any other route
  const userGoogleAuth = useSelector((state) => state.user.googleResponse);
  const isAuthenticated = userGoogleAuth ? true : false;

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
