import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/Login';
import Viewer from './components/Viewer';
import Tracker from './components/Tracker';
import {Provider} from 'react-redux';
import store from './store';
import Cards from './components/Cards';
import RouteCard from './components/RouteCard';
import Register from './components/Register';
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div>
    <Router>
      <Route path="/" exact component={Viewer}/>
      <Route path="/cards" exact component={Cards}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/user/:username" exact component={Viewer}/>
      <Route path="/tracker/:id" exact  component={Tracker}/>
      <Route path="/Route/:id" exact component={RouteCard}/>
    </Router>
      </div>
      </Provider>
    )
  }
}
