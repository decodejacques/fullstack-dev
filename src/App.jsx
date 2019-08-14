import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Cart from "./Cart.jsx";
import NewItem from "./NewItem.jsx";
import Items from "./Items.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import "./App.css";

let renderSignupPage = () => {
  return (
    <div>
      <Signup />
    </div>
  );
};
let renderLoginPage = () => {
  return (
    <div>
      <Login />
    </div>
  );
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
        <Router>
          <Route path="/signup" component={Signup} />
          <Route path="/Login" component={Login} />

          <Route path="/new-item" component={NewItem} />
        </Router>
      </div>
    );
  };
}

export default App;
