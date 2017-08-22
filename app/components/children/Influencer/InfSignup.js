import React, { Component } from "react";
import { Link } from "react-router-dom";

class InfSignup extends Component {
  // getInitialState() {

  // }
  render() {
    return (
      <div>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h3>Influencer Signup</h3>
          <form>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" className="form-control" id="firstName" placeholder="First Name" />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" className="form-control" id="lastName" placeholder="Last Name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" className="form-control" id="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
          <div className="extra-action">
            <p>ALREADY A MEMBER? <Link to="/influencer">LOGIN</Link></p>
          </div> 
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

export default InfSignup;