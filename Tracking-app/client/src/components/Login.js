import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { loginFunc } from '../actions/authActions';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import Navbar from './Navbar';
import '../css/Login.css';
import Navbarrr from './Navbarrr';

class Login extends Component {
  state = {
    email: '',
    password: '',
  }
  onChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  /* componentDidMount(){
    const store = JSON.parse(localStorage.getItem('login'));
    if(store && store.login)
    {
      this.setState({
        login : true
      })
    }
     
   }*/
  login = async () => {
    const email = this.state.email
    const password = this.state.password
    await axios.post('http://localhost:5000/user/login', { email, password })
      .then(res =>
        localStorage.setItem('login', JSON.stringify(res.data)))
    this.props.loginFunc()

  }
  render() {
    if (this.props.token) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <Navbar></Navbar>
        <Navbarrr></Navbarrr>
        <div className="container row">
          <div className="col-md-3"></div>
          <div id="login" className="col-md-5">
          <img src='/images/keyhole.png' width='50' height='50'></img>
          <span className="p-float-label">
              <InputText tooltip="Enter your email" type="email" size="55" id="in" value={this.state.email} name="email" onChange={this.onChangeInput} />
              <label htmlFor="in">Email</label>
            </span>
       
           
            <i className="pi pi--in" style={{ 'fontSize': '3em' }}></i>

            <span className="p-float-label" >

              <InputText tooltip="Enter your password" type="password" size="55" value={this.state.password} name="password" onChange={this.onChangeInput} />
              <label htmlFor="in">Password</label>
            </span>
            <br></br>
            <Button label="Login" id="loginSubmit" onClick={this.login} className="p-button-raised p-button-rounded" />


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
export default connect(mapStateToProps, { loginFunc })(Login);