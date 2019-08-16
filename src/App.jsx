import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter
} from "react-router-dom";
import Cart from "./Cart.jsx";
import NewItem from "./NewItem.jsx";
import Items from "./Items.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import "./Item.css";
import { connect } from "react-redux";
import ItemDetails from "./itemDetails.jsx";

class UnconnectedNavigation extends Component {
  logout = async () => {
    console.log("clicked logout");
    let response = await (await fetch("/logout", { method: "POST" })).text();
    let body = JSON.parse(response);

    if (body.success) {
      this.props.history.push("/login");
    }
  };
  render = () => {
    return (
      <nav>
        <div class="myNavbar">
          <NavLink to="/all-items" className="hvr-bounce-to-right">
            Home
          </NavLink>

          <NavLink className="hvr-bounce-to-right" to="/cart">
            Cart
          </NavLink>

          <NavLink to="/new-item" className="hvr-bounce-to-right">
            Sell an item
          </NavLink>

          <button onClick={this.logout} className="hvr-bounce-to-right">
            Log out
          </button>
        </div>
      </nav>
    );
  };
}
let Navigation = withRouter(UnconnectedNavigation);

let renderItemDetails = routerData => {
  return (
    <div>
      <ItemDetails id={routerData.match.params.id} />
      {/* <Items id={routerData.match.params.id} /> */}
    </div>
  );
};

class UnconnectedApp extends Component {
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
let App = connect()(UnconnectedApp);
export default App;
