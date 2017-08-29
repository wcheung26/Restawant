import React, { Component } from "react";
import { Link } from "react-router-dom";

import ErrorMessage from "../ErrorMessage";

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
      showEmailError: false,
      showPasswordError: false
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

    this.setState({
      showEmailError: false,
      showPasswordError: false,
      error: null
    });

    let validate = true;

    if (!this.state.email) {
      validate = false;
      this.setState({
        showEmailError: true
      });
    }

    if (!this.state.password) {
      validate = false;
      this.setState({
        showPasswordError: true
      });
    }

    if (validate) {
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
  }
  
  render() {
    return (
      <div>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h3 className="forms-header">Admin Login</h3>
          <form className="forms">
            <div className="form-group">
              <input
                type="email"
                value={this.state.email}
                className="form-control"
                name="email"
                placeholder="&#xf0e0;   Email"
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
              { this.state.showEmailError ? 
                <p className="form-error">* Please enter your email address.</p>
                : null
              }
            </div>
            <div className="form-group">
              <input
                type="password"
                value={this.state.password}
                className="form-control"
                name="password"
                placeholder="&#xf023;   Password"
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
              { this.state.showPasswordError ? 
                <p className="form-error">* Please enter your password.</p>
                : null
              }
            </div>
            <button type="submit" className="btn btn-default forms-submit" onClick={this.handleSubmit}>Submit <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
          </form>
          { this.state.error ? (
              <ErrorMessage error={this.state.error} />
            ) : (
              null
            )
          }
          <div className="extra-action">
            <p><Link to="/admin/signup">Admin Signup</Link></p>
          </div> 
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

export default AdminLogin;