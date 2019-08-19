import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import ItemDetails from "./itemDetails.jsx";
import "./cart.css";

class UnconnectedCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart,
      items: this.props.items,
      itemId: this.props.itemId,
      quantity: 0,
      loggedIn: this.props.loggedIn,
      email: this.props.email
    };
  }

  componentDidMount = () => {
    let updateCartItems = async () => {
      // get all cart items from the server
      let response = await fetch("/cart-items");
      let responseBody = await response.text();
      //   console.log("responseBody", responseBody);
      let parsed = JSON.parse(responseBody);
      // console.log("parsed", parsed);
      this.props.dispatch({ type: "set-cart", cart: parsed });
    };
    setInterval(updateCartItems, 500);
  };

  onToken = token => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        // alert(`Thank you for your purchase! ${data.email}`);
        // add username/email below
        alert(`Thank you for your purchase ${this.props.email}! `);
      });
    });
  };

  removeOneFromCart = async () => {
    this.setState(
      {
        ...this.state,
        itemId: this.props.itemId,
        quantity: (this.state.quantity -= 1)
      },
      async () => {
        console.log("this.state.itemId", this.state.itemId);
        console.log("this.props.itemId", this.props.itemId);

        let data = new FormData();
        data.append("itemId", this.state.itemId);
        data.append("quantity", -1);
        let response = await (await fetch("/update-quantity-cart", {
          method: "POST",
          body: data
        })).text();
        let body = JSON.parse(response);
      }
    );
  };

  addOneToCart = async () => {
    this.setState(
      {
        ...this.state,
        itemId: this.props.itemId,
        quantity: (this.state.quantity += 1)
      },
      async () => {
        let data = new FormData();
        data.append("itemId", this.state.itemId);

        data.append("quantity", +1);
        let response = await (await fetch("/update-quantity-cart", {
          method: "POST",
          body: data
        })).text();
        let body = JSON.parse(response);
      }
    );
  };
  removeFromCart = async () => {
    this.setState(
      {
        ...this.state,
        itemId: this.props.itemId
      },
      async () => {
        let data = new FormData();
        data.append("itemId", this.state.itemId);

        let response = await (await fetch("/remove-from-cart", {
          method: "POST",
          body: data
        })).text();
        let body = JSON.parse(response);
      }
    );
  };

  clearCart = async () => {
    let response = await (await fetch("/checkout", {
      method: "POST"
    })).text();
    let body = JSON.parse(response);
  };

  render = () => {
    return (
      <div className="MainFrame">
        <div className="ShoppingBag">
          <div className="ShoppingBagText">Shopping Bag</div>
          {this.props.cart.map(cartItem => {
            let itemDetails = this.props.items.filter(item => {
              return item._id === cartItem.itemId;
            })[0];

            return (
              <div className="ItemFrame">
                <a className="ItemsPictureFrame">
                  <img
                    className="ItemPicture"
                    src={itemDetails.filePath}
                    height="300px"
                    width="300px"
                  />
                </a>
                <div className="ItemsDetailsDiv">
                  <span className="ItemsName">{itemDetails.name}</span>
                  <span className="ItemsDescription">
                    {itemDetails.description}
                  </span>
                </div>
                <div className="ItemPriceDiv">
                  <span className="ItemsCost"> {itemDetails.cost + "$ "} </span>
                </div>

                <div className="SubTotalDiv">
                  <span className="SubTotalText">sub total</span>
                </div>

                <div className="QuantityButtons">
                  <div className="ItemsQuantity">
                    quantity: {cartItem.quantity}
                  </div>
                  <button
                    className="AddOneItemButton"
                    id="buttonCart"
                    onClick={this.addOneToCart}
                  >
                    +
                  </button>
                  <button
                    className="RemoveOneItemButton"
                    id="buttonCart"
                    onClick={this.removeOneFromCart}
                  >
                    -
                  </button>
                </div>

                <button
                  className="RemoveItemButton"
                  onClick={this.removeFromCart}
                >
                  remove from cart
                </button>
              </div>
            );
          })}
          <div className="Checkout">
            <h1>Total Price: </h1>
            <h1>
              Checkout
              <div className="StripeFrame">
                <button
                  className="StripeButton"
                  onClick={this.clearCart}
                  style={{ border: "0px" }}
                >
                  <StripeCheckout
                    // {<button className="btn btn-primary">checkout now!
                    // </button>}
                    ComponentClass="div"
                    token={this.onToken}
                    stripeKey="pk_test_O9HT5wBse32v6Ev3y8xDbYnQ00SpdfFqSl"
                  >
                    <button className="StripeButtonText"> Hello Money!</button>
                  </StripeCheckout>
                </button>
              </div>
            </h1>
          </div>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    email: state.email,
    cart: state.cart,
    items: state.items,
    itemId: state.itemId,
    loggedIn: state.loggedIn
  };
};
let Cart = connect(mapStateToProps)(UnconnectedCart);
export default Cart;
