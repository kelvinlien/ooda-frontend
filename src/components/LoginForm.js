import React from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import user from '../drawable/user.svg';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import qs from 'querystring';
import history from '../history';
import {clear} from '../LocalStorage'
import Snackbar from './CustomSnackbar'

export default class LoginForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            url : 'oauth/token/',
            username : '',
            password : '',
            showNoti : false
        }
        this.login = this.login.bind(this);
        this.saveToState = this.saveToState.bind(this);
        this.handleClose = this.handleClose.bind(this);
        clear();
    }
    handleClose()
    {
        this.setState(() => ({
            showNoti : false
        }))
    }
    
    login()
    {
        let _this = this;
        axios({
            url : _this.state.url,
            baseURL : _this.props.baseURL,
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
            let userInfo = response['data']['user'];            
            let accessToken = response['data']['accessToken'];   
            _this.props.magicPhrase(accessToken, userInfo);
            history.push('/lobby/profile');
        })
        .catch(function(error){
            console.log(error);
            _this.setState(() => ({
                showNoti : true
            }));
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
    render()
    {
        return(
            <>
                <CssBaseline />
                <Container maxWidth = 'xs'>
                    {/* <img src = {logo} alt = 'logo' /> */}
                    <Grid 
                    container
                    justify = 'center' 
                    >
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
                        <Button 
                        type = 'button' 
                        onClick = {this.login} 
                        color = 'primary' 
                        variant = 'outlined'
                        >
                            Đăng nhập
                        </Button>
                    </Grid>
                </Container>
                <Snackbar
                message = "Bad request. Please double check your username and password!"
                variant = "error"
                showNoti = {this.state.showNoti}
                handleClose = {this.handleClose}
                />
            </>
        )
    }
}