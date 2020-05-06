import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import UserInfo from "./components/userInfo";
import PrivateRoute from "./PrivateRoute";
import Profile from "./components/Profile";
// import QuizState from "./Context/QuizState";
// import QuizGame from "./components/pages/QuizGame";

function App() {
  return (
    // <QuizState>
    <React.Fragment>
      <Router>
        <Switch>
          <PrivateRoute path="/userinfo" component={UserInfo} />
          {/* <Route path="/" exact component={Profile} /> */}
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </React.Fragment>
    // </QuizState>
  );
}

export default App;
