import React, { Component } from "react";

class AdminLogin extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h3>Admin Login</h3>
          <form method="POST" action="/admin/login">
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
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

export default AdminLogin;