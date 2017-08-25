import React, { Component } from "react";

import ErrorMessage from "../ErrorMessage";

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();

    let login = {
      email: this.state.email,
      password: this.state.password
    }

    $.post("/admin/login", login, (res => {
      if (res.success !== null) {
        if (res.success === true) {
          window.location.replace("/admin/dashboard");
        }
        else if (res.success === false) {
          this.setState({ error: res.message });
        }
      }
    }));
  }
  
  render() {
    return (
      <div>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h3>Admin Login</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                value={this.state.email}
                className="form-control"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={this.state.password}
                className="form-control"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
          { this.state.error ? (
              <ErrorMessage error={this.state.error} />
            ) : (
              null
            )
          }
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

export default AdminLogin;