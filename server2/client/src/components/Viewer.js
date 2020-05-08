
import React, { Component } from 'react'
import io from 'socket.io-client';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Basemap from './Basemaps';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { logoutFunc } from '../actions/authActions';
import axios from 'axios';
import Navbar from './Navbar';
import { ListGroup } from 'react-bootstrap';
import '../css/Viewer.css';


var myIcon = L.icon({
  iconUrl: '/images/interface.png',
  iconSize: [28, 30],
  iconAnchor: [14, 30], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -41],


});


let socket;
const ENDPOINT = 'localhost:5000';
class Viewer extends Component {
  state = {
    location: [],
    lat: 31.830153700000004,
    lng: -7.3157547,
    zoom: 5,
    isMapInit: false,
    basemap: 'osm',
    username: '',
    userId : null
  }
  onBMChange = (bm) => {
    // console.log(this);
    this.setState({
      basemap: bm
    });
  }


  componentDidMount =  async ()  =>{
    if (this.props.token) {
      axios.get('http://localhost:5000/user/me',
        {
          headers: {
            "x-auth-token": this.props.token
          }
        }
      )
        .then(res => {
          this.setState({
            username: res.data.username,
            userId:res.data._id
          })
        })
        if (this.props.token) {
        const cards = await axios.get('http://localhost:5000/cards/getCards',
            {
              headers: {
                "x-auth-token": this.props.token
              }
            }
          )
           console.log(cards)
    
        }

    }
    socket = io();
    //socket.emit('join', this.state.username);
    socket.on('locationsUpdate', locations => {

      this.setState({
        location: locations,
        locationsfiltred: this.state.location
      })
      console.log(this.state.location)

    })

    this.reqLocations()
  }

  reqLocations = () =>{
    setInterval(() => {
      socket.emit('requestLocations', this.state.userId)
    }, 5000)
  }
  componentWillUnmount() {
    // Clear the interval right before component unmount
    clearInterval(this.intervalID);
}
  render() {
    if (!this.props.token) {
      return <Redirect to='/login' />
    }

    const basemapsDict = {
      osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      hot: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
      dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
      cycle: "https://dev.{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
    }
    const position = [this.state.lat, this.state.lng]
    return (
      <div>
       <Navbar></Navbar>
        <div className="flex-container">
          <div style={{ flexGrow: 8 }}>
            <Map className="map" center={position} zoom={this.state.zoom} >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <TileLayer
                // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url={basemapsDict[this.state.basemap]}
              />
              <Basemap basemap={this.state.basemap} onChange={this.onBMChange} />




              {this.state.location.map((cor, index) => {
                return (
                  <Marker key={`marker-${index}`} position={cor[1]} icon={myIcon}>
                    <Popup>
                      {cor[1].card.name}<br />
                    </Popup>
                  </Marker>
                )
              })}
            </Map>
          </div>
          <div style={{ flexGrow: 1 }} id="list">



            {this.state.location.map((elemen, index) => {
              return (
                <div key={index}>

                  <ListGroup.Item className="py-0" style={{ fontSize: '1.5rem', paddingBottom: '0px', paddingTop: '0px' }} action variant="success">



                    <span >{elemen[1].card.name}</span>




                  </ListGroup.Item>

                </div>
              )
            })}


          </div>


        </div>

      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  }
}
export default connect(mapStateToProps, { logoutFunc })(Viewer);
/*
import React, { Component } from 'react';
import Control from 'react-leaflet-control';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';

export default class Viewer extends Component {

   state = {
      center: [51.3, 0.7]
    }
  render(){
    return(
      <div>
<Map
    className="map"
      center={this.state.center}
      zoom={10}
    >
      <ZoomControl position="topright" />
      <TileLayer
        url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        maxZoom={18}
      />

      <Control position="topleft" >
        <button
          onClick={ () => this.setState({bounds: [51.3, 0.7]}) }
        >
          Reset View
        </button>
      </Control>
    </Map>
      </div>

    )

  }
}*/

/*
import React, { Component } from "react";
import LeafletReactTrackPlayer from "leaflet-react-track-player";
import demo from "./demo";
import { Map, TileLayer } from "react-leaflet";
import './App.css';



export default class Viewer extends Component {
  state = {
    lat: 47.445745,
    lng: 40.272891666666666,
    zoom: 15,
    type: "distance",
    demo: demo
  };

  render() {
    const position = [demo[0].lat, demo[0].lng];
    return (
      <div className="map">
        <Map className="map" center={position} zoom={this.state.zoom}>
          <LeafletReactTrackPlayer
            track={this.state.demo}
            optionMultyIdxFn={function(p) {
              return p.status;
            }}
            optionsMulty={[
              { color: "#b1b1b1" },
              { color: "#06a9f5" },
              { color: "#202020" },
              { color: "#D10B41" },
              { color: "#78c800" }
            ]}
            progressFormat={this.state.type}
            customMarker={true}
            changeCourseCustomMarker={true}
            iconCustomMarker={"/img/mech.svg"}
          />
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Map>
      </div>
    );
  }
}

*/