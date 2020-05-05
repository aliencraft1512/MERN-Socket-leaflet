import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { logoutFunc } from '../actions/authActions';
import { Redirect } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Menu } from 'primereact/menu';
import axios from 'axios';
import '../css/Navbar.css';

class Navbar extends Component {
  state = {
    username: ''
  }
  log = () => {
    localStorage.removeItem('login')
    this.props.logoutFunc();
    return <Redirect to='/login' />
  }
  componentDidMount() {
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
            username: res.data.username
          })
        })

    }
  }
  render() {
    let items = [
      { label: 'Profil', icon: 'pi pi-user' },
      { label: 'Logout', icon: 'pi pi-power-off', command: () => { this.log() } }
    ];
    return (
      <div style={{ marginBottom: 70 }}>
        <Menubar id="bar">
          {
            this.props.token ?
              <div>

                <Link to='/'><Button label="Home" id='HomeButton' style={{ marginRight: 4 }} /></Link>
                <Link to='/cards'><Button label="Cards" id='cardsButton' style={{ marginRight: 4 }} /></Link>
                <Menu model={items} popup={true} ref={el => this.menu = el} />
                <Button id='logout' label={this.state.username} onClick={(event) => this.menu.toggle(event)} />
              </div>
              :
              <div>
                <Link to='/login'><Button label="Login" id='loginButton' style={{ marginRight: 4 }} /></Link>

              </div>
          }
        </Menubar>




      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  }
}
export default connect(mapStateToProps, { logoutFunc })(Navbar);