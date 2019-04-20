import React from 'react';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import "leaflet-realtime";
import "leaflet-ajax";
import "./Map.css"
import io from 'socket.io-client';
import hashmap from 'hashmap';


import { Container, Row, Col }  from "react-bootstrap";


const Wrapper = styled.div`
width: ${props => props.width};
height: ${props => props.height};
`;
export default class Map extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            info: '',
            data: [],
            open: true,
            state: '',
        };
        this.stateStyle = this.stateStyle.bind(this);
        this.precinctStyle = this.precinctStyle.bind(this);
        this.districtStyle = this.districtStyle.bind(this);
        this.highlightFeature = this.highlightFeature.bind(this);
        this.resetHighlight = this.resetHighlight.bind(this);
        this.zoomToFeature = this.zoomToFeature.bind(this);
        this.onEachFeature = this.onEachFeature.bind(this);
        // this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }
    componentDidUpdate(prevProps){
        if (prevProps.selectedState  !== this.props.selectedState ) {

            this.stateLayer.eachLayer((layer)=> {
                if(layer.feature.properties.GeoId === this.props.selectedState){
                    this.mymap.flyToBounds(layer);
                }
            })
        }

    }
    stateStyle(feature) {
        return {
            fillColor: 'white',
            weight: 2,
            opacity: 1,
            color: 'white',
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
    districtStyle(feature) {
        return {
            fillColor: 'white',
            weight: 1,
            opacity: 1,
            color: 'blue',
        };
    }
    highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 3,
            color: 'yellow',
        });

        this.info.update(layer.feature.properties);
    }
    resetHighlight(e) {
        e.target.setStyle({
            weight: 1,
            color: 'white'
        });
        //this.paLayer.resetStyle(e.target);
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
      this.props.socket.on('updateColor', (data)=> {
        var array = data.split(',');
        var datamap = new hashmap();

        for(var i=0; i<array.length; i++){
          var temp = array[i].split(':');
          datamap.set(temp[0],temp[1]);
        }
          console.log(datamap.get("42123181"));
              this.paLayer.eachLayer(function (layer) {
                  if (datamap.has(layer.feature.properties.GEOID10)) {
                    console.log("find");
                      layer.setStyle({
                          fillColor: datamap.get(layer.feature.properties.GEOID10),
                          fillOpacity : 1
                      })
                  }
              })

      });

      this.mymap = L.map(this.refs.mymap, {
        zoomControl: false
        //... other options
    }).setView([37.8, -70], 4);
      this.popup = L.popup();
      /*
     L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
         maxZoom: 15,
         minZoom:2,
         id: 'mapbox.streets',
         accessToken: 'pk.eyJ1IjoicWllbiIsImEiOiJjanJ3aWg5ajAwZDVkNDlvOXF6OWh3dGJ3In0.ewZYRX60IgGsmtsGIffdfQ'
     }).addTo(this.mymap);
     */
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
      this.stateLayer = L.geoJson.ajax("https://raw.githubusercontent.com/QienJiang/CSE308/master/map-app-react/public/nycapa.json",{style: this.stateStyle,onEachFeature: this.onEachFeature});
      this.nyLayer = L.geoJson.ajax("https://raw.githubusercontent.com/QienJiang/CSE308/master/map-app-react/public/ny_final.json",{style: this.precinctStyle,onEachFeature: this.onEachFeature});
      this.paLayer = L.geoJson.ajax("https://raw.githubusercontent.com/QienJiang/CSE308/master/map-app-react/public/pa_final.json",{style: this.precinctStyle,onEachFeature: this.onEachFeature});
      this.paDistrict = L.geoJson.ajax("https://raw.githubusercontent.com/QienJiang/CSE308/master/map-app-react/public/PaCongressional2019_01.geojson",{style: this.precinctStyle,onEachFeature: this.onEachFeature})
      this.nyDistrict = L.geoJson.ajax("https://raw.githubusercontent.com/QienJiang/CSE308/master/map-app-react/public/nydistrict.geojson",{style: this.precinctStyle,onEachFeature: this.onEachFeature})
      /*
      this.stateLayer.on('data:loaded',()=> {
          this.stateLayer.eachLayer(function (layer) {
              layer._path.id = layer.feature.properties.NAME10;
          })
      })
      */
      this.mymap.addLayer(this.stateLayer);
      this.mymap.on('zoomend', () =>{
          if (this.mymap.getZoom() >6){
              if(this.props.selectedState === 'New York') {
                  this.mymap.removeLayer(this.paLayer);
                  this.mymap.addLayer(this.nyLayer);
              }
              else if(this.props.selectedState === 'Pennsylvania') {
                  this.mymap.removeLayer(this.nyLayer);
                  this.mymap.addLayer(this.paLayer);

              }
              this.mymap.removeLayer(this.stateLayer);
          }
          else {
              this.mymap.removeLayer(this.nyLayer);
              this.mymap.removeLayer(this.paLayer);
              this.mymap.addLayer(this.stateLayer);
          }
      });
        this.mymap.on('overlayadd',()=>{
            if(this.props.selectedState === 'New York'){
                this.mymap.removeLayer(this.nyLayer)
                this.mymap.addLayer(this.nyDistrict)
            }else if(this.props.selectedState === 'Pennsylvania'){
                this.mymap.removeLayer(this.paLayer)
                this.mymap.addLayer(this.paDistrict)
            }
        })
      this.mymap.on('overlayremove',()=>{
          if(this.props.selectedState === 'New York'){
              this.mymap.removeLayer(this.nyDistrict)
              this.mymap.addLayer(this.nyLayer)
          }else if(this.props.selectedState === 'Pennsylvania'){
              this.mymap.removeLayer(this.paDistrict)
              this.mymap.addLayer(this.paLayer)
              //this.mymap.addLayer(this.paDistrict)
          }
      })
      this.info = L.control({position: 'topleft'});
      this.info.onAdd = function (map) {
          this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
          this.update();
          return this._div;
      };

      this.info.update = function (props) {
          this._div.innerHTML = '<h4>Detail Information</h4>' +  (props ?
              '<b>'+ 'GeoId: ' + props.GEOID10 + '</b><br />' +'Population: '+ props.POP100
              + '<br />' + 'democracy vote: ' +props.GOV_DVOTE_+ '<br/>' + 'republican vote: ' + props.GOV_RVOTE_
              : 'Hover over a state');
      };

      this.info.addTo(this.mymap);
      this.overlayMaps = {
          "District": this.stateLayer
      }
      L.control.layers(null,this.overlayMaps,{position:'bottomleft'}).addTo(this.mymap);
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
    this.mymap.flyToBounds(e.target);
    if(e.target.feature.properties.GeoId === 'New York' ||
        e.target.feature.properties.GeoId === 'California'||
        e.target.feature.properties.GeoId === 'Pennsylvania')
        this.props.setSelectedState( e.target.feature.properties.GeoId);
        /*
    this.setState({
        state : e.target.feature.properties.GeoId,
    })
    */
      //this.socket.emit('messageevent', {msgContent: "hello"});
/*
      this.stateLayer.eachLayer(function (layer) {
          if(layer.feature.properties.NAME10 == 'New York'){
              layer.setStyle({
                  fillColor : 'blue'
              })
          }
      })
*/
  }


  render() {
    return(
      <div ref = 'mymap' style={{height:"100%",width:"100%",position:"absolute", 'zIndex': 0}}/>
    )
  };
}
