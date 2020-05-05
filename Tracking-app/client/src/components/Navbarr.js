import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { logoutFunc } from '../actions/authActions';
import { Redirect } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useState } from 'react';
import axios from 'axios';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
function Navbarr(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [username, setUsername] = useState('');

 
  const log = () => {
    localStorage.removeItem('login')
    props.logoutFunc();
    return <Redirect to='/login' />
  }
  useEffect(()=>{
    if(props.token){
      axios.get('http://localhost:5000/user/me',
     { 
         headers: {
          "x-auth-token" : props.token
         }
     }
     )
      .then(res=>{
         setUsername(res.data.username)
     })
      
    }
  })
  return (
    <div>
      <div className={classes.root}>
        <AppBar style={{ backgroundColor: '#004d99', fontFamily: "monospace" }} position="fixed">
          <Toolbar >
            
          <Typography style={{fontFamily: "monospace"}} variant="h6" className={classes.title}>
              Tracking app
          </Typography>
            {
              props.token ? 
              <div>
                 {username}
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      <AccountCircleOutlinedIcon style={{color:"white"}}></AccountCircleOutlinedIcon>
      </Button>
      <Menu
      style={{marginTop:37}}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={log} >logout</MenuItem>
        
      </Menu>
              </div>
               

                :
                <Button color="inherit"><Link style={{ color: 'inherit', textDecoration: 'inherit', fontFamily: "monospace" }} to="/login">Login</Link></Button>

                
            }
      
          </Toolbar>
        </AppBar>
      </div>

    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  }
}
export default connect(mapStateToProps, { logoutFunc })(Navbarr);