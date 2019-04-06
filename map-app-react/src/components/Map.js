import React from 'react';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import "leaflet-realtime";
import "leaflet-ajax";
import "./Map.css"

import { Container, Row, Col }  from "react-bootstrap";


const Wrapper = styled.div`
width: ${props => props.width};
height: ${props => props.height};
`;

export default class Map extends React.Component{
    constructor (props){
        super (props);
        this.state ={
            info:'',
            data: [],
            open: true
        };
        this.stateStyle = this.stateStyle.bind(this);
        this.precinctStyle = this.precinctStyle.bind(this);
        this.highlightFeature = this.highlightFeature.bind(this);
        this.resetHighlight = this.resetHighlight.bind(this);

        this.zoomToFeature = this.zoomToFeature.bind(this);
        this.onEachFeature = this.onEachFeature.bind(this);
    }
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
    highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 3,
            color: 'yellow',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
        this.info.update(layer.feature.properties);
    }
    resetHighlight(e) {
        this.stateLayer.resetStyle(e.target);
        this.layer.resetStyle(e.target);
        this.info.update();
    }
    onEachFeature(feature, layer) {
        layer.on({
            mouseover: this.highlightFeature,
            mouseout: this.resetHighlight,
            click: this.zoomToFeature
        });
    }
  componentDidMount(){
    this.mymap = L.map(this.refs.mymap, {
        zoomControl: false
        //... other options
    }).setView([37.8, -70], 4);
      this.popup = L.popup();
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

      L.control.zoom({
          position:'bottomleft'
      }).addTo(this.mymap);
      this.realtime = L.realtime({
          url: 'https://wanderdrone.appspot.com/',
      }, {
          interval: 3 * 10000
      }).addTo(this.mymap);

      this.realtime.on('update', () =>{
          console.log('233');
      });
      this.stateLayer = L.geoJson.ajax("https://raw.githubusercontent.com/QienJiang/CSE308/master/map-app-react/public/nycapa.json",{style: this.stateStyle,onEachFeature: this.onEachFeature});
      this.layer = L.geoJson.ajax("https://raw.githubusercontent.com/QienJiang/CSE308/master/map-app-react/public/ny_final.json",{style: this.precinctStyle,onEachFeature: this.onEachFeature});
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

      this.info = L.control({position: 'topleft'});
      this.info.onAdd = function (map) {
          this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
          this.update();
          return this._div;
      };

      this.info.update = function (props) {
          this._div.innerHTML = '<h4>Detail Information</h4>' +  (props ?
              '<b>'+ 'Election_id: ' + props.NAME10 + '</b><br />' +'Population: '+ props.POP100
              + '<br />' + 'democracy vote: ' +props.GOV_DVOTE_+ '<br/>' + 'republican vote: ' + props.GOV_RVOTE_
              : 'Hover over a state');
      };

      this.info.addTo(this.mymap);
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
    this.mymap.flyToBounds(e.target.getBounds());
  }


  render() {
    return(
      <div ref = 'mymap' style={{height:"100%",width:"100%",position:"absolute", 'zIndex': 0}}/>
    )
  };
}
