import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import UserInfo from "./components/userInfo";
import PrivateRoute from "./PrivateRoute";
import Start from "./components/start";
import Choice from "./components/Choice";
import GeneralKnowledge from "./components/pages/General";
import Result from "./components/pages/Result";
import Logout from "./layouts/Logout";
import Profile from "./components/Profile";
import PublicRoute from "./PublicRoute";
import FIleupload from "./components/FIleupload";
import HistoryPage from './components/pages/History';
import Calculating from './components/pages/Calculate';
import SciencePage from './components/pages/Science';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <PublicRoute exact path="/register" component={Register} />
          <Route restricted={true} exact path="/login" component={Login}/>
          <Route exact path="/login" restricted={true} component={Login} />
          <PublicRoute exact path="/logout" component={Logout} />
          <PublicRoute exact path="/file" component={FIleupload} />
          <PublicRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/userinfo" component={UserInfo} />
          <Route exact path="/start" component={Start} />
          <Route exact path ="/choice" component={Choice} />
          <Route exact path="/general" component={GeneralKnowledge} />
          <Route exact path="/history" component={HistoryPage}/>
          <Route exact path="/calculate" component={Calculating}/>
          <Route exact path="/science" component={SciencePage}/>
          <Route exact path="/result" component={Result} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
