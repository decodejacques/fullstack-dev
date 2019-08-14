//import necessary libraries

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./main.css";

//you will create a listing on this page
// it send the information about the item to the backend, so that backend can store it
//upon submitting the form the url is changed, upon that change the listingSubmitted component is rendered

//here i am creating a constructor and state prop so that i can use setState later
class newItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: "",
      inputDesc: "",
      inputUrl: "",
      inputPrice: "",
      itemName: "",
      itemDesc: "",
      itemPrice: "",
      itemId: "",
      itemUrl: ""
    };
  }

  // way to structure the item to send to the backend
  // itemToSend = {
  //   itemName: newItemName,
  //   description: newItemDesc,
  //   price: newItemPrice,
  //   //userID below will come as a props from the App.js
  //   //sellerId: this.state.userId,
  //   itemUrl: newItemUrl
  // };

  handleItemName(event) {
    this.setState({ inputItemName: event.target.value });
  }

  handleItemDesc(event) {
    this.setState({ inputItemDesc: event.target.value });
  }

  handleItemPrice(event) {
    this.setState({ inputItemPrice: event.target.value });
  }
  handleItemUrl(event) {
    this.setState({ inputItemUrl: event.target.value });
  }

  uploadFile(x) {
    var filename = x.name;
    var fileExtension = filename.split(".").pop();
    fetch("/upics?ext=" + fileExtension, { method: "POST", body: x })
      .then(response => response.text())
      .then(response => this.setState({ inputItemUrl: response }));
  }

  handleSubmit = () => {
    fetch("/new-item", {
      method: "POST",
      body: JSON.stringify(itemToSend)
    })
      .then(response => response.text())
      .then(response => {
        let itemId = JSON.parse(response);
        this.setState({ itemId: itemId });
        this.props.getItemId(itemId);
        // receives the itemID from the backend
        this.props.history.push("/listingSubmitted/" + itemId);
      });
  };

  render() {
    return (
      <div>
        <div className="cardcreatelistingcard">
          Create a listing for your item
          <div className="createAListingForm">
            <form onSubmit={this.handleSubmit}>
              <div className="textspacing">
                Name your listing:
                <input
                  type="text"
                  value={this.state.inputName}
                  placeholder="Item name"
                  onChange={this.handleItemName}
                />
              </div>
              <div className="textSpacing">
                Write a description here
                <input
                  type="text"
                  value={this.state.inputDesc}
                  placeholder="Item description"
                  onChange={this.handleItemDesc}
                />
              </div>
              <div className="textSpacing">
                How much would you like to sell it for?
                <input
                  type="text"
                  value={this.state.inputPrice}
                  placeholder="Item price"
                  onChange={this.handleItemPrice}
                />
              </div>
              <div className="textspacing">
                Upload an image:
                <input
                  type="file"
                  id="input"
                  onChange={e => this.uploadFile(e.target.files[0])}
                />
              </div>
              <div className="textspacing">
                <input className="buttontoadd" type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

let NewItem = withRouter(newItemForm);
export default NewItem;
