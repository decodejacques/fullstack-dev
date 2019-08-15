import React, { Component } from "react";
import "./main.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      itemId: "",
      displayCheckout: false
    };
  }

  addToCart = async () => {
    console.log("add to cart: id ", this.props.id);

    this.setState(
      {
        ...this.state,
        quantity: (this.state.quantity += 1),
        itemId: this.props.id,
        displayCheckout: !this.state.displayCheckout
      },
      async () => {
        let data = new FormData();
        console.log("add to cart: id ", this.props.id);
        // data.append("itemId", this.props.id);
        data.append("itemId", this.state.itemId);
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
      }
    );
  };
  handleCheckout = () => {
    <Link to="/cart" />;
  };
  gotoCart = () => {
    // this.props.history.push("/cart");
    //    <Link to="/cart" />;
  };
  //   gotoHomepage = () => {
  //     // this.props.history.push("/all-items");
  //     <Link to="/all-items" />;
  //   };

  render = () => {
    console.log("this.state", this.state);
    console.log("this.props.id", this.props.id);
    console.log("this.props.items", this.props.items);
    let displayItem = this.props.items.filter(item => {
      return item._id === this.props.id;
    });
    return (
      <div>
        <div>
          {/* <button onClick={this.gotoHomepage}>Home</button>
          <button onClick={this.gotoCart}>Cart</button> */}
          <button className="CartButton" onClick={this.gotoCart}>
            Cart
          </button>
        </div>
        <div>
          {displayItem.map(item => {
            return (
              <div>
                <img
                  className="ItemPicture"
                  src={item.filePath}
                  height="200px"
                  width="200px"
                />
                <div>{item.name}</div>
                <div>{item.description}</div>
                <div>{item.cost + "$"}</div>
              </div>
            );
          })}
        </div>
        <div />
        <button onClick={this.addToCart}>add to cart</button>
        <div style={{ display: this.state.displayCheckout ? "block" : "none" }}>
          <button onClick={this.handleCheckout}>
            checkout
            <Link to="/cart" />
          </button>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { items: state.items, email: state.email };
};
let ItemDetails = connect(mapStateToProps)(UnconnectedItemDetails);

export default ItemDetails;
