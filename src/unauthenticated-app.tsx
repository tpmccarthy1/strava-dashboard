import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import About from "./components/about";
import Nav from "./components/nav";
import LoginCallback from "./components/auth/login-callback";
import Login from "./components/auth/login";
import { Container } from "./container";

const UnauthenticatedApp = () => {
  return (
    <Router>
      <Nav authenticated={false}/>
      <Container>
        <div>
          <Switch>
            <Route exact path="/about" component={About}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/oauth_callback" component={LoginCallback}></Route>
          </Switch>
        </div>
        Unauthenticated
      </Container>
    </Router>
  );
};

export default UnauthenticatedApp;
