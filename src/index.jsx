import ReactDOM from "react-dom";
import "./main.css";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Link } from "react-router-dom";

import reloadMagic from "./reload-magic-client.js"; // automatic reload
reloadMagic(); // automatic reload

let reducer = (state, action) => {
  if (action.type === "signup-successful") {
    return { ...state, signedIn: true };
  }
  if (action.type === "login-successful") {
    return { ...state, loggedIn: true, email: action.email };
  }
  if (action.type === "logout") {
    return { ...state, loggedIn: false, email: action.email };
  }
  if (action.type === "set-items") {
    return { ...state, items: action.items };
  }
  if (action.type === "set-cart") {
    return { ...state, cart: action.cart };
  }
  if (action.type === "clear-cart") {
    return { ...state, cart: [] };
  }
  // if (action.type === "set-item") {
  //   return { ...state, item: action.item };
  // }
  if (action.type === "search-item") {
    return { ...state, itemFound: action.itemFound };
  }
  if (action.type === "add-item-to-cart") {
    return { ...state, itemId: action.itemId };
  }
  if (action.type === "love-it") {
    return { ...state, itemId: action.itemId };
  }
  if (action.type === "set-review") {
    return { ...state, reviews: action.reviews };
  }
  if (action.type === "minimum-price") {
    return { ...state, min: action.cost };
  }
  return state;
};

const store = createStore(
  reducer,
  {
    loggedIn: false,
    signedIn: false,
    items: [],
    cart: [],
    email: "",
    item: {},
    itemId: "",
    reviews: "",
    min: ""
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
