import React, { Component } from "react";
import { Link } from "react-router-dom";

import ErrorMessage from "../ErrorMessage";

class InfLogin extends Component {
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

      $.post("/influencer/login", login, (res => {
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
          <h3 className="forms-header">Influencer Login</h3>
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
            <button type="submit" className="btn btn-default forms-submit" onClick={this.handleSubmit}>Login <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
          </form>
          { this.state.error ? (
              <ErrorMessage error={this.state.error} />
            ) : (
              null
            )
          }
          <div className="extra-action">
            <p>Not a member? <Link to="/influencer/signup">Sign Up</Link></p>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

export default InfLogin;