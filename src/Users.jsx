import React, { Component } from "react";
import "./main.css";
import { connect } from "react-redux";

class UnconnectedUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.users,
      loggedIn: this.props.loggedIn
    };
  }
  render = () => {
    console.log("this.props.loggedIn", this.props.loggedIn);
  };
}
let mapStateToProps = state => {
  return {
    users: state.users,
    loggedIn: state.loggedIn
  };
};

let Users = connect(mapStateToProps)(UnconnectedUsers);

export default Users;
