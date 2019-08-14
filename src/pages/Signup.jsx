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
    let response = await fetch("/signup", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log("body.success", body.success);
    if (body.success === false) {
      alert("This username is alreay taken");
      return;
    }

    this.props.dispatch({
      type: "signup-success"
    });
    return;
  };
  render = () => {
    return (
      <div className="App">
        <div className="App__Aside" />
        <div className="App__Form">
          <div className="FormTitle" />
          <div>
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
            <div className="FormCenter">
              <div className="App__Aside" />
              <form onSubmit={this.submitHandler} className="FormFields">
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
                    <label className="Formfield_Label" htmlFor="email">
                      Enter your E-mail address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="formField_Input"
                      placeholder="Your e-mail here"
                      name="emai"
                      value={this.state.email}
                      onChange={this.emailChangeHandler}
                    />
                  </div>
                  <div className="FormField">
                    <button className="FormField_Button">Sign up</button>
                    <Link to="/sign-in" className="FormField_Link">
                      Already a member? Click here !
                    </Link>
                  </div>
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
