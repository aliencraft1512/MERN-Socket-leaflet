import React, { Component } from 'react'
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {logoutFunc} from '../actions/authActions';
class Home extends Component {
   
    componentDidMount(){
        

    }
    render() {
        return (
            <div>
                Home marhba bik nta kain a Hamza 
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        token : state.auth.token
    }
  }
  export default connect(mapStateToProps,{logoutFunc})(Home);