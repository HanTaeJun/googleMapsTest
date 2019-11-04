import React, { Component, Fragment } from "react";
// import logo from './logo.svg';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [{lat: 47.49855629475769, lng: -122.14184416996333},
              {latitude: 47.359423, longitude: -122.021071},
              {latitude: 47.2052192687988, longitude: -121.988426208496},
              {latitude: 47.6307081, longitude: -122.1434325},
              {latitude: 47.3084488, longitude: -122.2140121},
              {latitude: 47.5524695, longitude: -122.0425407}]
    }
  }
  onEventChecker = (e) => {
    console.log(e);
  }
  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.latitude,
       lng: store.longitude
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }
  render() {
    const mapStyles = {
      width: '100%',
      height: '100%',
    };
    return (
      <Fragment>
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{lat: 47.444, lng: -122.176}}
          onZoomChanged={(e)=>this.onEventChecker(e)}
          onClick={(e)=>this.onEventChecker(e)}
          onMousemove
        >
          {/* <Marker position={{lat: 48.00, lng: -122.00}} /> */}
          {this.displayMarkers()}
        </Map>
      </Fragment>
    );
  }
}  

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAmD_faFCkdjHLORQUnr7KPKknyzf5pXsA'
})(App);
