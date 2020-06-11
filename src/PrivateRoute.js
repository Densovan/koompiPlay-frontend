import React from "react";
import * as firebaseui from "firebaseui";
import { Route, Redirect } from "react-router-dom";

let token = localStorage.getItem("token");
// let remember = localStorage.getItem("firebaseui::rememberedAccounts");

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogin = () => {
    if (token) {
      // fetch("http://52.221.199.235:9000/")
      // .then(res=> res.text())
      // .then(data => console.log(data))
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
    /*{ <Route
      {...rest}
      render={(props) =>
        isLogin() ? <h1>Login success</h1>: <Redirect to="/login" />
    }/> }*/
  );
};

export default PrivateRoute;
