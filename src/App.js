import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Menu from './containers/Menu/Menu';
import Hero from './containers/Hero/Hero';
import HomePage from './containers/HomePage/HomePage';
import Footer from './containers/Footer/Footer';
import AboutPage from './containers/AboutPage/AboutPage';
import ChartPage from './containers/ChartPage/ChartPage';
import LoginPage from './containers/LoginPage/LoginPage';
import SignupPage from './containers/SignupPage/SignupPage';

function App() {
  return (
    <Router>
      <Menu/>
      <Hero/>
      <div className="mainContent">
        <Switch>
          <Route path="/about">
            <AboutPage/>
          </Route>
          <Route path="/charts">
            <ChartPage/>
          </Route>
          <Route path="/login">
            <LoginPage/>
          </Route>
          <Route path="/signup">
            <SignupPage/>
          </Route>
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
