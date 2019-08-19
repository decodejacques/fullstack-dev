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

  clearCart = async () => {
    let response = await (await fetch("/checkout", {
      method: "POST"
    })).text();
    let body = JSON.parse(response);
  };

  render = () => {
    return <div />;
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
