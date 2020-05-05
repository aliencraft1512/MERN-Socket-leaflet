import React, { Component } from 'react'
import { connect } from 'react-redux';
import { logoutFunc } from '../actions/authActions';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Menu } from 'primereact/menu';
import { Navbar, ListGroup, Button, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import '../css/Navbarrr.css';

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
            { label: 'Logout', icon: 'pi pi-power-off', command: () => { this.log() } }
        ];
        return (
            <Navbar sticky="top" id='Nav' style={{marginBottom:50}} bg="white" expand="lg">
                <Navbar.Brand><img style={{marginBottom:5}} src="/images/interface.png" width='20' height='20'></img> Tracking </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        
                    </Nav>
                    {
                        this.props.token ?
                            <div>
                                <Link to='/'><Button id='HomeButton' style={{ marginRight: 4 }} >Home</Button></Link>
                                <Link to='/cards'><Button id='cardsButton' style={{ marginRight: 4 }} >Cards</Button></Link>
                                <Menu model={items} popup={true} ref={el => this.menu = el} />
                                <Button id='logout' onClick={(event) => this.menu.toggle(event)} >{this.state.username} </Button>
                            </div>
                            :
                            <div>
                                <Link to='/login'><Button id='loginButton' style={{ marginRight: 4 }} >Login</Button></Link>
                            </div>
                    }
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}
export default connect(mapStateToProps, { logoutFunc })(Navbarrr);