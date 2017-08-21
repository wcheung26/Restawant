import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import RestSignup from "./RestSignup";
import RestLogin from "./RestLogin";

class Restaurant extends Component {
  // getInitialState() {

  // }
  render() {
    return (
      <div className="col-md-12">


        <Route path="/restaurant/login" render={(props) => (
          <RestLogin {...props}
          />
        )} />
        <Route path="/restaurant/signup" render={(props) => (
          <RestSignup {...props}
          />
        )} />
      </div>
    );
  }
}

export default Restaurant;