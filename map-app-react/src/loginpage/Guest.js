import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GuestForm extends Component {
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

        console.log('The form was submitted with the following data:');
        console.log(this.state);
    }

    render() {
        return (
            <div className="FormCenter" >
                <form onSubmit={this.handleSubmit} className="FormFields">
                    <div className="FormField">
                        <button className="FormField__Button mr-20">Guest View</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default GuestForm;