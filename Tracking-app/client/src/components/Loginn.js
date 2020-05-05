import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { loginFunc } from '../actions/authActions';
import Navbar from './Navbar';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://google.com/">
                Tracking app
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Loginn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const classes = useStyles();
    const login = async () => {

        await axios.post('http://localhost:5000/user/login', { email, password })
            .then(res =>
                localStorage.setItem('login', JSON.stringify(res.data)))

        props.loginFunc()
    }
    if (props.token) {
        return <Redirect to='/' />
    }
    return (
        <Container style={{marginTop:150}} component="main" maxWidth="xs">
                  <Navbar></Navbar>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}

                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={login}
                        style={{backgroundColor:"#004d99"}}
                    >
                        Sign In
          </Button>

                </form>
            </div>
            <Box mt={8}>
                <Copyright value="Test" />
            </Box>
        </Container>
    );
}
const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}
export default connect(mapStateToProps, { loginFunc })(Loginn);