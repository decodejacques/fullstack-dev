import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Cart from "./Cart.jsx";
import NewItem from "./NewItem.jsx";
import Items from "./Items.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import "./App.css";
import "./Item.css";
import ItemDetails from "./ItemDetails.jsx";

const Navigation = props => (
  <nav>
    <div className="myNavbar">
      <NavLink to="/all-items" className="hvr-bounce-to-right">
        Home
      </NavLink>

      <NavLink className="hvr-bounce-to-right" to="/cart">
        Cart
      </NavLink>

      <NavLink to="/new-item" className="hvr-bounce-to-right">
        Sell an item
      </NavLink>
    </div>
  </nav>
);

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
        <div>
          <Router>
            <Navigation />
            <Route path="/cart" component={Cart} />
            <Route path="/new-item" component={NewItem} />
            <Route path="/all-items" component={Items} />
            <Route path="/item/:id" render={renderItemDetails} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Router>
        </div>
      </div>
    );
  };
}

export default App;
