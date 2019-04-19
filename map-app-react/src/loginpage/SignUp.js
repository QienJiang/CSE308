import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import Toggle from './Toggle';
import axios from 'axios';

class SignUpForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            name: '',
            hasAgreed: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let  data=JSON.stringify({//×ªJSON ¸ñÊ½
          "email":e.target.elements.email.value,
          "password":e.target.elements.password.value,
          "name":e.target.elements.name.value
        })

          console.log(data);
        this.setState({login: !this.state.login});
        axios.post('http://localhost:8080/homepage/signup',
          data,{
          headers:{ 'Content-Type': 'application/json;charset=UTF-8'}

        })
        .then(request =>{
          console.log(request.data);
            console.log(request.data.email);
                    console.log(request.data.password);
                    this.props.history.push('/home');

        })
        console.log('The form was submitted with the following data:');
      
    }

    render() {
        return (
        <div className="FormCenter" >
              <Toggle/>
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">Full Name</label>
                <input type="text" id="name" className="FormField__Input" placeholder="Enter your full name" name="name" value={this.state.name} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__CheckboxLabel">
                    <input className="FormField__Checkbox" type="checkbox" name="hasAgreed" value={this.state.hasAgreed} onChange={this.handleChange} /> I agree all statements in <a href="" className="FormField__TermsLink">terms of service</a>
                </label>
              </div>

              <div className="FormField">
                  <button className="FormField__Button mr-20">Sign Up</button> <Link to="/sign-in" className="FormField__Link">I'm already member</Link>
              </div>
            </form>
          </div>
        );
    }
}
export default SignUpForm;
