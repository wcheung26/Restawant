import React, { Component } from "react";
import { Link } from "react-router-dom";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import ErrorMessage from "../ErrorMessage";

class RestaurantSignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      yelpId: '',
      url: '',
      fullAddress: '',
      address: '',
      city: '',
      state: '',
      phone: '',
      email: '',
      password: '',
      error: null,
      showNameError: false,
      showYelpError: false,
      showUrlError: false,
      showAddressError: false,
      showPhoneError: false,
      showValidEmailError: false,
      showEmailError: false,
      showPasswordError: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  handleSelect(fullAddress) {
    this.setState({ fullAddress })
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      error: null,
      showNameError: false,
      showYelpError: false,
      showUrlError: false,
      showValidUrlError: false,
      showAddressError: false,
      showPhoneError: false,
      showEmailError: false,
      showPasswordError: false,
      showValidEmailError: false,
      showValidUrlError: false
    });

    let validate = true;
    
    if (!this.state.name) {
      validate = false;
      this.setState({
        showNameError: true
      });
    }

    if (!this.state.yelpId) {
      validate = false;
      this.setState({
        showYelpError: true
      });
    }

    let urlRe = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    let validUrl = urlRe.test(this.state.url);

    if (!this.state.url) {
      validate = false;
      this.setState({
        showUrlError: true
      });
    }
    else if (!validUrl) {
      validate = false;
      this.setState({
        showValidUrlError: true
      });
    }

    if (!this.state.fullAddress) {
      validate = false;
      this.setState({
        showAddressError: true
      });
    }

    if (!this.state.phone) {
      validate = false;
      this.setState({
        showPhoneError: true
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
      geocodeByAddress(this.state.fullAddress)
        .then(results => {
          let res = results[0].address_components;
          this.setState({
            address: `${res[0].short_name} ${res[1].short_name}`,
            city: res[3].long_name,
            state: res[5].short_name
          });

          let newRestaurant = {
            name: this.state.name,
            yelpId: this.state.yelpId,
            url: this.state.url,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            phone: this.state.phone,
            email: this.state.email,
            password: this.state.password
          }

          $.post("/restaurant/signup", newRestaurant, (res => {
            if (res.success !== null) {
              if (res.success === true) {
                this.props.setDisplay(false);
              }
              else if (res.success === false) {
                this.setState({ error: res.message });
              }
            }
          }));
      }).catch(error => console.log('Error', error));
    }
  }

  render() {
    const inputProps = {
      value: this.state.fullAddress,
      onChange: this.handleSelect,
      placeholder: "Address",
      required: true
    }

    const cssClasses = {
      input: 'form-control address-sign-up',
      autocompleteContainer: 'my-autocomplete-container'
    }

    return (
      <div className="col-md-6">
        <h3 className="forms-header">Restaurant Signup</h3>
        <form className="forms">
          <div className="form-group">
            <input
              type="text"
              value={this.state.name}
              className="form-control"
              name="name"
              placeholder="Restaurant Name"
              onChange={this.handleChange}
              autoComplete="off"
              required
            />
            { this.state.showNameError ? 
              <p className="form-error">* Please enter the name of your restaurant.</p>
              : null
            }
          </div>
          <div className="form-group">
            <input
              type="text"
              value={this.state.yelpId}
              className="form-control"
              name="yelpId"
              placeholder="Yelp Business ID"
              onChange={this.handleChange}
              autoComplete="off"
              required
            />
            { this.state.showYelpError ? 
              <p className="form-error">* Please enter your Yelp Business ID.</p>
              : null
            }
          </div>
          <div className="form-group">
            <input
              type="url"
              value={this.state.url}
              className="form-control"
              name="url"
              placeholder="Seller's Permit URL"
              onChange={this.handleChange}
              autoComplete="off"
              required
            />
            { this.state.showUrlError ? 
              <p className="form-error">* Please enter the link to your seller's permit.</p>
              : null
            }
            { this.state.showValidUrlError ? 
              <p className="form-error">* Please enter a valid url.</p>
              : null
            }
          </div>
          <div className="form-group">
            <PlacesAutocomplete inputProps={inputProps} onSelect={this.handleSelect} classNames={cssClasses}/>
            { this.state.showAddressError ? 
              <p className="form-error">* Please enter your address.</p>
              : null
            }
          </div>
          <div className="form-group">
            <input
              type="number"
              value={this.state.phone}
              className="form-control"
              name="phone"
              placeholder="Phone Number"
              onChange={this.handleChange}
              required
            />
            { this.state.showPhoneError ? 
              <p className="form-error">* Please enter your phone number.</p>
              : null
            }
          </div>
          <div className="form-group">
            <input
              type="email"
              value={this.state.email}
              className="form-control"
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
            <input
              type="password"
              value={this.state.password}
              className="form-control"
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
          <p>Already a member? <Link to="/restaurant/login">Login</Link></p>
        </div> 
      </div>
    );
  }
}

export default RestaurantSignupForm;