import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Map from './components/Map';
import SignUp from './loginpage/SignUp';
import SignIn from './loginpage/SignIn';
import Guest from './loginpage/Guest';
import Toggle from './loginpage/Toggle';
import home from './home';


class App extends Component {
  render() {
    return (
      <Router basename="/">
      <div className="App">

      <Map/>


      <div className="App__Form" >

      <Route exact path="/" component={SignUp} >
      </Route>

      <Route exact path="/sign-up" component={SignUp} >
      </Route>
      <Route path="/sign-in" component={SignIn} >
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
