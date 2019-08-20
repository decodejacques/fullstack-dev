import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter
} from "react-router-dom";
import { browserHistory } from "react-router";
import {
  syncHistoryWithStore,
  routerReducer,
  routerMiddleware,
  push
} from "react-router-redux";
import { connect } from "react-redux";
// pagination
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import $ from "jquery";
// components
import Cart from "./Cart.jsx";
import NewItem from "./NewItem.jsx";
import Items from "./Items.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import ItemDetails from "./itemDetails.jsx";

import "./Item.css";
import { FiShoppingCart } from "react-icons/fi";

// pagnination
window.React = React;

export class CommentList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  render() {
    let commentNodes = this.props.data.map(function(comment, index) {
      return <div key={index}>{comment.comment}</div>;
    });

    return (
      <div id="project-comments" className="commentList">
        <ul>{commentNodes}</ul>
      </div>
    );
  }
}

// testing cronjob
class UnconnectedNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  logout = async () => {
    console.log("clicked logout");
    let response = await (await fetch("/logout", { method: "POST" })).text();
    let body = JSON.parse(response);
    if (body.success) {
      // console.log("this.state.email", this.state.email);
      // this.setState({ email: this.state.email });
      // this.props.dispatch({ type: "logout", email: this.state.email });
      this.props.history.push("/");
    }
  };
  render = () => {
    console.log("this.state.email", this.state.email);
    return (
      <nav>
        <div className="myNavbar">
          <NavLink to="/all-items" className="hvr-bounce-to-right">
            Home
          </NavLink>
          <NavLink className="hvr-bounce-to-right" to="/cart">
            <FiShoppingCart />
          </NavLink>
          <NavLink to="/new-item" className="hvr-bounce-to-right">
            Sell an item
          </NavLink>
          <button onClick={this.logout} className="hvr-bounce-to-right">
            Log out
          </button>
        </div>
      </nav>
    );
  };
}

let renderItemDetails = routerData => {
  return (
    <div>
      <ItemDetails
        id={routerData.match.params.id}
        history={routerData.history}
      />
    </div>
  );
};

class UnconnectedApp extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    // author: PropTypes.string.isRequired,
    perPage: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      offset: 6 /*0*/
    };
  }

  loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      data: { limit: this.props.perPage, offset: this.state.offset },
      dataType: "json",
      type: "GET",

      success: data => {
        this.setState({
          data: data.comments,
          pageCount: Math.ceil(data.meta.total_count / data.meta.limit)
        });
      },

      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString()); // eslint-disable-line
      }
    });
  }

  componentDidMount() {
    this.loadCommentsFromServer();
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({ offset: offset }, () => {
      this.loadCommentsFromServer();
    });
  };

  render = () => {
    return (
      <div>
        <div>
          <Router>
            <Navigation />
            <Route exact={true} path="/" component={Login} />
            <Route path="/cart" component={Cart} />
            <Route path="/new-item" component={NewItem} />
            <Route path="/all-items" component={Items} />
            <Route path="/item/:id" render={renderItemDetails} />
            <Route path="/signup" component={Signup} />
            {/* <Route path="/login" component={Login} /> */}
          </Router>
        </div>
        {/* <div className="commentBox">
          <CommentList data={this.state.data} />
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div> */}
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    email: state.email,
    data: state.data,
    offset: state.offset
  };
};

let Navigation = withRouter(UnconnectedNavigation);
let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
