import React, { Component } from "react";
import { Link } from "react-router-dom";

class InfLogin extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h3>Influencer Login</h3>
          <form method="POST" action="/influencer/login">
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
            <p>NOT A MEMBER? <Link to="/influencer/signup">SIGN UP</Link></p>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

export default InfLogin;