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
      inputItemName: "",
      inputItemDesc: "",
      inputUrl: "",
      inputItemPrice: "",
      inputItemQuantity: ""
    };
  }

  handleItemName = event => {
    this.setState({ inputItemName: event.target.value });
  };

  handleItemDesc = event => {
    this.setState({ inputItemDesc: event.target.value });
  };

  handleItemPrice = event => {
    this.setState({ inputItemPrice: event.target.value });
  };
  handleItemUrl = event => {
    this.setState({ inputItemUrl: event.target.value });
  };

  uploadFile = e => {
    this.setState({ inputItemImage: e });
  };
  handleItemQuantity = event => {
    this.setState({ inputItemQuantity: event.target.value });
  };

  handleSubmit = () => {
    let formData = new FormData();
    formData.append("name", this.state.inputItemName);
    formData.append("description", this.state.inputItemDesc);
    formData.append("cost", this.state.inputItemPrice);
    formData.append("itemImage", this.state.inputItemImage);
    formData.append("available_quantity", this.state.inputItemQuantity);
    fetch("/new-item", {
      method: "POST",
      body: formData
    })
      .then(response => response.text())
      .then(response => {
        let itemId = JSON.parse(response);
        this.setState({ itemId: itemId });
        this.props.getItemId(itemId);
        // receives the itemID from the backend
      });
  };

  render() {
    return (
      <div>
        <div className="cardcreatelistingcard">
          <video
            loop
            src="images/farmer.mov"
            width="1400"
            height="690"
            controls="controls"
            autoPlay={true}
          />
        </div>
        <div className="createAListingForm">
          <h2>Create a listing for your item</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="textspacing">
              Name your listing:
              <input
                className="FormNameListing"
                type="text"
                name="mytext"
                value={this.state.inputName}
                placeholder="Item name"
                onChange={this.handleItemName}
              />
            </div>
            <div className="textSpacing">
              Write a description here
              <input
                className="FormDescriptionListing"
                type="text"
                name="mytext"
                value={this.state.inputDesc}
                placeholder="Item description"
                onChange={this.handleItemDesc}
              />
            </div>
            <div className="textSpacing">
              How much would you like to sell it for?
              <input
                type="text"
                name="mytext"
                value={this.state.inputItemPrice}
                placeholder="Item price"
                onChange={this.handleItemPrice}
              />
            </div>
            <div className="textSpacing">
              How many do you have in stock?
              <input
                type="text"
                name="mytext"
                value={this.state.inputItemQuantity}
                placeholder="Item quantity"
                onChange={this.handleItemQuantity}
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
    );
  }
}

let NewItem = withRouter(newItemForm);
export default NewItem;
