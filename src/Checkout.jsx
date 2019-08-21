import React, { Component } from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import "./main.css";

class UnconnectedCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email
    };
  }
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
        <div>SHIPPING ADDRESS</div>
        <form className="shipping" onSubmit={this.OnToken}>
          <div>
            <b> First name </b>
            <input type="text" placeholder="..." />
          </div>
          <div>
            <b>Last name</b>
            <input type="text" placeholder="..." />
          </div>
          <div>
            <b> Street address </b>
            <input type="text" placeholder="..." />
          </div>
          <div>
            <b> City </b>
            <input type="text" placeholder="..." />
          </div>
          <div>
            <b> ZIP or postal code </b>
            <input type="text" placeholder="AAA BBB" />
          </div>
          <div>
            <b>Country </b>
            <input type="text" placeholder="..." />
          </div>
          <div>
            <b>State or province</b>
            <input type="text" placeholder="..." />
          </div>
          <div>
            <b>Phone </b>
            <input type="text" placeholder="..." />
          </div>
        </form>

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

let mapStateToProps = state => {
  return { email: state.email };
};

let Checkout = connect(mapStateToProps)(UnconnectedCheckout);

export default Checkout;
