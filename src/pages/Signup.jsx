//Import the libraries
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//Create class for the Signup
class UnconnectedSignup extends Component {
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
    console.log("this.state", this.state);
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
    // <Link to={"/login-page"} className="FormField_Link">
    //   {/* Already a member? Click here ! */}
    // </Link>;
    this.props.dispatch({
      type: "signup-successful"
    });
  };
  render = () => {
    return (
      <div className="FormCenter">
        <form onSubmit={this.submitHandler} className="FormFields">
          <div className="FormField">
            <label className="FormField_Label" htmlFor="name" FullName>
              Enter your username
            </label>
            <input
              type="text"
              id="name"
              className="FormField_Input"
              placeholder="Your username here"
              name="name"
              value={this.state.username}
              onChange={this.usernameChangeHandler}
            />
            <div className="FormField">
              <label className="FormField_Label" htmlFor="password">
                Enter your password
              </label>
              <input
                type="password"
                id="password:"
                className="FormField_Input"
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
                name="email"
                value={this.state.email}
                onChange={this.emailChangeHandler}
              />
            </div>
            <div className="FormField">
              {/* <button className="FormField_Button">Sign up</button> */}
              <input type="submit" value="Sign up" />
            </div>
          </div>
        </form>
      </div>
    );
  };
}
let Signup = connect()(UnconnectedSignup);
export default Signup;
