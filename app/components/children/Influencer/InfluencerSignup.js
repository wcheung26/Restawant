import React, { Component } from "react";
import { Link } from "react-router-dom";

import ErrorMessage from "../ErrorMessage";

class InfSignup extends Component {
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

  handleChange(event) {
    let newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      error: null,
      showFirstError: false,
      showLastError: false,
      showEmailError: false,
      showPasswordError: false,
      showValidEmailError: false
    });

    let validate = true;
    
    if (!this.state.firstName) {
      validate = false;
      this.setState({
        showFirstError: true
      });
    }

    if (!this.state.lastName) {
      validate = false;
      this.setState({
        showLastError: true
      });
    }

    let emailRe = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@([^<>()\.,;\s@\"])+\.([^<>()\.,;:\s@\"]{2,})$/;
    let validEmail = emailRe.test(this.state.email);

    if (!this.state.email) {
      validate = false;
      this.setState({
        showEmailError: true
      });
    }
    else if (!validEmail) {
      validate = false;
      this.setState({
        showValidEmailError: true
      });
    }

    if (!this.state.password) {
      validate = false;
      this.setState({
        showPasswordError: true
      });
    }

    if (validate) {
      let newUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      }

      $.post("/influencer/signup", newUser, (res => {
        if (res.success !== null) {
          if (res.success === true) {
            window.location.replace("/influencer/dashboard");
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
          <h3>Influencer Signup</h3>
          <form>
            <div className="form-group" >
              <label htmlFor="firstName">First Name</label>
              <input className="form-control"
                type="text"
                value={this.state.firstName}
                name="firstName"
                placeholder="First Name"
                onChange={this.handleChange}
                required
              />
              { this.state.showFirstError ? 
              <p className="form-error">* Please enter your first name.</p>
              : null
              }
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input className="form-control"
                type="text"
                value={this.state.lastName}
                name="lastName"
                placeholder="Last Name"
                onChange={this.handleChange}
                required
              />
              { this.state.showLastError ? 
              <p className="form-error">* Please enter your last name.</p>
              : null
              }
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input className="form-control"
                type="email"
                value={this.state.email}
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
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
              <label htmlFor="password">Password</label>
              <input className="form-control"
                type="password"
                value={this.state.password}
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
                required
              />
              { this.state.showPasswordError ? 
                <p className="form-error">* Please enter a password.</p>
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
            <p>ALREADY A MEMBER? <Link to="/influencer/login">LOGIN</Link></p>
          </div> 
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

export default InfSignup;