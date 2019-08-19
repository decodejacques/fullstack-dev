import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter
} from "react-router-dom";
import { browserHistory } from "react-router";
import {
  syncHistoryWithStore,
  routerReducer,
  routerMiddleware,
  push
} from "react-router-redux";

import Cart from "./Cart.jsx";
import NewItem from "./NewItem.jsx";
import Items from "./Items.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import "./Item.css";
import { connect } from "react-redux";
import ItemDetails from "./itemDetails.jsx";

// testing cronjob
class UnconnectedNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  logout = async () => {
    console.log("clicked logout");
    let response = await (await fetch("/logout", { method: "POST" })).text();
    let body = JSON.parse(response);
    if (body.success) {
      // console.log("this.state.email", this.state.email);
      // this.setState({ email: this.state.email });
      // this.props.dispatch({ type: "logout", email: this.state.email });
      this.props.history.push("/");
    }
  };
  render = () => {
    console.log("this.state.email", this.state.email);
    return (
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
          <button onClick={this.logout} className="hvr-bounce-to-right">
            Log out
          </button>
        </div>
      </nav>
    );
  };
}

let renderItemDetails = routerData => {
  return (
    <div>
      <ItemDetails
        id={routerData.match.params.id}
        history={routerData.history}
      />
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
            <Route exact={true} path="/" component={Login} />
            <Route path="/cart" component={Cart} />
            <Route path="/new-item" component={NewItem} />
            <Route path="/all-items" component={Items} />
            <Route path="/item/:id" render={renderItemDetails} />
            <Route path="/signup" component={Signup} />
            {/* <Route path="/login" component={Login} /> */}
          </Router>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    email: state.email
  };
};

let Navigation = withRouter(UnconnectedNavigation);
let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
