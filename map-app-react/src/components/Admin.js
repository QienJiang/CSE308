import React, { Component } from 'react';
import axios from "axios";
import store from "store";
import Dropdown from "react-bootstrap/Dropdown";
import Col from "react-bootstrap/Col";
import DropdownItem from "react-bootstrap/es/DropdownItem";

class Admin extends Component {
    constructor(props){
        super(props);
        this.state ={
            users: null,
            selectedUser : 'Select User'
        }
        this.setSelectedUser = this.setSelectedUser.bind(this)
    }

    setSelectedUser(user){
        this.setState({
            selectedUser : user
        })
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
            <Dropdown>
                <Dropdown.Toggle style={{width:210}} variant="outline-light" id="dropdown-basic">
                    {this.state.selectedUser}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {this.state.users}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default Admin;
