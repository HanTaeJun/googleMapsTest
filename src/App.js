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
      zoomIndex: 13,
      removeSelectIndex : "null",

      //화재
      list: [
        {bool: false, index: 0,  latitude: 37.4411558,        longitude: 126.67003090000003, title: "대한민국 인천광역시 남구 학익2동 240-25",    fire: 7,  1: 2,  2:2, 3:3, 4:4, 5:5, 6:6},
        {bool: false, index: 8,  latitude: 37.4441175,        longitude: 126.67451600000004, title: "대한민국 인천광역시 남구 주안3동 867-41",    fire: 9,  1: 4, 2:3, 3:6, 4:8, 5:7, 6:1},
        {bool: false, index: 13, latitude: 37.4504129,        longitude: 126.64440809999996, title: "대한민국 인천광역시 남구 용현동 294-5",      fire: 2,  1: 8, 2:4, 3:5, 4:6, 5:9, 6:8},
        {bool: false, index: 15, latitude: 37.4528081,        longitude: 126.67308780000008, title: "대한민국 인천광역시 남구 주안동 1417-19",    fire: 1,  1: 16, 2:12, 3:10, 4:4, 5:6, 6:7},
        {bool: false, index: 18, latitude: 37.4466905,        longitude: 126.68011999999999, title: "대한민국 인천광역시 남구 주안7동 1269",      fire: 12, 1: 3, 2:7, 3:3, 4:4, 5:3, 6:9},
        {bool: false, index: 19, latitude: 37.44796789999999, longitude: 126.66621170000008, title: "대한민국 인천광역시 남구 용현1.4동 42-18",   fire: 6,  1: 17, 2:8, 3:14, 4:6, 5:12, 6:12},
        {bool: false, index: 21, latitude: 37.4904053,        longitude: 126.72605880000003, title: "대한민국 인천광역시 부평구 부평동 185-78",   fire: 19, 1: 21, 2:2, 3:15, 4:8, 5:4, 6:13},
        {bool: false, index: 23, latitude: 37.5174495,        longitude: 126.72213779999993, title: "대한민국 인천광역시 부평구 갈산동 158-1",    fire: 4,  1: 7, 2:12, 3:33, 4:4, 5:2, 6:14},
        {bool: false, index: 25, latitude: 37.5230906,        longitude: 126.69369299999994, title: "대한민국 인천광역시 부평구 청천동 373-5",    fire: 11, 1: 8, 2:14, 3:23, 4:6, 5:1, 6:15},
        {bool: false, index: 27, latitude: 37.43832597871266, longitude: 126.70685194324413, title: "Dump",                                    fire: 14, 1: 9, 2:3, 3:13, 4:3, 5:5, 6:16},
        {bool: false, index: 27, latitude: 37.454543984466646, longitude: 126.70032881091991, title: "Dump",                                    fire: 3, 1: 8, 2:3, 3:13, 4:3, 5:5, 6:16},
        {bool: false, index: 27, latitude: 37.432055891502905, longitude: 126.72384641956249, title: "Dump",                                    fire: 5, 1: 9, 2:3, 3:13, 4:3, 5:5, 6:16},
        {bool: false, index: 27, latitude: 37.459994625451436, longitude: 126.73139952014843, title: "Dump",                                    fire: 19, 1: 6, 2:3, 3:13, 4:3, 5:5, 6:16},
        {bool: false, index: 27, latitude: 37.407106647869185, longitude: 126.70822523425976, title: "Dump",                                    fire: 15, 1: 3, 2:3, 3:13, 4:3, 5:5, 6:16},
        {bool: false, index: 27, latitude: 37.47375572588545, longitude: 126.64677046131054, title: "Dump",                                    fire: 12, 1: 9, 2:3, 3:13, 4:3, 5:5, 6:16},
        {bool: false, index: 27, latitude: 37.457405620517875, longitude: 126.61398313831249, title: "Dump",                                    fire: 9, 1: 9, 2:3, 3:13, 4:3, 5:5, 6:16},
        {bool: false, index: 27, latitude: 37.47539053975377, longitude: 126.68161772083202, title: "Dump",                                    fire: 11, 1: 9, 2:3, 3:13, 4:3, 5:5, 6:16},
        {bool: false, index: 27, latitude: 37.41269709162503, longitude: 126.72830961536327, title: "Dump",                                    fire: 7, 1: 9, 2:3, 3:13, 4:3, 5:5, 6:16},
        {bool: false, index: 27, latitude: 37.40560670173646, longitude: 126.66548155139843, title: "Dump",                                    fire: 12, 1: 9, 2:3, 3:13, 4:3, 5:5, 6:16},
        {bool: false, index: 27, latitude: 37.403424908302284, longitude: 126.634067519416, title: "Dump",                                    fire: 13, 1: 9, 2:3, 3:13, 4:3, 5:5, 6:16}
      ],

      drawMode: false,
      drawType: "circle",
      
      relation: 0, 
      fire: 0, 
      location: "주소",
      data: "선택 필요",
      num: 0,

      data1: {relation: 0.90},
      data2: {relation: 0.02},
      data3: {relation: 0.01},
      data4: {relation: 0.12},
      data5: {relation: 0.42},
      data6: {relation: 0.37},

      selectView: 0,

      circles : null

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
    const {google} = this.props;
    const {list} = this.state;
    let map = this.mapRef.map;
    let stateData = list;
    if (this.state.selectView===0) return null;

    for (let j=0; j<stateData.length; j++) {
      if (j!==i) {
        stateData[j].bool = false;
      }
    }

    stateData[i].bool = !stateData[i].bool 
    await this.setState({
      list: stateData,
      location: stateData[i].title,
      fire: stateData[i].fire,
      num: stateData[i][this.state.selectView]
    });

    let circle = new google.maps.Circle({
      center: new google.maps.LatLng(stateData[i].latitude, stateData[i].longitude),
      radius: 500,
      strokeColor: "BLACK",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "RED",
      fillOpacity: 0.35
    });

    if (!this.state.circles) {

    } else {
      this.state.circles.setMap(null);
    }

    if (stateData[i].bool) { 
      this.setState({
        circles: circle
      })
      circle.setMap(map);
    } else {
      this.state.circles.setMap(null);
    }
  }

  /**
   * 저장된 배열의 값을 Marker로 뿌려주는 함수입니다.
   */
  displayMarkers = (i) => {
    const {google} = this.props;
    return this.state.list.map((store, index) => {
      return (
        <Marker 
          key={index}
          // icon={"https://developers.google.com/maps/documentation/javascript/images/custom-marker.png"}
          icon= {{
            url: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld='+ store.fire +'|FE6256|000000',// url
            // scaledSize: new google.maps.Size(29, 47), // scaled size
            scaledSize: new google.maps.Size(30, 49), // scaled size
            // origin: new google.maps.Point(0,0), // origin
            // anchor: new google.maps.Point(0, 0) // anchor
          }}
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

  displayLocMarkers = () => {
    // console.log("list"+this.state.selectView);
    // if (this.state.selectView===0) return null;
    // return this.state["list"+this.state.selectView].map((store, index) => {
    //   return (
    //     <Marker
    //       key={index}
    //       position={{
    //         lat: store.latitude,
    //         lng: store.longitude
    //       }} 
    //       icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    //       onClick={() => this.visibleInfoWindow(index)} 
    //     />
    //   )
    // });
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
            lat: store.latitude+0.005,
            lng: store.longitude
          }} 
          // content={store.title+"<br/>화재:"+store.fire}
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
    console.log(e);
    console.log(aug);
    console.log(geo);
    console.log("latitude: " + geo.latLng.lat()+ ", longitude: " +geo.latLng.lng());
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
   * 
   */
  dataTypeChange = (viewNum, data) => {
    const {list} = this.state;
    let stateData = list;

    if (this.state.circles) {
      this.state.circles.setMap(null);
    }
    
    for (let j=0; j<stateData.length; j++) {
      stateData[j].bool = false;
    }
    
    this.setState({
      data : data,
      selectView : viewNum,
      relation: this.state["data"+viewNum].relation,
      num: 0,
      fire: 0,
      location: "주소"
      // num:  this.state["data"+viewNum].num
    });
  }

  /**
   * 렌더링
   */
  render() {
    const mapStyles = {
      width: '80%',
      height: '80%',
      marginLeft: "31%",
      marginBottom: "10px"
    };

    // const rightMenuStyle = {
    //   float: "right"
    // }
    return (
      <Fragment>
        {/* <div hidden>카카오 : https://developers.kakao.com/demo/pay/index
네이버 : https://developer.pay.naver.com/docs/v2/api#getstarted

리액트 네이티브 웹뷰 사용시 모듈 : https://github.com/iamport/iamport-react-native
</div> */}
        <div>
          <div className="title-wrap">
						<strong id="totalCenter"></strong>
						<h3>화재 연관 데이터</h3>
						{/* <p>원하는 지역을 선택하여 <br className="m-br" /> 나에게 가까운 센터를 방문하세요!</p> */}
					</div>
        </div>

        <div>
          <div className="filter-location-wrap">
						<ul id="location-menu-wrap">

              <li id="CNTER001">
								<label>
									<input type="radio" name="location"/>
									<span onClick={() => this.dataTypeChange(1,"낙뢰 위치")}>낙뢰위치</span>
								</label>
							</li>

							<li id="CNTER002">
								<label>
									<input type="radio" name="location"/>
									<span onClick={() => this.dataTypeChange(2,"우체국 위치")}>우체국위치</span>
								</label>
							</li>

							<li id="CNTER003">
								<label>
									<input type="radio" name="location"/>
									<span onClick={() => this.dataTypeChange(3,"전국 약국 위치")}>전국약국위치</span>
								</label>
							</li>

              <br className="m-br" />

							<li id="CNTER004">
								<label>
									<input type="radio" name="location"/>
									<span onClick={() => this.dataTypeChange(4,"등산로 위치")}>등산로위치</span>
								</label>
							</li>

							<li id="CNTER005">
								<label>
									<input type="radio" name="location"/>
									<span onClick={() => this.dataTypeChange(5,"전기 충전소 위치")}>전기충전소위치</span>
								</label>
							</li>

							<li id="CNTER006">
								<label>
									<input type="radio" name="location"/>
									<span onClick={() => this.dataTypeChange(6,"상권 위치")}>상권위치</span>
								</label>
							</li>

						</ul>
					</div>
        </div>

        <div style={{width: "78%", textAlign: "right", marginBottom:"15px"}}>
          <div>연관도 : {this.state.relation}%</div>
          <div>화재발생건수 : {this.state.fire}</div>
          <div>지역좌표 : {this.state.location}</div>
          <div>데이터 명 : {this.state.data}</div>
          <div>수치 : {this.state.num}</div>
        </div>

        {/* 주소/건물 : <input value={this.state.searchText} onChange={(e) => this.onChangeInput(e)} />
        <button onClick={()=>this.onSearchEvent()}>검색</button> */}
        <div id="addrList">
          {/* <select id="markerList" onChange={(e)=>this.removeMarkersSelect(e.target.value)}>
            <option value={"null"}>List</option>
            {this.markersListOptView()}
          </select> */}
          {/* <button onClick={()=>this.removeMarkers()}>Remove</button> */}
          {/* <button onClick={()=>this.sampleDataResult()}>sampleClick</button> */}
        </div>

        {/* <div>
          <button hidden={this.state.drawMode} onClick={this.reversBool}> 그리기 모드 </button>
          <button hidden={!this.state.drawMode} onClick={this.reversBool}> 그리기 모드 취소</button>
          <select onChange={this.setDrawModeType}>
            <option value="circle">원</option>
            <option value="rectangle">사각형</option>
          </select>
        </div> */}

        <div className="mapsWrap" onTouchMove={()=>this.onWheelHandler(0)}>
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
          scrollwheel={false} //지도에서 휠 이벤트 비활성
          onClick={this.onDrawEvent}
          // onDragend={this.onEventChecker}
          disableDoubleClickZoom //더블클릭 확대 비활성
          zoomControl={false} //우측 하단 확대 컨트롤러 비활성
        >
          {this.displayMarkers(this.state.zoomIndex)}
          {this.displayInfoWindows(this.state.zoomIndex)}
          {this.displayLocMarkers(this.state.zoomIndex)}
        </Map>
        </div>

        {/* <div style={rightMenuStyle}>
          <div><button onClick={() => this.dataTypeChange(1,"낙뢰 위치")}>낙뢰 위치</button></div>
          <div><button onClick={() => this.dataTypeChange(2,"우체국 위치")}>우체국 위치</button></div>
          <div><button onClick={() => this.dataTypeChange(3,"전국 약국 위치")}>전국 약국 위치</button></div>
          <div><button onClick={() => this.dataTypeChange(4,"등산로 위치")}>등산로 위치</button></div>
          <div><button onClick={() => this.dataTypeChange(5,"전기 충전소 위치")}>전기 충전소 위치</button></div>
          <div><button onClick={() => this.dataTypeChange(6,"상권 위치")}>상권 위치</button></div>
        </div> */}

        {/* <div style={{clear:"both"}}></div>

        <div style={{marginTop:"30%"}}>
          <div>연관도 : {this.state.relation}%</div>
          <div>화재발생건수 : {this.state.fire}</div>
          <div>지역좌표 : {this.state.location}</div>
          <div>데이터 명 : {this.state.data}</div>
          <div>수치 : {this.state.num}</div>
        </div> */}

      </Fragment>
    );
  }
}  

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAmD_faFCkdjHLORQUnr7KPKknyzf5pXsA'
})(App);
