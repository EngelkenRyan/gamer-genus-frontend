import React, { Component } from "react";
import Auth from "./Auth/Auth";
import "./App.css";
import Navigation from "./Navigation/Navbar";
import Navigationbar from "./Navigation/Navigation";
import { BrowserRouter as Router } from "react-router-dom";

type AppState = {
  sessionToken: string;
};

export default class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = { sessionToken: "" };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ sessionToken: token });
    }
  }

  updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    this.setState({ sessionToken: newToken });
  };

  clearToken = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  protectedView = () => {
    return this.state.sessionToken === localStorage.getItem("token") ? (
      <Navigationbar
        token={this.state.sessionToken}
        clearToken={this.clearToken}
      />
    ) : (
      <Auth updateToken={this.updateToken} token={this.state.sessionToken} />
    );
  };

  render() {
    return (
      <div className="App">
        <Router>
          {this.state.sessionToken !== "" && (
            <Navigation
              token={this.state.sessionToken}
              clearToken={this.clearToken}
            />
          )}
          
          <div className="main">{this.protectedView()}</div>
        </Router>
      </div>
    );
  }
}
