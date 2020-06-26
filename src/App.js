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
          {/* <PrivateRoute exact path="/userinfo" component={UserInfo} /> */}
          {/* <PrivateRoute exact path="/" component={Start} /> */}
          {/* <PrivateRoute exact path="/quiz" component={Play} /> */}
          <PrivateRoute exact path="/result" component={Result} />
          {/* <Route exact path="/pri" component={PrivateRoute}/> */}
          {/* <PrivateRoute exact path="/file" component={FIleupload} /> */}
          {/* 
          <PublicRoute exact path="/start" component={Start}/>
          <Route exact path="/start" component={Start}/>
          <Route exact path="/quiz" component={Play}/>
          <Route exact path="/result" component={Result}/> */}
          {/* <Route restricted={true} exact path="/login" component={Login}/>
          <Route exact path="/login" restricted={true} component={Login} /> */}
          {/* <PublicRoute exact path="/logout" component={Logout} /> */}
          {/* <PublicRoute exact path="/file" component={FIleupload} /> */}
          <PublicRoute exact path="/profile" component={Profile} />
          {/* <PrivateRoute exact path="/userinfo" component={UserInfo} /> */}
          <Route exact path="/start" component={Start} />
          <Route exact path="/" component={Choice} />
          <Route exact path="/general" component={GeneralKnowledge} />
          <Route exact path="/history" component={HistoryPage} />
          <Route exact path="/calculate" component={Calculating} />
          <Route exact path="/science" component={SciencePage} />
          <Route exact path="/result" component={Result} />
          <Route exact path="/general-result" component={GeneralResult} />
          <Route exact path="/history-result" component={HistoryResult} />
          <Route exact path="/science-result" component={ScienceResult} />
          <Route exact path="pu" component={PublicResul} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
