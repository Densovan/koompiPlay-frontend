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
import Result from "./components/pages/Results/Result";
import Logout from "./layouts/Logout";
import Profile from "./components/Profile";
import PublicRoute from "./PublicRoute";
import FIleupload from "./components/FIleupload";
import PublicResult from "./components/PublicResult";
import HistoryPage from "./components/pages/History";
import Calculating from "./components/pages/Calculate";
import SciencePage from "./components/pages/Science";
import GeneralResult from "./components/pages/Results/GerneralResult";
import HistoryResult from "./components/pages/Results/HistoryResult";
import ScienceResult from "./components/pages/Results/ScienceResult";
import PublicResul from "./components/pages/Results/PublicResult";
import Animation from "./components/test/Animation";
import Transaction from "./components/zeetomic/Transaction";
import Send from "./components/zeetomic/Send";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <PublicRoute exact path="/register" component={Register} />
          {/* <Route
            restricted={true}
            exact
            path="/login"
            component={Login}
          /> */}

          <Route exact path="/login" restricted={true} component={Login} />
          <PublicRoute exact path="/logout" component={Logout} />
          <PublicRoute exact path="/file" component={FIleupload} />
          <PublicRoute exact path="/public" component={PublicResult} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/result" component={Result} />
          <PublicRoute exact path="/profile" component={Profile} />
          <PublicRoute exact path="/a" component={Animation} />
          <PrivateRoute exact path="/start" component={Start} />
          <PrivateRoute exact path="/" component={Choice} />
          <PrivateRoute exact path="/general" component={GeneralKnowledge} />
          <PrivateRoute exact path="/history" component={HistoryPage} />
          <PrivateRoute exact path="/calculate" component={Calculating} />
          <PrivateRoute exact path="/science" component={SciencePage} />
          <PrivateRoute exact path="/result" component={Result} />
          <PrivateRoute
            exact
            path="/general-result"
            component={GeneralResult}
          />
          <PrivateRoute
            exact
            path="/history-result"
            component={HistoryResult}
          />
          <PrivateRoute
            exact
            path="/science-result"
            component={ScienceResult}
          />
          <PrivateRoute exact path="/send" component={Send} />
          <PrivateRoute exact path="/transaction" component={Transaction} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
