import React, { Component } from "react";

class ErrorMessage extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="alert alert-danger fade in">
        <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
        <strong>Error!</strong> {this.props.error}
      </div>
    );
  }
}

export default ErrorMessage;