import React from 'react';
// import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
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
        accessToken : ''

    }
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
  openSesame(token)
  {
    this.setState(()=>({
        accessible : true,
        accessToken : token
    }));
  }
  render()
  {
    return(
	<form>
      <Router>
      <div>
         <nav>
             <Link to = "/">Login</Link>
          </nav>
          <nav>
             <Link to = "/lobby">Lobby</Link>
          </nav>
          <Switch>
             <Route path = "/lobby">
                 <Lobby baseURL = {this.state.baseURL} accessible = {this.state.accessible} accessToken = {this.state.accessToken}></Lobby>
             </Route>
             <Route path = "/">
                 <LoginForm baseURL = {this.state.baseURL} magicPhrase = {token => this.openSesame(token)} resetState = {() => this.resetState()}/>
             </Route>
         </Switch>
     </div>
 </Router>
 </form>
    )
  }
}
