import React, { Component } from 'react'
import axios from 'axios';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { loginFunc } from '../actions/authActions';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Navbar from './Navbar';
import '../css/Login.css';
import { Messages } from 'primereact/messages';

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
  showError(error) {
    this.messages.show({ severity: 'error', summary: 'Error Message', detail: error });
  }
  login = () => {
    const email = this.state.email
    const password = this.state.password
    axios.post('http://localhost:5000/user/login', { email, password })
      .then(res => {
        localStorage.setItem('login', JSON.stringify(res.data))
        this.props.loginFunc()
      })

      .catch(error => {
        this.showError(error.response.data)
        this.setState({
          password:''
        })
      })
  }
  render() {
    if (this.props.token) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <Navbar></Navbar>
        <div className="container row">
          <div className="col-md-5"> <Messages ref={(el) => this.messages = el}></Messages></div>
          <div id="login" className="col-md-5">
            <img alt='loginLogo' src='/images/keyhole.png' width='50' height='50'></img>
            <div style={{ marginBottom: 15, fontSize: 25, marginLeft:"42%" }}>Sign In</div>
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
            <span style={{marginLeft:"40%",fontSize:12}}>Don't have an account? <Link to="/register">Sign Up</Link></span>


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