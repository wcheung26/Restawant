import React, { Component } from "react";
import { Link } from "react-router-dom";

class AdminSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      error: null,
      showFirstError: false,
      showLastError: false,
      showEmailError: false,
      showPasswordError: false,
      showValidEmailError: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.getElementById("background").style.backgroundColor = "#2f3238";
    document.getElementById("background").style.position = "fixed";
    document.getElementById("background").style.height = "100vh";
  }

  componentWillUnmount() {
    document.getElementById("background").style.backgroundColor = null;
    document.getElementById("background").style.position = null;
    document.getElementById("background").style.height = null;
  }

  handleChange(event) {
    let newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h3 className="forms-header">Admin Signup</h3>
          <form className="forms" method="POST" action="/admin/signup">
            <div className="form-group" >
              <input className="form-control"
                type="text"
                value={this.state.firstName}
                name="firstName"
                placeholder="First Name"
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
              { this.state.showFirstError ? 
              <p className="form-error">* Please enter your first name.</p>
              : null
              }
            </div>
            <div className="form-group">
              <input className="form-control"
                type="text"
                value={this.state.lastName}
                name="lastName"
                placeholder="Last Name"
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
              { this.state.showLastError ? 
              <p className="form-error">* Please enter your last name.</p>
              : null
              }
            </div>
            <div className="form-group">
              <input className="form-control"
                type="email"
                value={this.state.email}
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
              { this.state.showEmailError ? 
                <p className="form-error">* Please enter your email address.</p>
                : null
              }
              { this.state.showValidEmailError ? 
                <p className="form-error">* Please enter a valid email address.</p>
                : null
              }
            </div>
            <div className="form-group">
              <input className="form-control"
                type="password"
                value={this.state.password}
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
              { this.state.showPasswordError ? 
                <p className="form-error">* Please enter a password.</p>
                : null
              }
            </div>
            <button type="submit" className="btn btn-default forms-submit">Submit <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
          </form>
          <div className="extra-action">
            <p><Link to="/admin/login">Admin Login</Link></p>
          </div> 
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

export default AdminSignup;