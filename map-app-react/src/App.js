import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Map from './components/Map';
import SignUp from './loginpage/SignUp';
import SignIn from './loginpage/SignIn';


class App extends Component {
  render() {
    return (
      <Router basename="/react-auth-ui/">
        <div className="App">
        <div className="Map">
        <Map/>
        </div>
          <div className="App__Form">
            // <div className="PageSwitcher">
            //     <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
            //     <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
            //   </div>

              <div className="FormTitle">
                  <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
              </div>
              <Route exact path="/" component={SignUp}>
              </Route>
              <Route path="/sign-in" component={SignIn}>
              </Route>
          </div>

        </div>
      </Router>
);
}
}

export default App;
