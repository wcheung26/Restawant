import React, { Component } from "react";
import { Link } from "react-router-dom";

class InfSignup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h3>Influencer Signup</h3>
          <form method="POST" action="/influencer/signup">
            <div className="form-group" >
              <label htmlFor="firstName">First Name</label>
              <input className="form-control"
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input className="form-control"
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input className="form-control"
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
                required
              />
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