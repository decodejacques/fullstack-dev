import React, { Component } from "react";
import "./main.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchItem: "",
      items: [],
      displayFilters: false,
      filterCost: "",
      filterInStock: ""
    };
  }
  componentDidMount = () => {
    let updateItems = async () => {
      // get all items from the server
      let response = await fetch("/items");
      let responseBody = await response.text();
      console.log("responseBody", responseBody);
      let parsed = JSON.parse(responseBody);
      console.log("parsed", parsed);
      //   this.props.dispatch({ type: "set-messages", messages: parsed });
    };
    setInterval(updateItems, 500);
  };

  //   handleSubmit = () => {};
  gotoCart = () => {
    this.props.history.push("/cart");
  };
  handleOnChangeSearch = event => {};

  logout = async () => {
    console.log("clicked logout");
    let response = await (await fetch("/logout", { method: "POST" })).text();
    let body = JSON.parse(response);

    if (body.success) {
      this.props.history.push("/login");
    }
  };
  displayFilters = () => {
    this.setState({
      ...this.state,
      displayFilters: !this.state.displayFilters
    });
    console.log("this.state.displayFilters", this.state.displayFilters);
  };

  submitItemResearch = async () => {
    // fetch this '/search-item'
  };
  submitFilters = event => {
    // fetch this '/filter-items'
  };
  costOnChange = event => {};
  inStockOnChange = event => {};

  render = () => {
    console.log("rendering items");

    return (
      <div>
        <div>user: {this.props.email}</div>
        Search bar
        <form onSubmit={this.submitItemResearch}>
          <input
            type="text"
            onChange={this.handleOnChangeSearch}
            placeholder="Search item"
          />
        </form>
        <button onClick={this.gotoCart}>Cart</button>
        <button onClick={this.logout}>Logout</button>
        <button onClick={this.displayFilters}>
          {this.state.displayFilters ? "less filters" : "more filters"}
        </button>
        <div style={{ display: this.state.displayFilters ? "block" : "none" }}>
          <form onSubmit={this.submitFilters}>
            Cost{" "}
            <input
              type="text"
              onChange={this.costOnChange}
              value={this.state.filterCost}
            />
            In stock{" "}
            <input
              type="checkbox"
              onChange={this.inStockOnChange}
              value={this.state.filterInStock}
            />
          </form>
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

let Items = connect(mapStateToProps)(UnconnectedItems);
export default Items;
