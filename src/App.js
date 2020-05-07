import React, { Component, Fragment } from "react";
// import logo from './logo.svg';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      searchText : "",
      zoomIndex: 18,
      removeSelectIndex : "null",
      list: [
        {bool: false,          index: 0,          latitude: 37.4411558,          longitude: 126.67003090000003,          title: "대한민국 인천광역시 남구 학익2동 240-25"},
      ],
      drawMode: false,
      drawType: "circle"
    }
  } 


  /**
   * 값을 주면 해당값의 데이터를 넘겨줍니다.
   * @param value
   */
  geoCallBack = async(value) => {
    let sendData;
    const {setStores} = this;
    const {google} = this.props;
    const {stores} = this.state
    let geocoder = new google.maps.Geocoder();
    await geocoder.geocode({
      address: value,
      region: 'ko'
    }, await function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log("RESULT OK::통신 성공");
        sendData = stores;
        let lat;
        let lng;
        let address;
        // console.log(results);        
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
        address = results[0].formatted_address;
        // console.log(results);
        const latLng = {latitude:lat, longitude:lng, title: address, index: stores.length, bool: false, address_components: results[0].address_components};
        sendData.push(latLng);
        console.log(sendData);
        setStores(sendData);
      } else if (status === google.maps.GeocoderStatus.ERROR) {
        console.log("Error::server 통신 에러");
      } else if (status === google.maps.GeocoderStatus.INVALID_REQUEST) {
        console.log("Invalid request::검색어없음");
      } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
        console.log("Over query limit::너무 잦은 통신");
      } else if (status === google.maps.GeocoderStatus.REQUEST_DENIED) {
        console.log("Geo code denied::geoCode 이용불가 API KEY 확인");
      } else if (status === google.maps.GeocoderStatus.UNKNOWN_ERROR) {
        console.log("Unknown error::알수없는 에러 발생");
      } else if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
        console.log("Zero result::찾는 데이터와 일치하는 데이터 존재하지않음.");
      } else {
        console.log("unknown status error..");
      }
    });
  }

  /**
   * 마커를 추가하는 이벤트입니다.
   */
  addMarkers = async (e, aug, geoData) => {   
    let data = `${geoData.latLng.lat()} ${geoData.latLng.lng()}`;
    this.geoCallBack(data);
  }

  /**
   * 검색버튼을 클릭 했을때 이벤트입니다.
   */
  onSearchEvent = async () => {
    const {searchText} = this.state
    this.geoCallBack(searchText);
  }

  /**
   * 배열의 i번째 마커를 삭제하는 이벤트입니다.
   */
  removeMarkers = async () => {
    const {stores, removeSelectIndex} = this.state;
    if (removeSelectIndex==="null") {
      alert();
      return;
    }
    let stateData = stores;
    stateData.splice(removeSelectIndex,1);
    await this.setState({
      stores: stateData
    });
  }

  /**
   * InfoWindow를 보여줄지 말지 정하는 이벤트입니다.
   */
  visibleInfoWindow = async (i) => {
    // const {stores} = this.state;
    // let stateData = stores;
    // stateData[i].bool = !stateData[i].bool 
    // await this.setState({
    //   stores: stateData
    // })
  }

  /**
   * 저장된 배열의 값을 Marker로 뿌려주는 함수입니다.
   */
  displayMarkers = (i) => {
    return this.state.list.map((store, index) => {
      return (
        <Marker 
          key={index}
          // icon={"https://developers.google.com/maps/documentation/javascript/images/custom-marker.png"}
          position={{
            lat: store.latitude,
            lng: store.longitude
          }} 
          // visible = {this.state.zoomIndex < 15 ? false : true}
          onClick={() => this.visibleInfoWindow(index)} 
        />
      );
    });
  }

  removeMarkersSelect = (i) => {
    this.setState({
      removeSelectIndex : i
    });
  }

  /**
   * 저장된 배열의 값을 InfoWindow로 뿌려주는 함수입니다.
   */
  displayInfoWindows = (i) => {
    return this.state.list.map((store, index) => {
      return (
        <InfoWindow
          key={index}
          visible={store.bool}
          position={{
            lat: store.latitude,
            lng: store.longitude
          }} 
          content={store.title}
          onClose={()=>this.visibleInfoWindow(index)}
        >
        </InfoWindow>
      );
    });
  }

  /**
   * 저장된 배열의 값을 Option으로 뿌려주는 함수입니다.
   */
  markersListOptView = () => {
    return this.state.list.map((store, index) => {
      return (
      <option 
        key={index} 
        value={index}
      >
          {store.title}
      </option>
      );
    });
  }

  /**
   * 클릭 이벤트를 감지했을때, 받아온 파라미터값을 console로 출력하는 함수 입니다.
   */
  onEventChecker = (e, aug, geo) => {
    // console.log(e);
    // console.log(aug);
    // console.log(geo);
    // console.log(geo.latLng.lat());
    // console.log(geo.latLng.lng());
    // alert("이벤트 발생!");
  }

  /**
   * Input value가 바뀌었을때, state에 저장하는 함수입니다.
   */
  onChangeInput = (e) => {
    this.setState({
      searchText: e.target.value
    });
  }

  /**
   * state 배열값을 저장하는 함수입니다.
   */
  setStores = (e) => {
    this.setState({
      stores : e
    });
  }

  /**
   * 마우스 휠 이벤트가 감지 되었을때 작동할 핸들러입니다.
   */
  onWheelHandler = (delta) => {
    let map = this.mapRef.map;
    // console.log("lat::"+map.center.lat());
    // console.log("lng::"+map.center.lng());
    // console.log("zoom::"+map.zoom);
    if (delta < 0) {
      // console.log("wheel down");
    }
    else {
      // console.log("wheel up");
    }
    this.setState({
      zoomIndex: map.zoom
    });
  }

  /**
   * 그림을 그리는 이벤트
   */
  onDrawEvent = (e, aug, geo) => {
    if (this.state.drawMode) {
      const {drawType} = this.state;
      let lat = geo.latLng.lat();
      let lng = geo.latLng.lng();
      const {google} = this.props;
      let map = this.mapRef.map;
      switch (drawType) {
        case "circle":
          let circle = new google.maps.Circle({
            center: new google.maps.LatLng(lat, lng),
            radius: 60,
            strokeColor: "BLACK",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "RED",
            fillOpacity: 0.35
          });
          circle.setMap(map);
          break;
        
        case "rectangle" : 
          let ractangle = new google.maps.Rectangle({
            strokeColor: '#000000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            bounds: {
              north: lat+0.0005,
              south: lat-0.0005,
              east: lng+0.00058,
              west: lng-0.00058
            }
          });
          ractangle.setMap(map);
          break;

        default:
          break;
      }
    }
  }

  /**
   * 그리기 모드의 boolean값을 반전시킴
   */
  reversBool = () => {
    this.setState({
      drawMode: !this.state.drawMode
    })
  }

  /**
   * 그리기 모드 타입 변경
   */
  setDrawModeType = (e) => {
    this.setState({
      drawType: e.target.value
    })
  }

  /**
   * 마우스 휠 이벤트가 감지 되었을때 작동할 이벤트입니다.
   * 값을 받아 핸들러로 넘겨줍니다.
   */
  onWheelEvent = (event) =>{
    var delta = 0;
    if (!event) event = window.event;
    if (event.wheelDelta) {
        delta = event.wheelDelta/120;
        if (window.opera) delta = -delta;
    } else if (event.detail) delta = -event.detail/3;
    if (delta) this.onWheelHandler(delta);
  }

  /**
   * 웹에서 마우스 휠을 감지했을때, 작동할 이벤트를 설정합니다.
   */
  componentDidMount = () => {
    window.addEventListener("DOMMouseScrol", this.onWheelEvent, false);
    window.onmousewheel = document.onmousewheel = this.onWheelEvent;
  }

  /**
   * 
   */
  sampleDataResult = () => {
    var serviceKey = 'mcwHqOU9aGZ3esLStLdxHsDiFyjkAzl4aBrwnivadMaTZ3ptbeWVfrlZPPiIuSaf1M/h4qycR09Eo6cMSoeiqg==';  // decode 해줍니다.
    var xhr = new XMLHttpRequest();
    var url = 'http://apis.data.go.kr/1750000/FireStatisticsService/FirePlaceGeneralCrntSt'; /*URL*/
    var queryParams = '?ServiceKey=' + serviceKey; /*Service Key*/
    // queryParams += '&' + '' + '=' + ''; /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          console.log(this);
          alert('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
        }
    };
    xhr.send('');
  }

  /**
   * 렌더링
   */
  render() {
    const mapStyles = {
      width: '100%',
      height: '100%',
    };

    const rightMenuStyle = {
      float: "right"
    }
    return (
      <Fragment>
        주소/건물 : <input value={this.state.searchText} onChange={(e) => this.onChangeInput(e)} />
        <button onClick={()=>this.onSearchEvent()}>검색</button>
        <div id="addrList">
          <select id="markerList" onChange={(e)=>this.removeMarkersSelect(e.target.value)}>
            <option value={"null"}>List</option>
            {this.markersListOptView()}
          </select>
          {/* <button onClick={()=>this.removeMarkers()}>Remove</button> */}
          <button onClick={()=>this.sampleDataResult()}>sampleClick</button>
        </div>

        <div>
          <button hidden={this.state.drawMode} onClick={this.reversBool}> 그리기 모드 </button>
          <button hidden={!this.state.drawMode} onClick={this.reversBool}> 그리기 모드 취소</button>
          <select onChange={this.setDrawModeType}>
            <option value="circle">원</option>
            <option value="rectangle">사각형</option>
          </select>
        </div>

        <div onTouchMove={()=>this.onWheelHandler(0)}>
        <Map 
          ref={ref => this.mapRef = ref}
          google={this.props.google}
          zoom={this.state.zoomIndex}
          style={mapStyles}
          initialCenter={{lat: 37.44028337653064, lng: 126.67026155694566}}
          minZoom={9}
          maxZoom={18}
          // onClick={this.addMarkers}
          // zoomControl={this.onEventChecker}
          onZoomChanged={this.onEventChecker} //왜 작동안함??
          // zoomControlOptions // 지도에서 컨트롤러의 위치를 지정하는데 사용 속성은 position
          // onBoundsChanged={this.onEventChecker} //왜안함
          // onCenterChanged={this.onEventChecker} //왜안함
          // scrollwheel={false} //지도에서 휠 이벤트 비활성
          onClick={this.onDrawEvent}
          // onDragend={this.onEventChecker}
          disableDoubleClickZoom //더블클릭 확대 비활성
          zoomControl={false} //우측 하단 확대 컨트롤러 비활성
        >
          {this.displayMarkers(this.state.zoomIndex)}
          {this.displayInfoWindows(this.state.zoomIndex)}
        </Map>
        </div>

        <div style={rightMenuStyle}>
          <div><button>낙뢰 정보</button></div>
          <div><button>우체국 정보</button></div>
          <div><button>우체국 정보</button></div>
          <div><button>우체국 정보</button></div>
          <div><button>우체국 정보</button></div>
          <div><button>우체국 정보</button></div>
        </div>
      </Fragment>
    );
  }
}  

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAmD_faFCkdjHLORQUnr7KPKknyzf5pXsA'
})(App);
