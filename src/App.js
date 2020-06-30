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

import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./components/project/AddProject";

import { Provider } from "react-redux";
import appStore from "./store";

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
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/addProject" component={AddProject} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
