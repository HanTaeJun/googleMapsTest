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
      list1: [
        {bool: false,          index: 0,          latitude: 37.4411558,          longitude: 126.67003090000003,          title: "대한민국 인천광역시 남구 학익2동 240-25"},
        {bool: false,          index: 1,          latitude: 37.440641,           longitude: 126.6703,                    title: "대한민국 인천광역시 학익동 미추홀구평생학습관"},
        {bool: false,          index: 2,          latitude: 37.4402052,          longitude: 126.67002649999995,          title: "대한민국 인천광역시 남구 학익동 660-5"},
        {bool: false,          index: 3,          latitude: 37.4400448,          longitude: 126.66941989999998,          title: "대한민국 인천광역시 남구 학익동 659-6"},
        {bool: false,          index: 4,          latitude: 37.4407669,          longitude: 126.66880879999997,          title: "대한민국 인천광역시 남구 학익동 657-1"},
        {bool: false,          index: 5,          latitude: 37.4399693,          longitude: 126.67019679999999,          title: "대한민국 인천광역시 남구 학익1동 660-20"},
        {bool: false,          index: 6,          latitude: 37.4400726,          longitude: 126.67350280000005,          title: "대한민국 인천광역시 남구 학익동 125-1"},
        {bool: false,          index: 7,          latitude: 37.4428227,          longitude: 126.67291039999998,          title: "대한민국 인천광역시 남구 학익2동 40-31"},
        {bool: false,          index: 8,          latitude: 37.4441175,          longitude: 126.67451600000004,          title: "대한민국 인천광역시 남구 주안3동 867-41"},
        {bool: false,          index: 9,          latitude: 37.4415635,          longitude: 126.65842529999998,          title: "대한민국 인천광역시 남구 학익1동 467-2"},
        {bool: false,          index: 10,         latitude: 37.4390767,          longitude: 126.65541200000007,          title: "대한민국 인천광역시 남구 학익1동 561-1"},
        {bool: false,          index: 11,         latitude: 37.4443742,          longitude: 126.65544939999995,          title: "대한민국 인천광역시 남구 학익1동 628-34"},
        {bool: false,          index: 12,         latitude: 37.4439645,          longitude: 126.66173989999993,          title: "대한민국 인천광역시 남구 학익1동 437-6"},
        {bool: false,          index: 13,         latitude: 37.4504129,          longitude: 126.64440809999996,          title: "대한민국 인천광역시 남구 용현동 294-5"},
        {bool: false,          index: 14,         latitude: 37.447289,           longitude: 126.6514836,                 title: "대한민국 인천광역시 남구 용현동 286-4"},
        {bool: false,          index: 15,         latitude: 37.4528081,          longitude: 126.67308780000008,          title: "대한민국 인천광역시 남구 주안동 1417-19"},
        {bool: false,          index: 16,         latitude: 37.4421358,          longitude: 126.66289230000007,          title: "대한민국 인천광역시 남구 학익1동 259-31"},
        {bool: false,          index: 17,         latitude: 37.4396298,          longitude: 126.68025990000001,          title: "대한민국 인천광역시 남구 문학동 매소홀로535번길 27"},
        {bool: false,          index: 18,         latitude: 37.4466905,          longitude: 126.68011999999999,          title: "대한민국 인천광역시 남구 주안7동 1269"},
        {bool: false,          index: 19,         latitude: 37.44796789999999,   longitude: 126.66621170000008,          title: "대한민국 인천광역시 남구 용현1.4동 42-18"},
        {bool: false,          index: 20,         latitude: 37.4486551,          longitude: 126.65822860000003,          title: "대한민국 인천광역시 남구 학익동 335-1"},
        {bool: false,          index: 21,         latitude: 37.4904053,          longitude: 126.72605880000003,          title: "대한민국 인천광역시 부평구 부평동 185-78"},
        {bool: false,          index: 22,         latitude: 37.4901538,          longitude: 126.7260685,                 title: "대한민국 인천광역시 부평구 부평동 광장로24번길"},
        {bool: false,          index: 23,         latitude: 37.5174495,          longitude: 126.72213779999993,          title: "대한민국 인천광역시 부평구 갈산동 158-1"},
        {bool: false,          index: 24,         latitude: 37.5173603,          longitude: 126.72213250000004,          title: "대한민국 인천광역시 부평구 갈산1동 158-9"},
        {bool: false,          index: 25,         latitude: 37.5230906,          longitude: 126.69369299999994,          title: "대한민국 인천광역시 부평구 청천동 373-5"},
        {bool: false,          index: 26,         latitude: 37.5230751,          longitude: 126.69327939999994,          title: "대한민국 인천광역시 부평구 청천1동 373-4"},
        {bool: false,          index: 27,         latitude: 37.4946849,          longitude: 126.78864620000002,          title: "대한민국 경기도 부천시 원미구 원미동 86-22"}
      ],
      list2: [
        {bool: false,          index: 0,          latitude: 37.4398736,          longitude: 126.65239689999999,          title: "대한민국 인천광역시 남구 학익동"},
        {bool: false,          index: 1,          latitude: 37.4464052,          longitude: 126.66750290000004,          title: "대한민국 인천광역시 남구 학익2동"},
        {bool: false,          index: 2,          latitude: 37.4447945,          longitude: 126.67394730000001,          title: "대한민국 인천광역시 남구 주안3동"},
        {bool: false,          index: 3,          latitude: 37.45620890000001,   longitude: 126.65980939999997,          title: "대한민국 인천광역시 남구 용현1.4동"},
        {bool: false,          index: 4,          latitude: 37.4506175,          longitude: 126.64188379999996,          title: "대한민국 인천광역시 남구 용현동"},
        {bool: false,          index: 5,          latitude: 37.4483491,          longitude: 126.67764080000006,          title: "대한민국 인천광역시 남구 주안7동"},
        {bool: false,          index: 6,          latitude: 37.4376286,          longitude: 126.68502940000008,          title: "대한민국 인천광역시 남구 문학동"},
        {bool: false,          index: 7,          latitude: 37.4931159,          longitude: 126.72430650000001,          title: "대한민국 인천광역시 부평구 부평동"},
        {bool: false,          index: 8,          latitude: 37.5135316,          longitude: 126.72631460000002,          title: "대한민국 인천광역시 부평구 갈산동"},
        {bool: false,          index: 9,          latitude: 37.5188971,          longitude: 126.70458589999998,          title: "대한민국 인천광역시 부평구 청천동"},
        {bool: false,          index: 10,         latitude: 37.4951255,          longitude: 126.7924726,                 title: "대한민국 경기도 부천시 원미구 원미동"}
      ],
      list3: [
        {bool: false,          index: 0,          latitude: 37.4636808,          longitude: 126.65047709999999,          title: "대한민국 인천광역시 남구"},
        {bool: false,          index: 1,          latitude: 37.5069818,          longitude: 126.72177390000002,          title: "대한민국 인천광역시 부평구"},
        {bool: false,          index: 2,          latitude: 37.4965952,          longitude: 126.78707380000003,          title: "대한민국 경기도 부천시 원미구"},
      ],
      list4: [
        {bool: false,          index: 0,          latitude: 37.5034138,          longitude: 126.76603090000003,          title: "대한민국 경기도 부천시"},
        {bool: false,          index: 1,          latitude: 37.4562557,          longitude: 126.70520620000002,          title: "대한민국 인천광역시"}
      ],
      list5: [
        {bool: false,          index: 0,          latitude: 37.4562557,          longitude: 126.70520620000002,          title: "대한민국 인천광역시"},
        {bool: false,          index: 1,          latitude: 37.41379999999999,   longitude: 127.51829999999995,          title: "대한민국 경기도"}
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
    if (i<=9) {
      return this.state.list5.map((store, index) => {
        return (
          <Marker 
            key={index}
            icon={"https://developers.google.com/maps/documentation/javascript/images/custom-marker.png"}
            position={{
              lat: store.latitude,
              lng: store.longitude
            }} 
            // visible = {this.state.zoomIndex < 15 ? false : true}
            onClick={() => this.visibleInfoWindow(index)} 
          />
        );
      });
    } else if (i<=11) {
      return this.state.list4.map((store, index) => {
        return (
          <Marker 
            key={index}
            position={{
              lat: store.latitude,
              lng: store.longitude
            }} 
            // visible = {this.state.zoomIndex < 15 ? false : true}
            onClick={() => this.visibleInfoWindow(index)} 
          />
        );
      });
    } else if (i<=13) {
      return this.state.list3.map((store, index) => {
        return (
          <Marker 
            key={index}
            position={{
              lat: store.latitude,
              lng: store.longitude
            }} 
            // visible = {this.state.zoomIndex < 15 ? false : true}
            onClick={() => this.visibleInfoWindow(index)} 
          />
        );
      });
    } else if (i<=15) {
      return this.state.list2.map((store, index) => {
        return (
          <Marker 
            key={index}
            position={{
              lat: store.latitude,
              lng: store.longitude
            }} 
            // visible = {this.state.zoomIndex < 15 ? false : true}
            onClick={() => this.visibleInfoWindow(index)} 
          />
        );
      });
    } else if (i<=18) {
      return this.state.list1.map((store, index) => {
        return (
          <Marker 
            key={index}
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
    if (i<=9) {
      return this.state.list5.map((store, index) => {
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
    } else if (i<=11) {
      return this.state.list4.map((store, index) => {
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
    } else if (i<=13) {
      return this.state.list3.map((store, index) => {
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
    } else if (i<=15) {
      return this.state.list2.map((store, index) => {
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
    } else if (i<=18) {
      return this.state.list1.map((store, index) => {
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
  }

  /**
   * 저장된 배열의 값을 Option으로 뿌려주는 함수입니다.
   */
  markersListOptView = () => {
    return this.state.list1.map((store, index) => {
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
   * 렌더링
   */
  render() {
    const mapStyles = {
      width: '100%',
      height: '95%',
    };
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
      </Fragment>
    );
  }
}  

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAmD_faFCkdjHLORQUnr7KPKknyzf5pXsA'
})(App);
