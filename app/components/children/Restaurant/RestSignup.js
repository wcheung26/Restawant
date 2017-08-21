import React, { Component } from "react";
import { Link } from "react-router-dom";

class RestSignup extends Component {
  // getInitialState() {

  // }
  render() {
    return (
      <div>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h3>Restaurant Signup</h3>
          <form>
            <div className="form-group">
              <label htmlFor="name">Restaurant Name</label>
              <input type="text" className="form-control" id="name" placeholder="Name" />
            </div>
            <div className="form-group">
              <label htmlFor="url">Yelp URL</label>
              <input type="url" className="form-control" id="url" placeholder="Yelp URL" />
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
        </div>
        <div>
          <p>ALREADY A MEMBER? <Link to="/restaurant">LOGIN</Link></p>
        </div> 
        <div className="col-md-3"></div>
      </div>
    );
  }
}

export default RestSignup;