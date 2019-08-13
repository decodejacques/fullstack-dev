import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";

class App extends Component {
  onToken = token => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  };

  // ...

  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_O9HT5wBse32v6Ev3y8xDbYnQ00SpdfFqSl"
      />
    );
  }
}

export default App;
