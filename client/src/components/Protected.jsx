import React from "react";
import { Navigate } from "react-router-dom";
const Protected = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return (
      <Navigate
        to={{
          pathname: "/",
        }}
      />
    );
  }
  return children;
};
export default Protected;
