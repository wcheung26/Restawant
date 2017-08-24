import React, { Component } from "react";
import { Link } from "react-router-dom";

class RestaurantSignupSuccess extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-6">
        <h4>Thank you for signing up with us! Your account will be activated once an administrator approves your account.</h4>
        <Link to="/"><button type="button" className="btn btn-default">Go back to Home</button></Link>
      </div>
    );
  }
}

export default RestaurantSignupSuccess;
