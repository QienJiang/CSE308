import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Map from './components/Map';
import SignUp from './loginpage/SignUp';
import SignIn from './loginpage/SignIn';
import Guest from './loginpage/Guest';
import Toggle from './loginpage/Toggle';
import Home from './home';
import io from "socket.io-client";


class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      selectedState :'Select State'
    }
    this.setSelectedState = this.setSelectedState.bind(this)
      this.socket = io('http://localhost:9093');
      this.socket.on('connect',()=>{
          console.log("success")
      })
  }


  setSelectedState(s){
    this.setState({
        selectedState : s
    })
  }

    render() {
    return (
      <Router basename="/">
      <div className="App">

      <Map selectedState = {this.state.selectedState} setSelectedState = {this.setSelectedState} socket = {this.socket}/>


      <div className="App__Form" >

      <Route exact path="/" component={SignUp} >
      </Route>

      <Route exact path="/sign-up" component={SignUp} >
      </Route>
      <Route path="/sign-in" component={SignIn} >
      </Route>
      <Route exact path="/Guest" component={Guest}>
      </Route>
      <Route exact path="/home" render={()=> <Home selectedState = {this.state.selectedState} setSelectedState = {this.setSelectedState} socket={this.socket}/>} >
      </Route>
      </div>


        </div>
      </Router>
    );
  }
}

export default App;
