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
            userInfo : {

            }
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
            userInfo : _this.props.userInfo
          }));
        })
        .catch(function(){
          _this.setState((prevState) => ({
            ...prevState,
            userInfo : _this.props.userInfo
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
                <MiniDrawer 
                role = {this.state.role} 
                userInfo = {this.state.userInfo} 
                logOut = {() => this.logOut()}
                />
            </Container>
        )
    }
}