import React from 'react';
import axios from 'axios';
import {Container} from '@material-ui/core';
import MiniDrawer from './MiniDrawer.js';
import {setItem, getItem, clear} from '../LocalStorage'
export default class Lobby extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            roleURL : 'protected/ping/',
            leaveURL : "leaveRequest/employee/2/",
            userInfo : getItem('userInfo')
        }
        this.checkRole = this.checkRole.bind(this);
    }
    checkRole()
    {
        let _this = this;
        axios({
            url : _this.state.roleURL,
            baseURL : _this.props.baseURL,
            method : 'get',
            headers: {'Authorization': "Bearer " + _this.props.accessToken}
        })
        .catch(function(){
          axios({
            url : _this.state.leaveURL,
            baseURL : _this.props.baseURL,
            method : 'get',
            headers : {
              'Authorization': 'Bearer '+ _this.props.accessToken
            }
          })
          .then(function(response){
            _this.setState((prevState) => ({
              ...prevState,
              remainingPaidLeave : response.data.remainingPaidLeave,
              leaveRequests : response.data.leaveRequests
            }));
            setItem({"remainingPaidLeave" :  response.data.remainingPaidLeave, "leaveRequests" : response.data.leaveRequests});
          })
        })
    }

    componentDidMount()
    {
      if (getItem("remainingPaidLeave"))
      {
        this.setState(() => ({
          remainingPaidLeave : getItem("remainingPaidLeave"),
          leaveRequests : getItem("leaveRequests"),
          // userInfo : getItem('userInfo')
          userInfo : this.props.userInfo
        }));
      }
      else
      {
        this.setState(() => ({
          userInfo : this.props.userInfo
        }))
      }
    }
    logOut()
    {
      clear();
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
        console.log(this.state.userInfo);
        return(
            <Container>
                <MiniDrawer 
                userInfo = {this.state.userInfo} 
                logOut = {() => this.logOut()}
                baseURL = {this.props.baseURL}
                accessToken = {this.props.accessToken}
                leaveURL = {this.state.leaveURL}
                remainingPaidLeave = {this.state.remainingPaidLeave}
                />
            </Container>
        )
    }
}