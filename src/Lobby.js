import React from 'react';
import axios from 'axios';
import {Container, Button, AppBar, Drawer, Toolbar, IconButton, Typography} from '@material-ui/core';
import MiniDrawer from './MiniDrawer.js';
export default class Lobby extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            url : 'protected/ping/',
            openDrawer : false
        }
        this.checkRole = this.checkRole.bind(this);
    }
    checkRole()
    {
        let _this = this;
        axios({
            url : this.state.url,
            baseURL : _this.props.baseURL,
            method : 'get',
            headers: {'Authorization': "Bearer " + _this.props.accessToken}
        })
        .then(function(response){
            console.log(response);
            alert('Welcome to da club');
        })
        .catch(function(error){
            let statusCode = error.response.status;
            if ( statusCode === 401)
            {
                alert(error.response.data.message);
                window.open('../','_self');
            }
        })
    }
    logOut()
    {
      window.open('../','_self');
    }
    openDrawer()
    {
      this.setState(() => ({
        openDrawer : true
      }));
    }
    closeDrawer()
    {
      this.setState(() => ({
        openDrawer : false
      }));
    }
    render()
    {
      console.log(this.state);
        return(
            <Container maxWidth = 'false'>
                <MiniDrawer role = 'hr' name = 'Kelvin' logOut = {() => this.logOut()}/>
                {
                this.props.accessible && 
                <Button type = 'button' onClick = {() => this.checkRole()}>
                    HR Only
                </Button>
                }
            </Container>
        )
    }
}