//Import the libraries
import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

//Create class for the Signup
class UnconnectedSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      username: ""
    };
  }
  //Handler for the email
  emailChangeHandler = event => {
    console.log(event.target.value);
    this.setState({ email: event.target.value });
  };
  //Handler for the password
  passwordChangeHandler = event => {
    console.log(event.target.value);
    this.setState({ password: event.target.value });
  };
  //Handler for the username
  usernameChangeHandler = event => {
    console.log(event.target.value);
    this.setState({ username: event.target.value });
  };
  //This will create a new form that will have add
  // The username, the email and the password to the body
  // of the response for the backend
  submitHandler = async event => {
    event.preventDefault();
    console.log("The form was submitted with the following body");
    console.log(this.state);
    let data = new FormData();
    data.append("email", this.state.email);
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/signup");
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    console.log("parsed", parsed);
    if (parsed.success === false) {
      return alert("This username is alreay taken");
    }
    this.props.dispatch({
      type: "login-success"
    });
  };
  render = () => {
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
                  <label className="FormField__Label" htmlFor="name">
                    Enter your username
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="FormField__Input"
                    placeholder="Your username here"
                    name="name"
                    value={this.state.username}
                    onChange={this.usernameChangeHandler}
                  />
                </div>

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
                    onChange={this.emailChangeHandler}
                  />
                </div>
                <div className="FormField">
                  <label className="FormField__Label" htmlFor="password">
                    Enter your password
                  </label>
                  <input
                    type="password"
                    id="password:"
                    className="FormField__Input"
                    placeholder="Your password here"
                    name="password"
                    value={this.state.password}
                    onChange={this.passwordChangeHandler}
                  />
                </div>
                <div className="FormField">
                  <button className="FormField__Button">Sign up</button>
                  <Link to="/login" className="FormField__Link">
                    Already a member? Click here !
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
}
let SignUp = connect()(UnconnectedSignUp);
export default SignUp;
