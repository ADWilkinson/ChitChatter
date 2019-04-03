import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import SignupPage from '../pages/SignupPage';

export default props => (
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/signup" component={SignupPage} />
      <Route exact path="/login" component={LoginPage} />
    </Switch>
  </Router>
);
