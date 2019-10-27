import React from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import logo from './logo.svg';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import hr from './hr.png';
import Button from '@material-ui/core/Button';
export default class LoginForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.login = this.login.bind(this);
    }
    login()
    {
        //axios call
        alert("Hi there!");
    }
    render()
    {
        return(
            <form>
                <CssBaseline />
                <Container maxWidth = 'sm'>
                    {/* <img src = {logo} alt = 'logo' /> */}
                    <Grid container justify = 'center'>
                        <Grid key = {0} item>
                            <img src = {hr} alt = 'logo' width="90" height="90" align = 'middle'/>
                        </Grid>
                        <Grid key = {1} item>
                        <FormControl>
                            <InputLabel htmlFor="account">Tài khoản</InputLabel>
                            <Input id="account" aria-describedby="my-helper-text" />
                            <FormHelperText id="my-helper-text">Vui lòng sử dụng tài khoản chúng tôi đã cung cấp cho bạn.</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="account">Mật khẩu</InputLabel>
                            <Input id="password" aria-describedby="my-helper-text" type = 'password'/>
                            <FormHelperText id="my-helper-text">Vui lòng sử dụng mật khẩu chúng tôi đã cung cấp cho bạn.</FormHelperText>
                        </FormControl>
                        </Grid>
                        <Button type = 'button' onClick = {this.login}>
                            Press to greet!
                        </Button>
                    </Grid>
                </Container>
            </form>
        )
    }
}