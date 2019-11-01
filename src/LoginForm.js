import React from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import user from './user.svg';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import qs from 'querystring';
export default class LoginForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            url : 'http://localhost:2109/oauth/token/',
            username : '',
            password : '',
            accessible : false
        }
        this.login = this.login.bind(this);
        this.saveToState = this.saveToState.bind(this);
    }
    login()
    {
        let _this = this;
        axios({
            url : _this.state.url,
            method : 'post',
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            data : qs.stringify({
                'grant_type' : 'password',
                'username' : _this.state.username,
                'password' : _this.state.password
            }),
            auth: {
                username: 'ooda',
                password: 'secret'
              }
        })
        .then(function(response)
        {
            let role = response['data']['user']['role'];
            alert("Welcome aboard! Your current role is " + role + '.');
            _this.setState(()=>({
                accessible : true
            }));
        })
        .catch(function(error){
            // alert(error);
            alert("Bad request. Please double check your username and password!");
        })
    }
    saveToState(e)
    {
        let id = e.target.id;
        let value = e.target.value;
        this.setState(()=>({
            [id] : value
        }))
    }
    lobby()
    {
        return (
            <div>
                <button>HR only</button>
            </div>
        );
    }
    render()
    {
        let router = [];
        if (this.state.accessible)
        {
            router.push(
                <Router>
                    <div>
                        <nav>
                            <Link to = "/lobby">Lobby</Link>
                        </nav>
                        <Switch>
                            <Route path = "/lobby">
                                {this.lobby}
                            </Route>
                        </Switch>
                    </div>
                </Router>
            )
        }
        console.log(this.state);
        return(
            <form>
                <CssBaseline />
                <Container maxWidth = 'xs'>
                    {/* <img src = {logo} alt = 'logo' /> */}
                    <Grid container justify = 'center'>
                        <Grid key = {0} item>
                            <img src={user} alt = 'logo' width="150" height="150" align = 'middle'/>
                        </Grid>
                        <Grid key = {1} item>
                            <FormControl>
                                <InputLabel htmlFor="account">Tài khoản</InputLabel>
                                <Input id="username" aria-describedby="my-helper-text" value = {this.state.username} onChange = {e => this.saveToState(e)}/>
                                <FormHelperText id="my-helper-text">Vui lòng sử dụng tài khoản chúng tôi đã cung cấp cho bạn.</FormHelperText>
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="account">Mật khẩu</InputLabel>
                                <Input id="password" aria-describedby="my-helper-text" type = 'password'value = {this.state.password} onChange = {e => this.saveToState(e)}/>
                                <FormHelperText id="my-helper-text">Vui lòng sử dụng mật khẩu chúng tôi đã cung cấp cho bạn.</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Button type = 'button' onClick = {this.login} color = 'primary' variant = 'outlined'>
                            Đăng nhập
                        </Button>
                    </Grid>
                    {router}
                </Container>
            </form>
        )
    }
}