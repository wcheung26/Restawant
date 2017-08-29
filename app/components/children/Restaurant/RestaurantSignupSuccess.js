import React, { Component } from "react";
import { Link } from "react-router-dom";

class RestaurantSignupSuccess extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-6">
        <h4 className="signup-success">Thank you for signing up with us! Your account will be activated once an administrator approves your account.</h4>
        <Link to="/"><button type="button" className="btn btn-default home">Home</button></Link>
      </div>
    );
  }
}

export default RestaurantSignupSuccess;
