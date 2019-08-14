import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Cart from "./Cart.jsx";
import NewItem from "./NewItem.jsx";
import Items from "./Items.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import "./App.css";

let renderItemDetails = routerData => {
  return <GridItem id={routerData.params.id} />;
};

class App extends Component {
  render = () => {
    return (
      <div>
        <Router>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/cart" component={Cart} />
          <Route path="/new-item" component={NewItem} />
          <Route path="/all-items" component={Items} />
          <Route path="/all-items/:id" render={renderItemDetails} />
        </Router>
      </div>
    );
  };
}

export default App;
