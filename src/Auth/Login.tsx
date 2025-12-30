import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import APIURL from "../helpers/environment";
import "./Auth.css";

// Define types for component state and props
type UserVars = {
  email: string;
  password: string;
  success: boolean;
  errorMessage: string;
};

// Define types for component props
type LoginProps = {
  updateToken: (newToken: string) => void;
  token: string;
};

// Login component for user authentication
class Login extends Component<LoginProps, UserVars> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      success: false,
      errorMessage: "",
    };
  }

  handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    fetch(`${APIURL}/user/login`, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || "Login failed");
          });
        }
        return res.json();
      })
      .then((data) => {
        this.props.updateToken(data.sessionToken);
        localStorage.setItem("role", data.user.role);
        this.setState({ errorMessage: "", success: true });
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message,
        });
      });
  };

  // Helper function to log in as test user or admin
  loginAs = (type: "user" | "admin") => {
    const creds =
      type === "admin"
        ? { email: "testadmin@gamergenus.com", password: "Test@1234" }
        : { email: "testuser@gamergenus.com", password: "Test@1234" };

    this.setState(
      {
        email: creds.email,
        password: creds.password,
        errorMessage: "",
      },
      () => this.handleSubmit()
    );
  };

  render() {
    return (
      <div className="logindiv">
        <h1 className="loginheader">Login</h1>
        <br />

        {this.state.errorMessage && (
          <div
            style={{ color: "red", marginBottom: "1%", textAlign: "center" }}
          >
            {this.state.errorMessage}
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            marginBottom: 12,
          }}
        >
          <Button
            type="button"
            className="loginbtn"
            onClick={() => this.loginAs("user")}
          >
            Test User
          </Button>
          <Button
            type="button"
            className="loginbtn"
            onClick={() => this.loginAs("admin")}
          >
            Test Admin
          </Button>
        </div>

        <Form onSubmit={this.handleSubmit}>
          <FormGroup className="login-form">
            <Label htmlFor="email" className="login-label">
              Email
            </Label>
            <br />
            <Input
              onChange={(e) => this.setState({ email: e.target.value })}
              type="email"
              className="logininput"
              placeholder="Example@email.com"
              value={this.state.email}
              required
              style={{
                marginBottom: "1%",
                marginTop: ".5%",
                textAlign: "center",
                width: "15%",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            />
          </FormGroup>
          
          <FormGroup className="login-form">
            <Label htmlFor="password" className="login-label">
              Password
            </Label>
            <br />
            <Input
              onChange={(e) => this.setState({ password: e.target.value })}
              type="password"
              className="logininput"
              placeholder="Password"
              value={this.state.password}
              required
              style={{
                marginBottom: "1%",
                marginTop: ".5%",
                textAlign: "center",
                width: "15%",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            />
          </FormGroup>

          <Button
            type="submit"
            className="loginbtn"
            style={{ marginBottom: ".5%" }}
          >
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
