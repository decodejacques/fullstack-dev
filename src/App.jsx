import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Cart from "./Cart.jsx";

let renderSignupLoginPage = () => {
  return <div>signup and login forms go here</div>;
};

let renderAllItems = () => {
  return <div>render all items here</div>;
};
let renderItemDetails = dataRouter => {
  return <div>render item details here</div>;
};
let renderNewItem = () => {
  return <div>New item form should be displayed here</div>;
};
let renderCart = () => {
  return (
    <div>
      <Cart />
    </div>
  );
};

class App extends Component {
  render = () => {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route
              exact={true}
              path="/signup-login"
              render={renderSignupLoginPage}
            />
            <Route exact={true} path="/all-items" render={renderAllItems} />
            <Route
              exact={true}
              path="/all-items/:id"
              render={renderItemDetails}
            />
            <Route exact={true} path="/new-item" render={renderNewItem} />
            <Route exact={true} path="/cart" render={renderCart} />
          </div>
        </BrowserRouter>
      </div>
    );
  };
}

export default App;
