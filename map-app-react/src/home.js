import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProgressBar from 'react-bootstrap/ProgressBar'
import './App.css';
import { Link } from 'react-router-dom';

class home extends React.Component {
    constructor() {
        super();

    }
    render() {
        return (
            <div><Container>
                <input type="Search"  onChange={this.handleChange} placeholder="Search..." />
                <Row><Col>
                <Dropdown >
                    <Dropdown.Toggle style={{width:160}} variant="success" id="dropdown-basic">
                        Seed Precinct
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/seed-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/seed-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/seed-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                    </Col><Col>
                    <Button variant="light" style={{width:80}}>Style</Button></Col>
                </Row>
                <Row><Col>
                    <Dropdown>
                        <Dropdown.Toggle style={{width:160}} variant="success" id="dropdown-basic">
                            Map history
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/map-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/map-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/map-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col><Col>
                    <Button style={{width:80}} variant="light">Share</Button>
                </Col></Row>
                <Row>
                    <Col><Button variant="light" >Load Map</Button></Col>
                    <Col><Button variant="light">Save Map</Button></Col>
                    <Col><Button variant="light">Delete Map</Button></Col>
                </Row>
                <h1 style={{color: 'grey'}}>Algorithm Weight</h1>
                <Row><Col><p>Population</p></Col>
                <Col><div className="slidecontainer">
                    <input type="range" min="1" max="100" value="50" className="slider" id="myRange"/>
                </div></Col></Row>
                    <Row><Col><p>Compactness</p></Col>
                    <Col><div className="slidecontainer">
                        <input type="range" min="1" max="100" value="50" className="slider" id="myRange"/>
                    </div></Col></Row><Row><Col><p>Alignment</p></Col>
                    <Col><div className="slidecontainer">
                        <input type="range" min="1" max="100" value="50" className="slider" id="myRange"/>
                    </div></Col></Row>
                <Row><Col><p>Adherence</p></Col>
                    <Col><div className="slidecontainer">
                        <input type="range" min="1" max="100" value="50" className="slider" id="myRange"/>
                    </div></Col></Row>
                <Row>
                    <Col><Button variant="light" style={{width:70}}>Start</Button></Col>
                    <Col><Button variant="light" style={{width:70}}>Stop</Button></Col>
                    <Col><Button variant="light" style={{width:70}}>Pause</Button></Col>
                    <Col><Button variant="light">Resume</Button></Col>
                </Row>
                <h1>Console:</h1>
                <textarea style={{width:400}}  rows={5} col={200}></textarea>

                <h2>Estimated Time: 2m 3s</h2>
                <ProgressBar animated now={45} />
            </Container></div>


        )
    }
}

export default home;
