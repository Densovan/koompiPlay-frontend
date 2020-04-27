import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import UserInfo from "./components/userInfo";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/userinfo" component={UserInfo} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
