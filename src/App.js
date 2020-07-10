import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Router - component wraps our main application routing and has Route as its child
 * Route - components, which will point to all other URLs
 * Switch - exectly one path can be taken by route matchers {@see https://medium.com/@jenniferdobak/react-router-vs-switch-components-2af3a9fc72e}
 * */
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/** *
 * Provider - This makes the Redux store available to any nested components that have been wrapped in the connect() function.
 *            Since any React component in a React Redux app can be connected,
 * most applications will render a <Provider> at the top level, with the entire app’s component tree inside of it.
 */
import { Provider } from "react-redux";

//custom impls for store and jwt
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import appStore from "./store/store";
import jwt_decode from "jwt-decode";
import SetJWTToken from "./security-untils/SetJWTToken";
import SecuredRoute from "./security-untils/SecuredRoute";

/**
 *  moment.js for out date time needs
 * */
import moment from "moment";

/**
 * Custom object we created and exported
 * */
import Dashboard from "./components/Dashboard";
import Header from "./components/layout/Header";
import AddProject from "./components/project/AddProject";
import UpdateProject from "./components/project/UpdateProject";
import NotFoundPage from "./components/not-found/NotFoundPage";
import ProjectBoard from "./components/project-board/ProjectBoard";
import AddProjectTask from "./components/project-board/project-task/AddProjectTask";
import UpdateProjectTask from "./components/project-board/project-task/UpdateProjectTask";
import Landing from "./components/layout/Landing";
import Login from "./components/user-management/Login";
import Register from "./components/user-management/Register";

/**
 * Libraries For Fontawesome
 * */
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
console.log("JWT Token - " + jwtToken);
if (jwtToken) {
  SetJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  console.log("User- " + decoded_jwtToken);

  appStore.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  const currentTime = moment().unix();
  // exp is expiration time
  if (decoded_jwtToken.exp < currentTime) {
    console.log("JWT Token expired - logging out...");

    //handle logout
    appStore.dispatch(logout());

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
            <SecuredRoute exact path="/dashboard" component={Dashboard} />
            <SecuredRoute exact path="/addProject" component={AddProject} />
            <SecuredRoute
              exact
              path="/updateProject/:id"
              component={UpdateProject}
            />
            <SecuredRoute
              exact
              path="/projectBoard/:id"
              component={ProjectBoard}
            />
            <SecuredRoute
              exact
              path="/addProjectTask/:id"
              component={AddProjectTask}
            />
            <SecuredRoute
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
