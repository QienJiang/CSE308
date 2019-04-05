import React from 'react';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import { Container, Row, Col }  from "react-bootstrap";


const Wrapper = styled.div`
width: ${props => props.width};
height: ${props => props.height};
`;

export default class Map extends React.Component{

  componentDidMount(){
    this.mymap = L.map(this.refs.mymap).setView([37.8, -70], 4);
    this.popup = L.popup();

    this.mymap.on('click', this.onMapClick);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoicWllbiIsImEiOiJjanJ3aWg5ajAwZDVkNDlvOXF6OWh3dGJ3In0.ewZYRX60IgGsmtsGIffdfQ'
    }).addTo(this.mymap);
    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.{ext}', {
          attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          subdomains: 'abcd',
          minZoom: 0,
          maxZoom: 20,
          ext: 'png'
      }).addTo(this.mymap);
  }
  zoomToFeature(e) {
    this.map.fitBounds(e.target.getBounds());
  }


  render() {
    return(
      <div ref = 'mymap' style={{height:"100%",width:"100%",position:"absolute", 'z-index': 0}}/>
    )
  };
}
