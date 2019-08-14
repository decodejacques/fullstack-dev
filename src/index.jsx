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
  if (action.type === "signup-success") {
    return { signedIn: true };
  }
  return state;
};

const store = createStore(
  reducer,
  { username: "", loggedIn: false, signedIn: false },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
