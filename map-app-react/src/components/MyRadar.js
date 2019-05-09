import React,{Component} from 'react'
import {Radar,Bar} from "react-chartjs-2";
import {Carousel} from 'react-bootstrap'


class MyRadar extends Component{
    constructor(props) {
        super(props);
        this.state={
            chartData:props.chartData
        }
    }

    componentDidMount() {
        console.log(this.state.chartData)
    }

    render() {
        return (
            <div>
                <p className='voteStyle'>
                    Precinct Id: {this.props.vote.GEOID10} <br/>
                Democracy  vote: {this.props.vote.GOV_DVOTE_} <br/>
                Republican vote: {this.props.vote.GOV_RVOTE_}
                </p>
                <Carousel>
                    <Carousel.Item>
                        <Radar width={200}
                               height={200}
                               options={{
                                   legend : {
                                       labels : {
                                           fontColor : 'white'
                                       }
                                   },
                                   scale: {
                                       ticks: {
                                           display: false,
                                           maxTicksLimit: 3
                                       },
                                       pointLabels:{
                                           fontColor: 'white'
                                       },
                                       gridLines: { color: 'rgb(0, 255, 255)'  },
                                       angleLines: { color: 'rgb(0, 255, 255)' }
                                   }
                               }
                               } data = {this.state.chartData}/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Bar width={200}
                               height={200}
                               options={{
                                   legend : {
                                       labels : {
                                           fontColor : 'white'
                                       }
                                   },
                                   scale: {
                                       pointLabels:{
                                           fontColor: 'white'
                                       },
                                       gridLines: { color: 'rgb(0, 255, 255)'  },
                                       angleLines: { color: 'rgb(0, 255, 255)' }
                                   }
                               }
                               } data = {this.state.chartData}/>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }

}

export default MyRadar