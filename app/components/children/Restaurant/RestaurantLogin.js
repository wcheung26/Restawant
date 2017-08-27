import React, { Component } from "react";
import { Link } from "react-router-dom";

import ErrorMessage from "../ErrorMessage";

class RestLogin extends Component {
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

      $.post("/restaurant/login", login, (res => {
        if (res.success !== null) {
          if (res.success === true) {
            window.location.replace("/restaurant/dashboard");
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
          <h3>Restaurant Login</h3>
          <form>
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
              { this.state.showEmailError ? 
                <p className="form-error">* Please enter your email address.</p>
                : null
              }
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
              { this.state.showPasswordError ? 
                <p className="form-error">* Please enter your password.</p>
                : null
              }
            </div>
            <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
          </form>
          { this.state.error ? (
              <ErrorMessage error={this.state.error} />
            ) : (
              null
            )
          }
          <div className="extra-action">
            <p>NOT A MEMBER? <Link to="/restaurant/signup">SIGN UP</Link></p>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

export default RestLogin;