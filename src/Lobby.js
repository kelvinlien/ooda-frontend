import React from 'react';
import axios from 'axios';
import {Container} from '@material-ui/core';
import MiniDrawer from './MiniDrawer.js';
export default class Lobby extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            url : 'protected/ping/',
            role : 'staff',   //default role
            fullname : ''
        }
        this.checkRole = this.checkRole.bind(this);
    }
    checkRole()
    {
        let _this = this;
        axios({
            url : _this.state.url,
            baseURL : _this.props.baseURL,
            method : 'get',
            headers: {'Authorization': "Bearer " + _this.props.accessToken}
        })
        .then(function(){
          _this.setState((prevState) => ({
            ...prevState,
            role : 'hr',
            fullname : _this.props.fullname
          }));
        })
        .catch(function(){
          _this.setState((prevState) => ({
            ...prevState,
            fullname : _this.props.fullname
          }));
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
    componentDidMount()
    {
      this.checkRole();
    }
    render()
    {
        return(
            <Container>
                <MiniDrawer role = {this.state.role} fullname = {this.state.fullname} logOut = {() => this.logOut()}/>
                {/* {
                this.props.accessible && 
                <Button type = 'button' onClick = {() => this.checkRole()}>
                    HR Only
                </Button>
                } */}
            </Container>
        )
    }
}