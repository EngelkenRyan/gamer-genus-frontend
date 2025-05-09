import React, { Component, useState, useEffect } from 'react';
import Auth from './Auth/Auth';
import './App.css';
import CreateSavedGame from './Components/Savedgames/CreateSavedGame';
import SavedGamesMine from './Components/Savedgames/SavedGamesMine';
import Navigation from './Navigation/Navbar';
import Navigationbar from './Navigation/Navigation';
import {
  BrowserRouter as Router 
} from 'react-router-dom';

type AppState = {
  sessionToken: string
}

export default class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {sessionToken: ""};
  }
  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken)
    console.log(newToken)
    this.setState({
      sessionToken: newToken
    })
  }

  clearToken = () => {
    window.location.href="/"
    return (
      localStorage.clear()
      )
    }

  protectedView = () => {
    return (
      this.state.sessionToken === localStorage.getItem('token') ? <Navigationbar token={this.state.sessionToken} clearToken={this.clearToken}/> : <Auth updateToken={this.updateToken} token={this.state.sessionToken}/>
    )
  };

render() {
  return (
    <div className="App">
    <Router>
    {this.state.sessionToken !== '' && <Navigation token={this.state.sessionToken} clearToken={this.clearToken}/>}
    {this.protectedView()}
    </Router>
    </div>
  );
}
}

// export default App;
