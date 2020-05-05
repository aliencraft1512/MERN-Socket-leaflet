import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/Login';
import Viewer from './components/Viewer';
import Tracker from './components/Tracker';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {Provider} from 'react-redux';
import store from './store';
import Navbarr from './components/Navbarr';
import Loginn from './components/Loginn';
import Cards from './components/Cards';
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div>
    <Router>
      <Route path="/" exact component={Viewer}/>
      <Route path="/cards" exact component={Cards}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/user/:username" exact component={Viewer}/>
      <Route path="/tracker" exact  component={Tracker}/>
    </Router>
      </div>
      </Provider>
    )
  }
}
