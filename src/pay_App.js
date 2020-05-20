import React, { Component, Fragment } from "react";
// import logo from './logo.svg';
// import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      KAKAO_REST_API_KEY: "7c229e09fbce83d5cad98a61ff0e405d",
      KAKAO_JAVASCRIPT_API_KEY: "ea02675b8f53b6ec020dec0761d34821",
      KAKAO_ADMIN_API_KEY: "8b20318c0940581c27878e85db2638a5"
    }
  } 

  /**
   * 렌더링
   */
  render() {
    return(
      <Fragment>
        <div>
          <img src="images/payment_icon_yellow_large.png" alt=""></img>
        </div>
      </Fragment>
    );
  }
}  

export default (App);
// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyAmD_faFCkdjHLORQUnr7KPKknyzf5pXsA'
// })(App);
