import React, { Component } from 'react'
import io from 'socket.io-client';
import axios from 'axios';



let socket;
const ENDPOINT = 'localhost:5000';

export default class Tracker extends Component {

  state = {
    location: {},
    card: '',
  }
  componentDidMount = async ()  => {
    socket = io();
    await axios.get('http://localhost:5000/coordinate/getCard/'+this.props.match.params.id)
            .then(res=>this.setState({
              card:res.data
            }))
   
    this.send()
          }
  send = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude: lat, longitude: lng } = pos.coords
      const card_id = this.props.match.params.id
      const newCoordinate = { lat, lng, card_id};
      const card = this.state.card
      axios.post('http://localhost:5000/coordinate/save', newCoordinate)
        .then(socket.emit('updateLocation', { lat, lng, card}))
    })
     this.intervalID = setInterval(
      () => this.send(),
      5000
    )
  }
  componentWillUnmount() {
    // Clear the interval right before component unmount
    clearInterval(this.intervalID);
}
  onChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <div className="container" style={{textAlign:"center",paddingTop:100}}>
        <h2 style={{marginBottom:20}}>Tracking App</h2>
        
        <img alt="Tracker" style={{marginLeft:0}} height='400' width="400" src='/images/gps.png'></img>
      </div>
    )
  }
}
