import React, { Component } from "react";
import { BrowserRouter, Route, Link, Router, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Cart from "./Cart.jsx";
import NewItem from "./NewItem.jsx";
import Items from "./Items.jsx";
import SignupForm from "./pages/Signup.jsx";
import LoginForm from "./pages/Login.jsx";
import "./main.css";

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

class UnconnectedApp extends Component {
  render = () => {
    console.log("this.props.signedIn", this.props.signedIn);
    if (this.props.signedIn) {
      return (
        <div>
          <BrowserRouter>
            <div className="App">
              <div className="App_Aside">
                <div className="App_Form">
                  <Route
                    exact={true}
                    path="/login-page"
                    //   render={renderLoginPage}
                    component={LoginForm}
                  />
                </div>
              </div>
            </div>
          </BrowserRouter>
          {/* <LoginForm /> */}
        </div>
      );
    }

    if (this.props.loggedIn) {
      return (
        <div>
          <Items />
        </div>
      );
    }

    return (
      <div>
        <BrowserRouter>
          <div>
            <div className="App">
              <div className="App_Aside">
                <div className="App_Form">
                  <Route
                    exact={true}
                    path="/signup-page"
                    component={SignupForm}
                    //   render={renderSignupPage}
                  />
                </div>
              </div>
            </div>

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

let mapStateToProps = state => {
  return {
    signedIn: state.signedIn,
    loggedIn: state.loggedIn
  };
};

let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
