import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { BrowserRouter, Route, Link } from "react-router-dom";

class App extends Component {
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

  renderAllItems = () => {};
  renderItemDetails = dataRouter => {};
  renderNewItem = () => {};
  renderCart = () => {};

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact={true} path="/items" render={renderAllItems} />
            <Route exact={true} path="/items/:id" render={renderItemDetails} />
            <Route exact={true} path="/new-item" render={renderNewItem} />
            <Route exact={true} path="/cart" render={renderCart} />
          </div>
        </BrowserRouter>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_O9HT5wBse32v6Ev3y8xDbYnQ00SpdfFqSl"
        />
      </div>
    );
  }
}

export default App;
