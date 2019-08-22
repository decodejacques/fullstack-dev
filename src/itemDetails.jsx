import React, { Component } from "react";
import "./main.css";
import "./ItemDetails.css";
import { connect } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";
import { routerMiddleware, push } from "react-router-redux";
import Cart from "./Cart.jsx";
class UnconnectedItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      quantity: 0,
      itemId: "",
      loveIt: 0,
      // cart: this.props.cart,
      displayCheckout: false,
      reviews: ""
    };
  }

  componentDidMount = /*async*/ () => {
    let updateItems = async () => {
      // get all items from the server
      let response = await fetch("/items");
      let responseBody = await response.text();
      //   console.log("responseBody", responseBody);
      let parsed = JSON.parse(responseBody);
      console.log("parsed", parsed);
      this.props.dispatch({ type: "set-items", items: parsed });
    };
    setInterval(updateItems, 500);
  };

  // componentDidMount = () => {
  //   this.reload();
  // };
  // componentDidUpdate = (prevProps, prevState) => {
  //   if (prevState.items !== this.state.items) {
  //     this.reload();
  //   }
  // };

  // reload = async () => {
  //   let response = await fetch("/items");
  //   let responseBody = await response.text();
  //   let parsed = JSON.parse(responseBody);
  //   console.log("parsed", parsed);
  //   this.props.dispatch({ type: "set-items", items: parsed });
  // };

  handleCheckout = () => {
    this.props.history.push("/cart");
    return;
  };
  handleContinueShopping = () => {
    this.props.history.push("/all-items");
    return;
  };
  handleText = event => {
    event.preventDefault();
    this.setState({ reviews: event.target.value });
    console.log("this.state.reviews", this.state.reviews);
  };

  handleReview = async event => {
    event.preventDefault();
    console.log("this.state.reviews", this.state.reviews);
    let formData = new FormData();
    formData.append("review", this.state.reviews);
    console.log("this.state.reviews", this.state.reviews);
    formData.append("itemId", this.props.id);
    console.log(this.state.reviews);

    let response = await fetch("/reviews", {
      method: "POST",
      body: formData,
      credentials: "include"
    }).then(response => response.text());

    let parsed = JSON.parse(response);

    this.props.dispatch({ type: "set-reviews", reviews: parsed });
  };

  addToCart = async () => {
    console.log("add to cart: id ", this.props.id);
    this.props.dispatch({
      type: "add-item-to-cart",
      itemId: this.props.id
    });

    this.setState(
      {
        ...this.state,
        quantity: (this.state.quantity += 1),
        itemId: this.props.id,
        displayCheckout: !this.state.displayCheckout
      },
      async () => {
        let data = new FormData();
        console.log("add to cart: id ", this.props.id);
        // data.append("itemId", this.props.id);
        data.append("itemId", this.state.itemId);
        data.append("quantity", 1);
        let response = await fetch("/add-to-cart", {
          method: "POST",
          body: data,
          credentials: "include"
        });
        let responseBody = await response.text();
        let body = JSON.parse(responseBody);
        if (!body.success) {
          alert("Oops an error occured");
          return;
        }
      }
    );
  };

  handleLoveIt = async () => {
    console.log("handle love it: id ", this.props.id);
    this.props.dispatch({
      type: "love-it",
      itemId: this.props.id
    });
    this.setState(
      {
        ...this.state,
        itemId: this.props.id,
        loveIt: (this.state.loveIt += 1)
      },
      async () => {
        let data = new FormData();
        console.log("this.state.itemId", this.state.itemId);
        data.append("itemId", this.state.itemId);
        console.log("this.state.itemId", this.state.itemId);
        data.append("loveItNumber", 1);
        let response = await fetch("/add-a-loveIt", {
          method: "POST",
          body: data,
          credentials: "include"
        });
        let responseBody = await response.text();
        let body = JSON.parse(responseBody);
        console.log("body", body);
      }
    );
  };

  render = () => {
    let displayItem = this.props.items.filter(item => {
      return item._id === this.props.id;
    });
    // console.log("displayItem.name", displayItem.name);
    return (
      <div>
        <div>
          {displayItem.map(item => {
            return (
              <div>
                <div>
                  <img
                    className="ItemPicture"
                    src={item.filePath}
                    height="400px"
                    width="350px"
                  />
                  <div className="itemInfo">
                    <div>{item.name}</div>
                    <div>{item.description}</div>
                    <div>{item.cost + "$"}</div>{" "}
                    <div
                      className="ItemDescription"
                      style={{
                        display: item.available_quantity <= 0 ? "block" : "none"
                      }}
                    >
                      SOLD OUT
                    </div>
                    <div className="addButton">
                      <button className="newButton" onClick={this.handleLoveIt}>
                        love it!
                      </button>
                    </div>
                    <div className="addButton">
                      <button
                        className="newButton"
                        onClick={this.addToCart}
                        style={{
                          display:
                            item.available_quantity <= 0 ? "none" : "block"
                        }}
                      >
                        add to cart
                      </button>
                    </div>
                    <div>
                      <div
                        style={{
                          display: this.state.quantity >= 1 ? "block" : "none"
                        }}
                      >
                        <button onClick={this.handleCheckout}>
                          checkout
                          {/* <div style={{ display: "none" }}>
                <Cart id={this.state.itemId} />
              </div> */}
                        </button>
                        <button onClick={this.handleContinueShopping}>
                          Continue shopping
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                {console.log("item.review", item.review)}
                <div className="reviewBox">
                  <br />
                  <div>Reviews</div> <br />
                  {item.review
                    ? item.review.map(UniqueReview => {
                        return (
                          <div className="newReview">
                            <b> {UniqueReview.username} </b> <br /> <br />
                            {UniqueReview.message}
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            );
          })}
        </div>

        <div className="reviewForm">
          <form onSubmit={this.handleReview}>
            {" "}
            <div className="divTitle"> Add a review </div>
            <input
              className="formInput"
              type="text"
              name="review"
              value={this.state.reviews}
              onChange={this.handleText}
            />
            <input className="submitButton" type="submit" value="submit" />
          </form>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    items: state.items,
    email: state.email,
    // cart: state.cart,
    itemId: state.itemId,
    reviews: state.reviews
  };
};

let ItemDetails = connect(mapStateToProps)(UnconnectedItemDetails);
// let Navigation = withRouter(UnconnectedNavigation);
export default ItemDetails;
