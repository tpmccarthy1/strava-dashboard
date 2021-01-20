import React from "react";
import "./App.css";
import WorkoutGrid from "./components/dashboard/workout-grid";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/about";
import WorkoutDetail from "./components/dashboard/workout-detail";
import Nav from "./components/nav";
import { Container } from "./container";



const AuthenticatedApp = () => {
  const renderWorkout = (routerProps: any) => {
    const workoutId = parseInt(routerProps.match.params.id);
    return <WorkoutDetail id={workoutId} />;
  };

  return (
    <Router>
      <Nav authenticated={true} />
      <Container>
          <Switch>
            <Route exact path="/workouts" component={WorkoutGrid}></Route>
            <Route exact path="/" component={WorkoutGrid}></Route>
            <Route exact path="/about" component={About}></Route>
            <Route
              path="/workouts/:id"
              render={(routerProps) => renderWorkout(routerProps)}
            ></Route>
          </Switch>
      </Container>
    </Router>
  );
};

export default AuthenticatedApp;
