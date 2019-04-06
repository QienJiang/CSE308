import React from 'react';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import "leaflet-realtime";
import "leaflet-ajax";

import { Container, Row, Col }  from "react-bootstrap";


const Wrapper = styled.div`
width: ${props => props.width};
height: ${props => props.height};
`;

export default class Map extends React.Component{
    stateStyle(feature) {
        return {
            fillColor: 'white',
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
        };
    }
    precinctStyle(feature) {
        return {
            fillColor: 'white',
            weight: 1,
            opacity: 1,
            color: 'white',
        };
    }
  componentDidMount(){
    this.mymap = L.map(this.refs.mymap).setView([37.8, -70], 4);
      this.popup = L.popup();

    this.mymap.on('click', this.onMapClick);
    // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      //       attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      //https://api.mapbox.com/styles/v1/ccall/cju4omhh623za1flgiymq3do0/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2NhbGwiLCJhIjoiY2p1NG9qemVhMTAxazQ0cDg1NWoweW5kYSJ9.f45ljFqvaHsgWlC1VjJ-Iw
      //https://api.mapbox.com/styles/v1/linzengxian/cju3oaz0b1tcm1fo6enjxem39/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibGluemVuZ3hpYW4iLCJhIjoiY2pyd2J0MGx3MGI5aDQzcXJmbmVxYTk1OCJ9.Y-plQvOEnSriRzc9EcxqQA
      L.tileLayer('https://api.mapbox.com/styles/v1/ccall/cju4omhh623za1flgiymq3do0/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2NhbGwiLCJhIjoiY2p1NG9qemVhMTAxazQ0cDg1NWoweW5kYSJ9.f45ljFqvaHsgWlC1VjJ-Iw', {
      maxZoom: 15,
          minZoom:2,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoicWllbiIsImEiOiJjanJ3aWg5ajAwZDVkNDlvOXF6OWh3dGJ3In0.ewZYRX60IgGsmtsGIffdfQ'
    }).addTo(this.mymap);

      this.realtime = L.realtime({
          url: 'https://wanderdrone.appspot.com/',
      }, {
          interval: 3 * 1000
      }).addTo(this.mymap);

      this.realtime.on('update', () =>{
          console.log('233');
      });
      this.stateLayer = L.geoJson.ajax("https://raw.githubusercontent.com/QienJiang/CSE308/master/map-app-react/public/nycapa.json",{style: this.stateStyle});
       this.layer = L.geoJson.ajax("https://raw.githubusercontent.com/QienJiang/CSE308/master/map-app-react/public/ny_final.json",{style: this.precinctStyle});
      this.mymap.addLayer(this.stateLayer);
      this.mymap.on('zoomend', () =>{
          if (this.mymap.getZoom() >6){
              this.mymap.addLayer(this.layer);
              this.mymap.removeLayer(this.stateLayer);
          }
          else {
              this.mymap.removeLayer(this.layer);
              this.mymap.addLayer(this.stateLayer);
          }
      });


  /*  L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.{ext}', {
          attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          subdomains: 'abcd',
          minZoom: 0,
          maxZoom: 20,
          ext: 'png'
      }).addTo(this.mymap);
      */

  }
  zoomToFeature(e) {
    this.mymap.fitBounds(e.target.getBounds());
  }


  render() {
    return(
      <div ref = 'mymap' style={{height:"100%",width:"100%",position:"absolute", 'z-index': 0}}/>
    )
  };
}
