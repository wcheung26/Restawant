import React, { Component } from "react";
import { Link } from "react-router-dom";

class RestSignup extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h3>Restaurant Signup</h3>
          <form method="POST" action="/restaurant/signup">
            <div className="form-group">
              <label htmlFor="name">Restaurant Name</label>
              <input type="text" className="form-control" name="name" placeholder="Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="yelpId">Yelp Business ID</label>
              <input type="number" className="form-control" name="yelpId" placeholder="Yelp Business ID" required />
            </div>
            <div className="form-group">
              <label htmlFor="url">Link to Image of Seller's Permit</label>
              <input type="url" className="form-control" name="url" placeholder="Image URL" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" className="form-control" name="email" placeholder="Email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" name="password" placeholder="Password" required />
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
          <div className="extra-action">
            <p>ALREADY A MEMBER? <Link to="/restaurant">LOGIN</Link></p>
          </div> 
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

export default RestSignup;