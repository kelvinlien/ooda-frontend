import React from 'react';
// import axios from 'axios';
import {
    Router,
    Route
  } from "react-router-dom";
import history from './history.js';
import {setItem, getItem} from './LocalStorage'
import Lobby from './components/Lobby.js';
import LoginForm from './components/LoginForm.js';

export default class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
        baseURL : 'http://localhost:2109/',
        accessToken : '',
        userInfo : {
          fullname : '',
          team : '',
          manager : ''
        }
    };
    this.openSesame = this.openSesame.bind(this);
    this.resetState = this.resetState.bind(this);
  }
  componentDidMount()
  {
    if (getItem("accessToken") && getItem("userInfo"))
    {
      let userInfo = JSON.parse(getItem("userInfo"));
      this.setState(()=>({
        accessToken : getItem("accessToken"),
        userInfo : userInfo
      }))
    }
  }
  // componentWillUnmount()
  // {
  //   LocalStorage.setItem("accessToken", this.state.accessToken);
  //   LocalStorage.setItem("userInfo", JSON.stringify(this.state.userInfo));
  // }
  resetState()
  {
      this.setState(()=>({
        accessToken : ''
      }))
  }
  openSesame(token, userInfo)   //add para to get more userInfo
  {
    let data = {
      accessToken : token,
      userInfo : userInfo
  };
    this.setState(()=>(data));
    setItem(data);
  }
  requireAuth()
  {
    if (!getItem("accessToken"))
    {
      history.push("/");
    }
  }
  render()
  {
    console.log(this.state);
    return(
	<form>
      <Router history = {history}>
      <div>
          <Route exact path = "/">
              <LoginForm 
              baseURL = {this.state.baseURL} 
              magicPhrase = {(token, userInfo) => this.openSesame(token, userInfo)} 
              resetState = {() => this.resetState()}/>
          </Route>
          {/* <Route path = "/lobby" onEnter={() => this.requireAuth()}> */}
          <Route path = "/lobby" onEnter={this.requireAuth()}>
              <Lobby 
              baseURL = {this.state.baseURL} 
              accessToken = {this.state.accessToken} 
              userInfo = {this.state.userInfo}
              accessToken = {this.state.accessToken}
              >
              </Lobby>
          </Route>
     </div>
 </Router>
 </form>
    )
  }
}
