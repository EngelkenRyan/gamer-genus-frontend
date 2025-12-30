import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { withRouter, RouteComponentProps } from "react-router-dom";
import "./Auth.css";
import APIURL from "../helpers/environment";

// Define types for component state and props
type RegisterVars = {
  email: string;
  username: string;
  password: string;
  role: string;
  modal: boolean;
  errorMessage: string;
  loading: boolean;
};

type RegisterProps = {
  updateToken: (newToken: string) => void;
  token: string;
};

// Register component for user account creation
class Register extends Component<RegisterProps & RouteComponentProps, RegisterVars> {
  constructor(props: RegisterProps & RouteComponentProps) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      role: "user",
      modal: false,
      errorMessage: "",
      loading: false,
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal, errorMessage: "" });
  };

  // Handle form submission for user registration
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    fetch(`${APIURL}/user/register`, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        role: this.state.role,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || "Registration failed");
          });
        }
        return res.json();
      })
      .then((data) => {
        this.props.updateToken(data.sessionToken);
        localStorage.setItem("role", data.user.role);
        this.setState({ errorMessage: "", loading: false });
        this.toggle();
        this.props.history.push("/");
      })
      .catch((error) => {
        const message = error.message;
        let displayMessage = "Something went wrong. Please try again later.";
        if (message === "Email already in use") {
          displayMessage = "This email is already registered. Try a different one.";
        } else if (message === "Username already in use") {
          displayMessage = "This username is taken. Please choose another.";
        } else if (message === "Email or username already in use") {
          displayMessage = "Email or username already in use. Please try again.";
        } else if (message === "All fields are required") {
          displayMessage = "Please fill out all fields.";
        }
        this.setState({
          errorMessage: displayMessage,
          modal: true,
          loading: false,
        });
      });
  };

  // Render the registration modal and form
  render() {
    return (
      <div className="Register" style={{ textAlign: "center" }}>
        <Button onClick={this.toggle} className="registerbtn">
          Create Account
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="register-modal">
          <ModalHeader
            className="registerheader"
            toggle={this.toggle}
            style={{
              justifyContent: "center", // Center the header text
              padding: "10px",
            }}
          >
            Create Account
          </ModalHeader>
          <ModalBody style={{ padding: "20px" }}>
            {this.state.errorMessage && (
              <div
                style={{
                  color: "red",
                  marginBottom: "15px",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                {this.state.errorMessage}
              </div>
            )}
            <Form onSubmit={this.handleSubmit}>
              <FormGroup className="register-form">
                <Label className="register-label" htmlFor="Email">
                  Email
                </Label>
                <Input
                  onChange={(e) => this.setState({ email: e.target.value })}
                  type="email"
                  className="registerinput"
                  placeholder="example@email.com"
                  value={this.state.email}
                  required
                  style={{
                    display: "block",
                    width: "100%",
                    maxWidth: "300px",
                    margin: "10px auto",
                    textAlign: "center",
                    padding: "8px",
                  }}
                />
              </FormGroup>
              <FormGroup className="register-form">
                <Label className="register-label" htmlFor="username">
                  Username
                </Label>
                <Input
                  onChange={(e) => this.setState({ username: e.target.value })}
                  className="registerinput"
                  placeholder="username"
                  value={this.state.username}
                  required
                  style={{
                    display: "block",
                    width: "100%",
                    maxWidth: "300px",
                    margin: "10px auto",
                    textAlign: "center",
                    padding: "8px",
                  }}
                />
              </FormGroup>
              <FormGroup className="register-form">
                <Label className="register-label" htmlFor="Password">
                  Password
                </Label>
                <Input
                  onChange={(e) => this.setState({ password: e.target.value })}
                  type="password"
                  name="password"
                  className="registerinput"
                  placeholder="password"
                  value={this.state.password}
                  required
                  pattern="^(?=.{5,10})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$"
                  title="Password must be 5-20 characters, with at least 1 uppercase, 1 lowercase, 1 number, and 1 special character."
                  minLength={5}
                  maxLength={20}
                  style={{
                    display: "block",
                    width: "100%",
                    maxWidth: "300px",
                    margin: "10px auto",
                    textAlign: "center",
                    padding: "8px",
                  }}
                />
                {this.state.password && !/^(?=.{5,10})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$/.test(this.state.password) && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginTop: "5px",
                      textAlign: "center",
                    }}
                  >
                    Password must be 5-20 characters, with at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.
                  </div>
                )}
              </FormGroup>
              <FormGroup>
                <select
                  className="selectbox"
                  value={this.state.role}
                  onChange={(e) => this.setState({ role: e.target.value })}
                  style={{
                    display: "block",
                    width: "100%",
                    maxWidth: "150px",
                    margin: "10px auto",
                    padding: "8px",
                  }}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </FormGroup>
              <Button
                type="submit"
                className="registerbtn"
                disabled={this.state.loading}
                style={{
                  display: "block",
                  width: "100%",
                  maxWidth: "150px",
                  margin: "20px auto 10px",
                  padding: "10px",
                }}
              >
                {this.state.loading ? "Loading..." : "Sign Up!"}
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Register);