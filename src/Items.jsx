import React, { Component } from "react";
import "./main.css";
import { connect } from "react-redux";

class UnconnectedItems extends Component {
  render = () => {
    return <div>render all items here</div>;
  };
}

let Items = connect()(UnconnectedItems);
export default Items;
