import React, { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Book from "./components/Book/Book";
import Header from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import PrivetRoute from "./components/PrivetRoute/PrivetRoute";

export const userContext = createContext({});

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <Router>
      <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Toaster />
        <Header />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivetRoute path="/book/:bedType">
            <Book />
          </PrivetRoute>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </userContext.Provider>
    </Router>
  );
}

export default App;
