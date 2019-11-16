import React from 'react';
// import axios from 'axios';
import {
    Router,
    Route
  } from "react-router-dom";
import history from './history.js';
import Lobby from './Lobby.js';
import LoginForm from './LoginForm.js';

export default class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
        baseURL : 'http://localhost:2109/',
        accessible : false,
        accessToken : '',
        fullname : ''
    };
    this.openSesame = this.openSesame.bind(this);
    this.resetState = this.resetState.bind(this);
  }
  resetState()
  {
      this.setState(()=>({
        accessible : false,
        accessToken : ''
      }))
  }
  openSesame(token, fullname)
  {
    this.setState(()=>({
        accessible : true,
        accessToken : token,
        fullname : fullname
    }));
  }
  requireAuth()
  {
    if (!this.state.accessible)
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
              <LoginForm baseURL = {this.state.baseURL} magicPhrase = {(token, fullname) => this.openSesame(token, fullname)} resetState = {() => this.resetState()}/>
          </Route>
          {/* <Route path = "/lobby" onEnter={() => this.requireAuth()}> */}
          <Route path = "/lobby" onEnter={this.requireAuth()}>
              <Lobby baseURL = {this.state.baseURL} accessible = {this.state.accessible} accessToken = {this.state.accessToken} fullname = {this.state.fullname}></Lobby>
          </Route>
     </div>
 </Router>
 </form>
    )
  }
}
