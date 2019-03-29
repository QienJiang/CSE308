import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Map from './components/Map';
import SignUp from './loginpage/SignUp';
import SignIn from './loginpage/SignIn';
import Guest from './loginpage/Guest';
import home from './home';


class App extends Component {
  render() {
    return (
      <Router basename="/homepage">
      <div className="App">
      <div className="Map">
      <Map/>
      </div>

      <div className="App__Form" >

      <div className="PageSwitcher">
      <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
      <NavLink exact to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
      <NavLink exact to="/Guest" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Guest</NavLink>
      </div>

      <Route exact path="/sign-up" component={SignUp}>
      </Route>
      <Route path="/sign-in" component={SignIn}>
      </Route>
      <Route exact path="/Guest" component={Guest}>
      </Route>
      <Route exact path="/home" component={home}>
      </Route>
      </div>


        </div>
      </Router>
    );
  }
}

export default App;
