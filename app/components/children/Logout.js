import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import helpers from "../utils/helpers";

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    helpers.logOut();
    this.props.setUserAuth(false);
  }

  render() {
    return (
      <Redirect to="/" />
    );
  }
}

export default Logout;