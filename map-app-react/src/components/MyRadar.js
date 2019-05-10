import React,{Component} from 'react'
import {Radar,Bar,Doughnut} from "react-chartjs-2";
import {Carousel} from 'react-bootstrap'


class MyRadar extends Component{
    constructor(props) {
        super(props);
        this.state={
            chartData:props.chartData
        }
        this.nf = new Intl.NumberFormat()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps !== this.props){
            this.setState({
                chartData:this.props.chartData
            })
        }
    }

    render() {
        return (
            <div>
                <p className='voteStyle'>
                    Id: {this.props.vote.PA_GEO_ID || this.props.vote.name} <br/>
                    Population: {this.nf.format(this.props.vote.total)}<br/>
                Democracy  vote: {this.nf.format(this.props.vote.GOVDV2010)} <br/>
                Republican vote: {this.nf.format(this.props.vote.GOVRV2010)}
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
                        <Doughnut width={200}
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