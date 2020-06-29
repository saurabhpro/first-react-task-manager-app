import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/Header";

function App() {
  return (
    <div className="App">
      <h1>Welcome to Saurabh's First React App</h1>
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
