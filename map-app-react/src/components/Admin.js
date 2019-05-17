import React, { Component } from 'react';
import axios from "axios";
import store from "store";
import Dropdown from "react-bootstrap/Dropdown";
import Col from "react-bootstrap/Col";
import DropdownItem from "react-bootstrap/es/DropdownItem";
import Button from 'react-bootstrap/Button'
import ReactDOM from "react-dom";
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Popup from "reactjs-popup";


class Admin extends Component {
    constructor(props){
        super(props);

        this.state ={
            users: null,
            selectedUser : 'Select User',
            email: '',
            password: '',
            name:''
        }
        this.setSelectedUser = this.setSelectedUser.bind(this)
        this.clickOnChange = this.clickOnChange.bind(this)
    }

    setSelectedUser(user){
        this.setState({
            selectedUser : user
        })
    }

    clickOnChange(e){
      let  data=JSON.stringify({//×ªJSON ¸ñÊ½
        "email":this.state.selectedUser,
        "password":"fadjghj"
      })

      if(e.target.value === 'update'){
        axios.post('http://localhost:8080/homepage/update',
          data,{
          headers:{ 'Content-Type': 'application/json;charset=UTF-8'}
        })
        .then(request =>{
            console.log("update")
        }).catch((error)=>{
          this.setState({
              msg: 'Invalid User or Password'
          })
        })
      }else if(e.target.value === 'register'){

      }else if(e.target.value === 'deleted'){
        axios.post('http://localhost:8080/homepage/delete',
          data,{
          headers:{ 'Content-Type': 'application/json;charset=UTF-8'}
        })
        .then(request =>{
            console.log("deleted")
        }).catch((error)=>{
          this.setState({
              msg: 'Invalid User or Password'
          })
        })
      }




    }
    componentDidMount(){
        let userList = [];
        axios.post('http://localhost:8080/homepage/admin')
            .then(request =>{
                userList = request.data.map((user) => {
                    console.log(user.email)
                    return <Dropdown.Item onClick={()=> this.setSelectedUser(user.email) }>{user.email}</Dropdown.Item>
                })
                this.setState({
                    users : userList
                });
            }).catch((error)=>{
            this.setState({
                msg: 'Invalid User or Password'
            })
        })

    }
    render() {
        return(
          <div>
            <Dropdown>
                <Dropdown.Toggle style={{width:210}} variant="outline-light" id="dropdown-basic">
                    {this.state.selectedUser}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {this.state.users}
                </Dropdown.Menu>
            </Dropdown>
            <Row style={{'margin-top':30}}>
                <Col><Button variant="outline-light" style={{width:70, 'font-size': '0.8em'}} value = "update" onClick={this.clickOnChange}>Update</Button></Col>
                <Col><Popup trigger={<button> Trigger</button>} position="right top">
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
                </Popup></Col>
                <Col><Button variant="outline-light" style={{width:70, 'font-size': '0.8em'}} value = 'deleted' onClick={this.clickOnChange} >deleted</Button></Col>

            </Row>
            </div>
        )
    }
}

export default Admin;
