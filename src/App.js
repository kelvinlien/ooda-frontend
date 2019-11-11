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
        accessToken : '',
        fullname : ''

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
  openSesame(token, fullname)
  {
    this.setState(()=>({
        accessible : true,
        accessToken : token,
        fullname : fullname
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
                 <Lobby baseURL = {this.state.baseURL} accessible = {this.state.accessible} accessToken = {this.state.accessToken} fullname = {this.state.fullname}></Lobby>
             </Route>
             <Route path = "/">
                 <LoginForm baseURL = {this.state.baseURL} magicPhrase = {(token, fullname) => this.openSesame(token, fullname)} resetState = {() => this.resetState()}/>
             </Route>
         </Switch>
     </div>
 </Router>
 </form>
    )
  }
}
