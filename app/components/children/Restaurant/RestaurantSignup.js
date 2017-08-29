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

  componentDidMount() {
    document.getElementById("background").style.backgroundImage = "url('../../../../assets/images/restaurants.jpg')";
    document.getElementById("background").style.backgroundRepeat = "no-repeat";
    document.getElementById("background").style.backgroundPosition = "75%";
    document.getElementById("background").style.opacity = "0.8";
    document.getElementById("background").style.position = "fixed";
    document.getElementById("background").style.height = "100vh";
    document.getElementById("background-overlay").style.background = "rgba(47, 50, 56, 0.8)";
    document.getElementById("background-overlay").style.position = "fixed";
    document.getElementById("background-overlay").style.height = "100vh";
  }

  componentWillUnmount() {
    document.getElementById("background").style.backgroundImage = null;
    document.getElementById("background").style.backgroundRepeat = null;
    document.getElementById("background").style.backgroundPosition = null;
    document.getElementById("background").style.opacity = null;
    document.getElementById("background").style.position = null;
    document.getElementById("background").style.height = null;
    document.getElementById("background-overlay").style.background = null;
    document.getElementById("background-overlay").style.position = null;
    document.getElementById("background-overlay").style.height = null;
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
