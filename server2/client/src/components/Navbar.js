import React, { Component } from 'react'
import { connect } from 'react-redux';
import { logoutFunc } from '../actions/authActions';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { Link , NavLink} from 'react-router-dom'
import { Menu } from 'primereact/menu';
import { Navbar, Button, Nav } from 'react-bootstrap';
import '../css/Navbar.css';

class Navbarrr extends Component {
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
            { label: 'Log out', icon: 'pi pi-power-off', command: () => { this.log() } }
        ];
        return (
            <Navbar sticky="top" id='Nav' style={{ marginBottom: 50 }} bg="white" expand="lg">
                <Navbar.Brand><img style={{ marginBottom: 5 }} alt='logo' src="/images/interface.png" width='20' height='20'></img> Tracking </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                    </Nav>
                    {
                        this.props.token ?
                            <div className="flex-nav" style={{ marginBottom: 0,paddingTop:0 }}>
                                <div style={{ flexGrow: 1  ,paddingTop:5 }}>
                                <NavLink className="main-nav"  to='/' >Home</NavLink>

                                </div>
                                <div style={{ flexGrow: 1,paddingTop:5, marginLeft:20 }}>
                                <NavLink className="main-nav"   to='/cards'>Cards</NavLink>

                                </div>
                                <div style={{ flexGrow: 1,marginRight:25,paddingTop:0, marginLeft:20}}>
                                <img alt='user' id="logout" src="/images/social.png" height="30" style={{marginBottom:"0px"}} width="30" onClick={(event) => this.menu.toggle(event)}></img>

                                </div>
                                <Menu model={items} popup={true} ref={el => this.menu = el} />

                            </div>
                            :
                            <div>
                                <Link to='/login'><Button id='loginButton' style={{ marginRight: 4 }} >Sign In</Button></Link>
                            </div>
                    }
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
    }
}
export default connect(mapStateToProps, { logoutFunc })(Navbarrr);