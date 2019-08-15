import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Cart from "./Cart.jsx";
import NewItem from "./NewItem.jsx";
import Items from "./Items.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import "./App.css";
import ItemDetails from "./ItemDetails.jsx";

let renderItemDetails = routerData => {
  return (
    <div>
      <ItemDetails id={routerData.match.params.id} />
      {/* <Items id={routerData.match.params.id} /> */}
    </div>
  );
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
          <Route path="/item/:id" render={renderItemDetails} />
        </Router>
      </div>
    );
  };
}

export default App;
