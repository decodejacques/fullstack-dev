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
      quantity: 0
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
        <div className="Cart">
          <div className="ShoppingBag">
            <h1 className="ShoppingBagText">Shopping Bag</h1>
            {this.props.cart.map(cartItem => {
              let itemDetails = this.props.items.filter(item => {
                return item._id === cartItem.itemId;
              })[0];

              return (
                <div className="ItemsFrame">
                  <div className="ItemFrame">
                    <div className="ItemsPictureFrame">
                      <img
                        className="ItemPicture"
                        src={itemDetails.filePath}
                        height="200px"
                        width="200px"
                      />
                    </div>
                    <div>
                      <ul className="ItemsDetailsUl">
                        <li className="ItemsName">{itemDetails.name}</li>
                        <li className="ItemsDescription">
                          {itemDetails.description}
                        </li>
                        <li className="ItemsCost">
                          {itemDetails.cost + "$ "}{" "}
                        </li>
                        <li className="ItemsQuantity">
                          quantity: {cartItem.quantity}
                        </li>
                      </ul>
                    </div>
                    <button
                      className="RemoveOneItemButton"
                      onClick={this.removeOneFromCart}
                    >
                      -
                    </button>
                    <button
                      className="AddOneItemButton"
                      onClick={this.addOneToCart}
                    >
                      +
                    </button>
                    <button
                      className="RemoveItemButton"
                      onClick={this.removeFromCart}
                    >
                      remove from cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="Checkout">
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
                    token={this.onToken}
                    stripeKey="pk_test_O9HT5wBse32v6Ev3y8xDbYnQ00SpdfFqSl"
                  />
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
    itemId: state.itemId
  };
};
let Cart = connect(mapStateToProps)(UnconnectedCart);
export default Cart;
