import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";

class UnconnectedCart extends Component {
  onToken = token => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        // alert(`Thank you for your purchase! ${data.email}`);
        // add username/email below
        alert(`Thank you for your purchase!`);
      });
    });
  };

  render = () => {
    return (
      <div>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_O9HT5wBse32v6Ev3y8xDbYnQ00SpdfFqSl"
        />
      </div>
    );
  };
}
let Cart = connect()(UnconnectedCart);
export default Cart;
