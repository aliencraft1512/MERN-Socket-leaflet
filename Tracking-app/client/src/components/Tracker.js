import React, { Component } from 'react'
import io from 'socket.io-client';
import axios from 'axios';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';


let socket;
const ENDPOINT = 'localhost:5000';

export default class Tracker extends Component {
  
  state = {
    location : {},
    pucename : '',
    username : '',
  }
  componentDidMount(){
    socket = io(ENDPOINT);   
  }
  send = () => {

    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude: lat, longitude: lng } =  pos.coords
      const pucename =  this.state.pucename
      const username =  this.state.username
      const newAdd = {lat,lng,pucename,username,pucename};
    axios.post('http://localhost:5000/carte/save',newAdd)
        .then(res => console.log(res.data)) 
        .then(socket.emit('updateLocation', { lat, lng , pucename , username}))
        .then(socket.emit('join', this.state.username))
        .then(
           this.intervalID = setInterval(
          () => this.send(),
          10000
        )
        )
       
    });
  }
    
onChangeInput = (e) => {
  this.setState({
    [e.target.name] : e.target.value
  })
}
  render() {
    return (
      <div style={{marginTop:100}}>
         <span className="p-float-label">
              <InputText id="in" value={this.state.pucename} name="pucename" onChange={this.onChangeInput} />
              <label htmlFor="in">pucename</label>
          </span>
          <br></br>
          <span className="p-float-label">
              <InputText id="in" value={this.state.username} name="username" onChange={this.onChangeInput} />
              <label htmlFor="in">Username</label>
          </span>
          <br></br>

          <Button label="Send location" onClick={this.send} className="p-button-raised p-button-rounded" />

      </div>
    )
  }
}
