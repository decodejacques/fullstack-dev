import React, { Component } from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import "./main.css";

class UnconnectedCheckout extends Component {
  onToken = token => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        // alert(`Thank you for your purchase! ${data.email}`);
        // add username/email below
        alert(`Thank you for your purchase ${this.props.email}! `);
      });
    });
  };
  render = () => {
    return (
      <div>
        <h2> Checkout</h2>
        <h1>
          <div className="StripeFrame">
            <button
              className="StripeButton"
              onClick={this.clearCart}
              style={{ border: "0px" }}
            >
              <StripeCheckout
                // {<button className="btn btn-primary">checkout now!
                // </button>}
                ComponentClass="div"
                token={this.onToken}
                stripeKey="pk_test_O9HT5wBse32v6Ev3y8xDbYnQ00SpdfFqSl"
              >
                <button className="StripeButtonText">
                  {" "}
                  Proceed to payment{" "}
                </button>
              </StripeCheckout>
            </button>
          </div>
        </h1>
      </div>
    );
  };
}

let Checkout = connect()(UnconnectedCheckout);

export default Checkout;
