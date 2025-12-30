import React, { Component } from "react";
import Register from "./Register";
import Login from "./Login";

// Define types for state and props
type AuthVariables = {
  signupOpen: boolean;
  loginOpen: boolean;
};

type AuthProps = {
  updateToken: (newToken: string) => void;
  token: string;
};

// Auth component managing login and registration modals
class Auth extends Component<AuthProps, AuthVariables> {
  constructor(props: AuthProps) {
    super(props);
    this.state = { signupOpen: false, loginOpen: false };
  }

  signupHandler = () => {
    this.setState({
      signupOpen: true,
    });
  };

  loginHandler = () => {
    this.setState({
      loginOpen: true,
    });
  };

  closeHandler = () => {
    this.setState({
      signupOpen: false,
      loginOpen: false,
    });
  };

  // Render the Auth component with Login and Register components
  render() {
    return (
      <div className="Auth">
        <Login updateToken={this.props.updateToken} token={this.props.token} />
        <Register
          updateToken={this.props.updateToken}
          token={this.props.token}
        />
      </div>
    );
  }
}

export default Auth;
