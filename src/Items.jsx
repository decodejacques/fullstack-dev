import React, { Component } from "react";
import "./main.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchItem: ""
    };
  }

  //   handleSubmit = () => {};
  gotoCart = () => {
    return (
      <div>
        <Link to="/cart" />
      </div>
    );
  };
  handleOnChangeSearch = event => {};
  logout = async () => {
    console.log("clicked logout");
    let response = await fetch("/logout", { method: "POST" });
  };
  render = () => {
    console.log("rendering items");

    return (
      <div>
        <form>
          <input
            type="text"
            onChange={this.handleOnChangeSearch}
            placeholder="Search item"
          />
        </form>
        <button onClick={this.gotoCart}>Cart</button>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    username: state.username
  };
};

let Items = connect(mapStateToProps)(UnconnectedItems);
export default Items;
