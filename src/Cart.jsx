import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import "./main.css";

class UnconnectedCart extends Component {
  onToken = token => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        // alert(`Thank you for your purchase! ${data.email}`);
        // add username/email below
        alert(`Thank you for your purchase ${this.state.username}! `);
      });
    });
  };

  render = () => {
    return (
      <div className="cart">
        <div className="shopping-bag">
          <h1>Shopping Bag</h1>
          {/* more stuff to come */}
        </div>

        <div className="checkout">
          <h1>
            Checkout
            <div id="stripeButton">
              <StripeCheckout
                // {<button className="btn btn-primary">checkout now!
                // </button>}
                token={this.onToken}
                stripeKey="pk_test_O9HT5wBse32v6Ev3y8xDbYnQ00SpdfFqSl"
              />
            </div>
          </h1>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    username: state.username
  };
};
let Cart = connect(mapStateToProps)(UnconnectedCart);
export default Cart;
