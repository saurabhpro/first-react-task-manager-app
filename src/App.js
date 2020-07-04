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
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProject from "./components/project/AddProject";

import { Provider } from "react-redux";
import appStore from "./store/store";
import UpdateProject from "./components/project/UpdateProject";
import NotFoundPage from "./components/not-found/NotFoundPage";
import ProjectBoard from "./components/project-board/ProjectBoard";

library.add(faCheckSquare, faCoffee, faEdit, faMinus);

function App() {
  return (
    <Provider store={appStore}>
      {
        //provide actualy connects react with redux and we are providing it a store
      }
      <Router>
        <div className="App">
          <h1>Welcome to Saurabh's First React App</h1>
          <Header />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addProject" component={AddProject} />
            <Route exact path="/updateProject/:id" component={UpdateProject} />
            <Route exact path="/projectBoard/:id" component={ProjectBoard} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
