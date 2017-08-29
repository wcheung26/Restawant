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

  componentDidMount() {
    document.getElementById("background").style.backgroundImage = "url('../../../../assets/images/influencers.jpg')";
    document.getElementById("background").style.backgroundRepeat = "no-repeat";
    document.getElementById("background").style.backgroundPosition = "75%";
    document.getElementById("background").style.opacity = "0.8";
    document.getElementById("background").style.position = "fixed";
    document.getElementById("background").style.height = "100vh";
    document.getElementById("background-overlay").style.background = "rgba(47, 50, 56, 0.8)";
    document.getElementById("background-overlay").style.position = "fixed";
    document.getElementById("background-overlay").style.height = "100vh";
  }

  componentWillUnmount() {
    document.getElementById("background").style.backgroundImage = null;
    document.getElementById("background").style.backgroundRepeat = null;
    document.getElementById("background").style.backgroundPosition = null;
    document.getElementById("background").style.opacity = null;
    document.getElementById("background").style.position = null;
    document.getElementById("background").style.height = null;
    document.getElementById("background-overlay").style.background = null;
    document.getElementById("background-overlay").style.position = null;
    document.getElementById("background-overlay").style.height = null;
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
          <h3 className="forms-header">Influencer Signup</h3>
          <form className="forms">
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
            <button type="submit" className="btn btn-default forms-submit" onClick={this.handleSubmit}>Sign Up <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
          </form>
          { this.state.error ? (
              <ErrorMessage error={this.state.error} />
            ) : (
              null
            )
          }
          <div className="extra-action">
            <p>Already a member? <Link to="/influencer/login">Login</Link></p>
          </div> 
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

export default InfSignup;