import React, { Component } from "react";
import { Link } from "react-router-dom";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

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
      password: ''
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
    geocodeByAddress(this.state.fullAddress)
      .then(results => {
        var res = results[0].address_components;
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
          console.log(res);
          if (res.success !== null && res.success === true) {
            this.props.setDisplay(false);
          }
        }));

      }).catch(error => console.log('Error', error));
  }

  render() {
    const inputProps = {
      value: this.state.fullAddress,
      onChange: this.handleSelect,
      placeholder: 'Address',
      required: true
    }

    const cssClasses = {
      input: 'form-control',
      autocompleteContainer: 'my-autocomplete-container'
    }

    return (
      <div className="col-md-6">
        <h3>Restaurant Signup</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Restaurant Name</label>
            <input
              type="text"
              value={this.state.name}
              className="form-control"
              name="name"
              placeholder="Name"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="yelpId">Yelp Business ID</label>
            <input
              type="text"
              value={this.state.yelpId}
              className="form-control"
              name="yelpId"
              placeholder="Yelp Business ID"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="url">Link to Image of Seller's Permit</label>
            <input
              type="url"
              value={this.state.url}
              className="form-control"
              name="url"
              placeholder="Image URL"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <PlacesAutocomplete inputProps={inputProps} onSelect={this.handleSelect} classNames={cssClasses} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="number"
              value={this.state.phone}
              className="form-control"
              name="phone"
              placeholder="Phone Number"
              onChange={this.handleChange}
              required
            />
          </div>
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
        <div className="extra-action">
          <p>ALREADY A MEMBER? <Link to="/restaurant/login">LOGIN</Link></p>
        </div> 
      </div>
    );
  }
}

export default RestaurantSignupForm;