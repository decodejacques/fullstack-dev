import React, { Component } from "react";
import { Link } from "react-router-dom";

class ItemDetails extends Component {
  constructor(props) {
    super();
    this.state = {
      itemId: this.props.itemId
    };
  }

  // make a fetch before the page renders, grab item info from backend
  componentDidMount() {
    // it takes a small amount of time to run a fetch

    console.log(this.state.itemId);
    fetch("/getItem?itemId=" + this.state.itemId)
      .then(response => response.text())
      .then(responseBody => {
        let itemdetails = JSON.parse(responseBody);
        console.log(itemdetails);
        this.setState({ itemdetails });
      });
  }
}
