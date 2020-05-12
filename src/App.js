import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import UserInfo from "./components/userInfo";
import PrivateRoute from "./PrivateRoute";
import Start from "./components/start";
import Play from "./components/pages/Play";
import Result from "./components/pages/Result";
import Logout from "./layouts/Logout";
import profile from "./components/Profile";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <PrivateRoute exact path="/" component={UserInfo} />
          <PrivateRoute exact path="/start" component={Start} />
          <PrivateRoute exact path="/quiz" component={Play} />
          <PrivateRoute exact path="/result" component={Result} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
