import React from "react";
import { Route, Redirect } from "react-router-dom";

let Authentication = localStorage.getItem("token");

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogin = () => {
    if (Authentication) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
