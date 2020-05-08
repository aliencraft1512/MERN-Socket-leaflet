import React, { Component } from 'react'
import axios from 'axios';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Navbar from './Navbar';
import '../css/Register.css';
import { Messages } from 'primereact/messages';
import {Password} from 'primereact/password';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    register: false
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
  showError(err) {
    this.messages.show({ severity: 'error', summary: 'Error Message', detail: err });
  }
  register = async () => {
    const username = this.state.username
    const email = this.state.email
    const password = this.state.password
    const user = await axios.post('http://localhost:5000/user/register', { username, email, password })
      .then()
      .catch(error => {
        this.showError(error.response.data)
      })
    if (user) {
      this.props.history.push('/login')
    }
  }
  render() {
    if (this.state.register) {
      return <Redirect to='/login' />
    }
    if (this.props.token) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <Navbar></Navbar>
        <div className="container row">
          <div className="col-md-5"> <Messages ref={(el) => this.messages = el}></Messages></div>
          <div id="register" style={{ textAlign: "center" }} className="col-md-5">
            <div style={{ marginBottom: 15, fontSize: 25 }}>Sign Up</div>
            <span className="p-float-label">
              <InputText tooltip="Enter your username" type="text" size="55" value={this.state.username} name="username" onChange={this.onChangeInput} />
              <label htmlFor="in">Username</label>
            </span>


            <i className="pi pi--in" style={{ 'fontSize': '3em' }}></i>

            <span className="p-float-label">
              <InputText tooltip="Enter your email" type="email" size="55" value={this.state.email} name="email" onChange={this.onChangeInput} />
              <label htmlFor="in">Email</label>
            </span>


            <i className="pi pi--in" style={{ 'fontSize': '3em' }}></i>

            <span className="p-float-label" >
            <Password value={this.state.password} tooltip="Enter your password" size="55" name="password"  onChange={this.onChangeInput} />
              <label htmlFor="in">Password</label>
            </span>

            <br></br>
            <Button label="Sign up" style={{ padding: "0px 40%" }} id="registerSubmit" onClick={this.register} className="p-button-raised p-button-rounded" />
            <div style={{ fontSize: 12, marginTop: "10%" }}>Your Username and password must be at least 6 characters long and cannot contain whitespace.</div>
            <div style={{ fontSize: 12, marginRight: "60%" }}>Already registered? <Link to="/login">Sign in</Link></div>
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
export default connect(mapStateToProps, null)(Register);