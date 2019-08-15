import React, { Component } from "react";
import "./main.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      itemId: ""
    };
  }

  addToCart = async () => {
    console.log("add to cart: id ", this.props.id);

    this.setState({
      ...this.state,
      quantity: (this.state.quantity += 1),
      itemId: this.props.id
    });

    let data = new FormData();
    console.log("add to cart: id ", this.props.id);
    // data.append("itemId", this.props.id);
    data.append("itemId", "hi");
    data.append("quantity", this.state.quantity);
    let response = await fetch("/add-to-cart", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (body.success) {
      alert("item added to cart successfully");

      return;
    }
    alert("Oops an error occured");
  };

  render = () => {
    console.log("this.state", this.state);
    console.log("this.props.id", this.props.id);
    return (
      <div>
        Item details coming soon...
        {/* <img src={this.props.item.filePath} height="200px" width="200px" />
        <h3>{this.props.item.name}</h3>
        <h4>{this.props.item.description}</h4>
        <div>
          {this.props.item.cost + "$ "}
          <button onClick={this.addToCart}>add to cart</button>
    </div>*/}
        <button onClick={this.addToCart}>add to cart</button>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { items: state.items };
};
let ItemDetails = connect(mapStateToProps)(UnconnectedItemDetails);

export default ItemDetails;
