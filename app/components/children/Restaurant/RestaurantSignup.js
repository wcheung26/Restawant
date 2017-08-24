import React, { Component } from "react";
import { Link } from "react-router-dom";

import RestaurantSignupForm from "./RestaurantSignupForm";
import RestaurantSignupSuccess from "./RestaurantSignupSuccess";

class RestaurantSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayForm: true
    }

    this.setDisplay = this.setDisplay.bind(this);
  }

  setDisplay(displayForm) {
    this.setState({ displayForm: displayForm });
  }

  render() {
    return (
      <div>
        <div className="col-md-3"></div>
        { this.state.displayForm ? <RestaurantSignupForm setDisplay={this.setDisplay} /> : <RestaurantSignupSuccess /> }
        <div className="col-md-3"></div>
      </div>
    );
  }
}

export default RestaurantSignup;
