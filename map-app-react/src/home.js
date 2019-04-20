import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'react-input-range/lib/css/index.css'
import InputRange from 'react-input-range';
import Alert from 'react-bootstrap/Alert'
import './App.css';
import { Link } from 'react-router-dom';
import hashmap from "hashmap";

class home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {equality: 5,
        fairness :5,
        compactness : 5,
        text : ""};
    }
    componentDidMount() {
        this.props.socket.on('message', (data)=> {
          this.setState({
              text: this.state.text +'\n'+ data
          })
        });
    }

    render() {
        return (
            <div>
                <Container>
                <Row style={{margin:10}}><Col>
                <Dropdown >
                    <Dropdown.Toggle style={{width:210}} variant="outline-light" id="dropdown-basic">
                        {this.props.selectedState}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>this.props.setSelectedState('New York')}>New York</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.setSelectedState('California')}>California</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.setSelectedState('Pennsylvania')}>Pennsylvania</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                    </Col><Col>
                    <Button variant="outline-light" style={{width:80}}>Style</Button></Col>
                </Row>
                <Row style={{margin:10}}><Col>
                    <Dropdown>
                        <Dropdown.Toggle style={{width:210}} variant="outline-light" id="dropdown-basic">
                            Map history
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/map-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/map-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/map-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col><Col>
                    <Button style={{width:80}} variant="outline-light">Share</Button>
                </Col></Row>
                <Row style={{'margin-top':10}}>
                    <Col><Button variant="outline-light" style={{width:100, 'font-size': '0.8em'}}>Load Map</Button></Col>
                    <Col><Button variant="outline-light" style={{width:100, 'font-size': '0.8em'}}>Save Map</Button></Col>
                    <Col><Button variant="outline-light" style={{width:100, 'font-size': '0.8em'}}>Delete Map</Button></Col>
                </Row>
                <Row style={{'margin-top':30}}>
                    <Col sm={4}>
                        <Button variant="outline-light" style={{width:100, 'font-size': '0.8em'}} disabled>
                            Equality:
                        </Button>
                    </Col>
                    <Col sm={8}>
                    <InputRange
                        maxValue={10}
                        minValue={0}
                        value={this.state.equality}
                        onChange={value => this.setState({ equality : value})} />
                    </Col>
                </Row>
                    <Row style={{'margin-top':30}}>
                        <Col sm={4}>
                            <Button variant="outline-light" style={{width:100, 'font-size': '0.8em'}} disabled>
                                Fairness:
                            </Button>
                        </Col>
                        <Col sm={8}>
                            <InputRange
                                maxValue={10}
                                minValue={0}
                                value={this.state.fairness}
                                onChange={value => this.setState({ fairness:value })} />
                        </Col>
                    </Row>
                    <Row style={{'margin-top':30}}>
                        <Col sm={4}>
                            <Button variant="outline-light" style={{width:100, 'font-size': '0.8em'}} disabled>
                                Compactness:
                            </Button>
                        </Col>
                        <Col sm={8}>
                            <InputRange
                                maxValue={10}
                                minValue={0}
                                value={this.state.compactness}
                                onChange={value => this.setState({ compactness: value })} />
                        </Col>
                    </Row>
                <Row style={{'margin-top':30}}>
                    <Col><Button variant="outline-light" style={{width:70, 'font-size': '0.8em'}} onClick ={()=>{
                        this.props.socket.emit('runAlgorithm', {msgContent: "run"})}}>Start</Button></Col>
                    <Col><Button variant="outline-light" style={{width:70, 'font-size': '0.8em'}}>Stop</Button></Col>
                    <Col><Button variant="outline-light" style={{width:70, 'font-size': '0.8em'}}>Pause</Button></Col>
                    <Col><Button variant="outline-light" style={{width:70, 'font-size': '0.8em'}}>Resume</Button></Col>
                </Row>
                    <Row style={{'margin-top':30}}>
                        <Button disable variant="outline-light" style={{width:70, 'font-size': '0.8em'}} disabled>Console:</Button>
                        <Form style={{'margin-top':10}}>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" style={{width:'24em',height:'8em',color:'green'}} value = {this.state.text}disabled />
                            </Form.Group>
                        </Form>
                    </Row>
                    <Row style={{'margin-top':10}}>
                        <Button variant="outline-light" style={{width:160, 'font-size': '0.8em'}} disabled>Estimated Time: 2m 3s:</Button>
                    </Row>
                <ProgressBar variant="dark" style={{'margin-top':10}} animated now={45} />
                </Container>
            </div>


        )
    }
}

export default home;
