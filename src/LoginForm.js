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
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import user from './user.svg';
import Button from '@material-ui/core/Button';
export default class LoginForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            url : 'localhost:2109/oauth/token/',
            account : '',
            password : ''
        }
        this.login = this.login.bind(this);
        this.saveToState = this.saveToState.bind(this);
    }
    login()
    {
        // axios.get
        alert("Hello there!");
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
                                <Input id="account" aria-describedby="my-helper-text" value = {this.state.account} onChange = {e => this.saveToState(e)}/>
                                <FormHelperText id="my-helper-text">Vui lòng sử dụng tài khoản chúng tôi đã cung cấp cho bạn.</FormHelperText>
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="account">Mật khẩu</InputLabel>
                                <Input id="password" aria-describedby="my-helper-text" type = 'password'value = {this.state.password} onChange = {e => this.saveToState(e)}/>
                                <FormHelperText id="my-helper-text">Vui lòng sử dụng mật khẩu chúng tôi đã cung cấp cho bạn.</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Button type = 'button' onClick = {this.login} color = 'primary' variant = 'outlined'>
                            Press to greet!
                        </Button>
                    </Grid>
                </Container>
            </form>
        )
    }
}