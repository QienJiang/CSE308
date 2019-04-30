import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import {Tabs,Tab} from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge'
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'react-input-range/lib/css/index.css'
import InputRange from 'react-input-range';
import Alert from 'react-bootstrap/Alert'
import './App.css';
import './loginpage/Toggle.css'
import {Link, NavLink} from 'react-router-dom';
import hashmap from "hashmap";

class home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            targetDistrictNumber:10,
            equality: 5,
            fairness :5,
            compactness : 5,
            majorMinor : 5,
            competitiveness :5,
            efficiencyGpa :5,
            numOfRun:1,
            interestCommunity : 'NATIVEAMERICAN',
            text : "",
        };

        this.clickOnPhaseOne = this.clickOnPhaseOne.bind(this);
        this.clickOnPhaseTwo = this.clickOnPhaseTwo.bind(this);
        this.setNumOfDistrict = this.setNumOfDistrict.bind(this);
    }
    clickOnPhaseOne(e){
        this.setState({
            phaseOneStarted: true,
            text :''
        })
        this.props.socket.emit('runAlgorithm', this.state)

    }
    clickOnPhaseTwo(e){

    }
    setNumOfDistrict(e){
        this.setState({
            targetDistrictNumber : e.target.value
        })
    }
    setNumOfBatchRun(e){
        this.setState({
            numOfRun : e.target.value
        })
    }
    componentDidMount() {
        this.props.socket.on('message', (data)=> {
          this.setState({
              text: this.state.text +'\n'+ data
          })
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.textarea.scrollTop = this.textarea.scrollHeight;

    }
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Tabs defaultActiveKey="basicRun" >
                            <Tab variant = "pills"eventKey="basicRun" title="Basic Setting">
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
                                    <Button style={{width:100}} variant="outline-light">Log Out</Button>
                                </Col>
                                </Row>
                                <Row style={{margin:10}}><Col>
                                    <Dropdown>
                                        <Dropdown.Toggle style={{width:210}} variant="outline-light" id="dropdown-basic">
                                            Map history
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item>map1</Dropdown.Item>
                                            <Dropdown.Item>map2</Dropdown.Item>
                                            <Dropdown.Item>map3</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col><Col>
                                    <Button style={{width:100}} variant="outline-light">Save Map</Button>
                                </Col></Row>
                                <Row style={{margin:10}}><Col>
                                    <Dropdown>
                                        <Dropdown.Toggle style={{width:210}} variant="outline-light" id="dropdown-basic">
                                            Community of Interest
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item>Asian</Dropdown.Item>
                                            <Dropdown.Item>Africa-American</Dropdown.Item>
                                            <Dropdown.Item>Native-American</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col><Col>
                                    <Form.Control type="number"  value = {this.state.targetDistrictNumber} onChange={this.setNumOfDistrict}/>
                                </Col></Row>
                                <Row style={{'margin-top':20}}>
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
                                <Row style={{'margin-top':10}}>
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
                                <Row style={{'margin-top':10}}>
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
                                <Row style={{'margin-top':10}}>
                                    <Col sm={4}>
                                        <Button variant="outline-light" style={{width:100, 'font-size': '0.8em'}} disabled>
                                            MajorMinor:
                                        </Button>
                                    </Col>
                                    <Col sm={8}>
                                        <InputRange
                                            maxValue={10}
                                            minValue={0}
                                            value={this.state.majorMinor}
                                            onChange={value => this.setState({ majorMinor: value })} />
                                    </Col>
                                </Row>
                                <Row style={{'margin-top':10}}>
                                    <Col sm={4}>
                                        <Button variant="outline-light" style={{width:100, 'font-size': '0.8em'}} disabled>
                                            EfficiencyGpa
                                        </Button>
                                    </Col>
                                    <Col sm={8}>
                                        <InputRange
                                            maxValue={10}
                                            minValue={0}
                                            value={this.state.efficiencyGpa}
                                            onChange={value => this.setState({ efficiencyGpa: value })} />
                                    </Col>
                                </Row>
                                <Row style={{'margin-top':10}}>
                                    <Col sm={4}>
                                        <Button variant="outline-light" style={{width:100, 'font-size': '0.8em'}} disabled>
                                            Competitive:
                                        </Button>
                                    </Col>
                                    <Col sm={8}>
                                        <InputRange
                                            maxValue={10}
                                            minValue={0}
                                            value={this.state.competitiveness}
                                            onChange={value => this.setState({ competitiveness: value })} />
                                    </Col>
                                </Row>
                                <Row style={{'margin-top':30}}>
                                    <Col><Button variant="outline-light" style={{width:70, 'font-size': '0.8em'}} onClick={this.clickOnPhaseOne}>Start</Button></Col>
                                    <Col><Button variant="outline-light" style={{width:70, 'font-size': '0.8em'}}>Stop</Button></Col>
                                    <Col><Button variant="outline-light" style={{width:70, 'font-size': '0.8em'}}>Pause</Button></Col>
                                    <Col><Button variant="outline-light" style={{width:70, 'font-size': '0.8em'}}>Resume</Button></Col>
                                </Row>
                                <Row style={{'margin-top':20}}>
                                    <Button disable variant="outline-light" style={{width:70, 'font-size': '0.8em'}} disabled>Console:</Button>
                                    <Form style={{'margin-top':10, fontSize: '0.5em'}}>
                                        <Form.Group controlId="exampleForm.ControlTextarea1" >
                                            <Form.Control ref = {(el)=>this.textarea = el} as="textarea" style={{width:'400px',height:'130px','background-color':'black',opacity:1,color:'white','font-size': '12px'}} value = {this.state.text} disabled />
                                        </Form.Group>
                                    </Form>
                                </Row>
                                <Row style={{'margin-top':10}}>
                                    <Button variant="outline-light" style={{width:160, 'font-size': '0.8em'}} disabled>Estimated Time: 2m 3s:</Button>
                                </Row>
                                <ProgressBar variant="dark" style={{'margin-top':10}} animated now={45} />
                            </Tab>
                            <Tab eventKey="batch run" title="Batch Run Setting">
                                <Row style={{'margin-top':30}}>
                                <Col>
                                    <Button variant="outline-light" style={{width:100, 'font-size': '0.8em'}} disabled>
                                        Number Of Run:
                                    </Button>
                                </Col>
                                    <Col>
                                        <Form.Control type="number"  value = {this.state.numOfRun} onChange={this.setNumOfBatchRun}/>
                                    </Col>
                                </Row>
                                <Row style={{'margin-top':30}}>
                                    <Col><Button variant="outline-light" style={{width:70, 'font-size': '0.8em'}}>Batch Run</Button></Col>
                                    <Col><Button variant="outline-light" style={{width:70, 'font-size': '0.8em'}}>Stop</Button></Col>
                                    <Col><Button variant="outline-light" style={{width:70, 'font-size': '0.8em'}}>Pause</Button></Col>
                                    <Col><Button variant="outline-light" style={{width:70, 'font-size': '0.8em'}}>Resume</Button></Col>
                                </Row>
                                <Row style={{'margin-top':10}}>
                                    <Button variant="outline-light" style={{width:160, 'font-size': '0.8em'}} disabled>Estimated Time: 2m 3s:</Button>
                                </Row>
                                <ProgressBar variant="dark" style={{'margin-top':10}} animated now={45} />
                            </Tab>
                            <Tab eventKey="summary" title="Summary">

                            </Tab>
                        </Tabs>
                    </Row>
                </Container>
            </div>


        )
    }
}

export default home;
