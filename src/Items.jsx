import React, { Component } from "react";
import "./main.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// class UnconnectedGridItem extends Component {
//   render = () => {
//     return (
//       <div /*style={{ border: solid }}*/>
//         {this.props.items.description}
//         {this.props.items.cost}
//       </div>
//     );
//   };
// }

class UnconnectedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchItem: "",
      items: [],
      displayFilters: false,
      filterCost: "",
      filterInStock: "",
      itemName: ""
    };
  }
  componentDidMount = () => {
    let updateItems = async () => {
      // get all items from the server
      let response = await fetch("/items");
      let responseBody = await response.text();
      //   console.log("responseBody", responseBody);
      let parsed = JSON.parse(responseBody);
      //   console.log("parsed", parsed);
      this.props.dispatch({ type: "set-items", items: parsed });
    };
    setInterval(updateItems, 500);
  };

  renderGridItem = item => {
    return (
      <Link to={"/all-items" + item.id}>
        <GridItem item={item} />
      </Link>
    );
  };

  //   handleSubmit = () => {};
  gotoCart = () => {
    this.props.history.push("/cart");
  };
  //   handleOnChangeSearch = event => {};

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

  handleOnChangeSearch = event => {
    event.preventDefault();
    this.props.dispatch({
      type: "search-item",
      itemFound: event.target.value
    });
    // console.log("change item search");
    // console.log("event.target.value", event.target.value);
    // this.setState({
    //   itemName: event.target.value
    // });

    // console.log("this.state.itemName", this.state.itemName);
    // let data = new FormData();
    // data.append("name", this.state.itemName);
    // let response = await fetch("/search-item", {
    //   method: "POST",
    //   body: data,
    //   credentials: "include"
    // });
    // let responseBody = await response.text();
    // let body = JSON.parse(responseBody);
    // // if (body.success) {
    // //   this.setState({ itemName: "" });
    // // }
  };
  submitFilters = event => {
    // fetch this '/filter-items'
  };
  maxCostOnChange = event => {
    event.preventDefault();
  };
  minCostOnChange = event => {
    event.preventDefault();
  };
  inStockOnChange = event => {
    event.preventDefault();
  };

  render = () => {
    console.log("rendering items");
    let displayedItems = this.props.items;
    if (this.props.itemFound !== undefined) {
      displayedItems = this.props.items.filter(item => {
        return item.name === this.props.itemFound;
      });
    }

    // console.log("this.props.items.description", this.props.items.description);
    // let itemsToElement = e => {
    //   return (
    //     <div>
    //       <div>{e.name}</div>
    //       <img src={e.filePath} />
    //       <div>{e.description}</div>
    //       <div>{e.cost + "$"}</div>
    //     </div>
    //   );
    // };
    return (
      <div>
        Search bar
        <input
          type="text"
          onChange={this.handleOnChangeSearch}
          placeholder="Search item"
        />
        <button onClick={this.gotoCart}>Cart</button>
        <button onClick={this.logout}>Logout</button>
        <button onClick={this.displayFilters}>
          {this.state.displayFilters ? "less filters" : "more filters"}
        </button>
        <div style={{ display: this.state.displayFilters ? "block" : "none" }}>
          <div>Cost</div>
          min cost:
          <input
            type="text"
            onChange={this.minCostOnChange}
            value={this.state.filterCost}
          />
          max cost:
          <input
            type="text"
            onChange={this.maxCostOnChange}
            value={this.state.filterCost}
          />
          In stock{" "}
          <input
            type="checkbox"
            onChange={this.inStockOnChange}
            value={this.state.filterInStock}
          />
        </div>
        <div>user: {this.props.email}</div>
        {/* <div>{this.props.items.map(renderGridItems)}</div> */}
        <div>
          {displayedItems.map(item => {
            return (
              <div>
                <div>{item.name}</div>
                <img src={item.filePath} />
                <div>{item.description}</div>
                <div>{item.cost + "$"}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    email: state.email,
    items: state.items,
    itemFound: state.itemFound
  };
};

let Items = connect(mapStateToProps)(UnconnectedItems);
// let GridItem = connect(mapStateToProps)(UnconnectedGridItem);
export default Items;
// export { Items, GridItem };
