import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/Header";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faEdit,
  faBackward,
  faTasks,
  faPlusSquare,
  faMinusSquare,
  faUserCircle,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProject from "./components/project/AddProject";

import { Provider } from "react-redux";
import appStore from "./store/store";
import UpdateProject from "./components/project/UpdateProject";
import NotFoundPage from "./components/not-found/NotFoundPage";
import ProjectBoard from "./components/project-board/ProjectBoard";
import AddProjectTask from "./components/project-board/project-task/AddProjectTask";
import UpdateProjectTask from "./components/project-board/project-task/UpdateProjectTask";
import Landing from "./components/layout/Landing";
import Login from "./components/user-management/Login";
import Register from "./components/user-management/Register";

import store from "./store/store";
import jwt_decode from "jwt-decode";
import SetJWTToken from "./security-untils/SetJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";

import moment from "moment";

//font awesome icons available globally for this project
library.add(
  faCheckSquare,
  faCoffee,
  faEdit,
  faMinusSquare,
  faPlusSquare,
  faBackward,
  faTasks,
  faUserCircle,
  faProjectDiagram
);

/**
 * Usually when you reload a browser the redux state is cleaned
 * we still have the token in local stoarge - so lets use it
 */
const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  SetJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  const currentTime = moment().unix();
  // exp is expiration time
  if (decoded_jwtToken.exp < currentTime) {
    console.log("JWT Token expired - logging out...");

    //handle logout
    store.dispatch(logout());

    //redirect to
    window.location.href = "/";
  }
}

/**
 * Main App class
 */
function App() {
  return (
    <Provider store={appStore}>
      {
        //provide actualy connects react with redux and we are providing it a store
      }
      <Router>
        <div className="App">
          {
            //<h1>Welcome to Saurabh's First React App</h1>
          }
          <Header />
          <Switch>
            {
              //public routes
            }
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {
              //private routes
            }
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addProject" component={AddProject} />
            <Route exact path="/updateProject/:id" component={UpdateProject} />
            <Route exact path="/projectBoard/:id" component={ProjectBoard} />
            <Route
              exact
              path="/addProjectTask/:id"
              component={AddProjectTask}
            />
            <Route
              exact
              path="/updateProjectTask/:backlogId/:projectTaskId"
              component={UpdateProjectTask}
            />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
