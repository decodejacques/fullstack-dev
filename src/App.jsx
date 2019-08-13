import React, { Component } from "react";
import { BrowserRouter, Route, Link, Route, NavLink } from "react-router-dom";
import Cart from "./Cart.jsx";
import NewItem from "./NewItem.jsx";
import Items from "./Items.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import "./App.css";

let renderSignupPage = () => {
  return <div>signup form goes here</div>;
};
let renderLoginPage = () => {
  return <div>login form goes here</div>;
};

let renderAllItems = () => {
  return (
    <div>
      <Items />
    </div>
  );
};
let renderItemDetails = dataRouter => {
  return <div>render item details here</div>;
};
let renderNewItem = () => {
  return (
    <div>
      New item form should be displayed here
      <NewItem />
    </div>
  );
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
            <Router>
              <div className="App">
                <div className="App_Aside" />
                <div className="App_Form">
                  <Route
                    exact={true}
                    path="/signup"
                    render={renderSignupPage}
                  />
                  <Route exact={true} path="/login" render={renderLoginPage} />
                </div>
              </div>
            </Router>
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
