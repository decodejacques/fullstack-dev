import React, { Component } from "react";
import { Link } from "react-router-dom";

class UnconnectedSignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      username: ""
    };
  }
  emailChangeHandler = event => {
    console.log(event.target.value);
    this.setState({ email: event.target.value });
  };
  passwordChangeHandler = event => {
    console.log(event.target.value);
    this.setState({ password: event.target.value });
  };
  usernameChangeHandler = event => {
    console.log(event.target.value);
    this.setState({ username: event.target.value });
  };
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
    );
  };
}
let SignUpForm = connect()(UnconnectedSignUpForm);
export default SignUpForm;
