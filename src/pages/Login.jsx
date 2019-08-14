import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  handleEmailChange = event => {
    console.log("new account email: ", event.target.value);
    this.setState({ email: event.target.value });
  };
  handlePasswordChange = event => {
    console.log("new password", event.target.value);
    this.setState({ password: event.target.value });
  };
  submitHandler = async event => {
    event.preventDefault();
    console.log("login form submitted");
    let data = new FormData();
    data.append("email", this.state.email);
    data.append("password", this.state.password);
    let response = await fetch("/login", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    console.log("responseBody from login: ", responseBody);
    let body = JSON.parse(responseBody);
    if (body.success) {
      console.log("logIn successful");
      this.setState({ email: email });
      this.props.history.push("/all-items");
      return;
    }
  };
  render = () => {
    console.log("I am in the loggin endpoint");
    return (
      <div className="App">
        <div className="App__Aside" />
        <div className="App__Form">
          <div className="FormTitle">
            <div className="FormCenter">
              <div>
                <NavLink
                  to="/Login"
                  activeClassName="FormTitle__Link--Active"
                  className="FormTitle__Link"
                >
                  Log In
                </NavLink>{" "}
                or{" "}
                <NavLink
                  exact
                  to="/signup"
                  activeClassName="FormTitle__Link--Active"
                  className="FormTitle__Link"
                >
                  Sign Up
                </NavLink>
              </div>
              <form onSubmit={this.submitHandler}>
                <div className="FormField">
                  <label className="FormField__Label" htmlFor="email">
                    Enter your E-mail address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="FormField__Input"
                    placeholder="Your e-mail here"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                  />
                </div>

                <div className="FormField">
                  <label className="FormField__Label" htmlFor="password">
                    Enter your password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="FormField__Input"
                    placeholder="Your password here"
                    name="password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                </div>
                <div className="FormField">
                  <button className="FormField__Button">Log In</button>
                  <Link to="/signup" className="FormField__Link">
                    Don't have an account yet? Click here to sign up
                  </Link>
                </div>
              </form>
            </div>{" "}
          </div>{" "}
        </div>
      </div>
    );
  };
}
let Login = connect()(UnconnectedLogin);
export default Login;
