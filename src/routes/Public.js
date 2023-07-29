import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Public = ({ children }) => {
  const {token} = useSelector(state=>state.authReducer)

  if (token) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default Public;
