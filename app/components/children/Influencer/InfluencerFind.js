import React from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import InfluencerSearchResults from "./InfluencerSearchResults";

class InfluencerFind extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fullAddress: '',
      city: '',
      state: '',
      results: '',
      showAddressError: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(event) {
    let newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      showAddressError: false
    });

    let validate = true;

    if (!this.state.fullAddress) {
      validate = false;
      this.setState({
        showAddressError: true
      });
    }

    if (validate) {
      geocodeByAddress(this.state.fullAddress)
        .then(results => {
          console.log(results);
          var res = results[0].address_components;
          if (res.length > 5) {
            this.setState({
              city: res[3].long_name,
              state: res[5].short_name
            });
          } else {
            this.setState({
              city: res[0].long_name,
              state: res[2].short_name
            })
          }

          $.get(`/api/influencer/find/${this.state.state}/${this.state.city}`, (res => {
            console.log(res)
            this.setState({ results: res })
          }));
      }).catch(error => console.log('Error', error));
    }
  }

  handleSelect(fullAddress) {
    this.setState({ fullAddress })
  }

  render () {
    const inputProps = {
      value: this.state.fullAddress,
      onChange: this.handleSelect,
      placeholder: 'Nearby City',
      required: true
    }

    const cssClasses = {
      input: 'form-control',
      autocompleteContainer: 'my-autocomplete-container'
    }

    return (
      <div className="">
        <h2 className="dashboard-header"><i className="fa fa-search" aria-hidden="true"></i> Find Promotions</h2>
        <hr />
        <form className="dashboard-form">
          <div className="form-group">
            <PlacesAutocomplete inputProps={inputProps} onSelect={this.handleSelect} classNames={cssClasses} />
            { this.state.showAddressError ? 
              <p className="form-error">* Please enter a city or address.</p>
              : null
            }
          </div>
          <button type="submit" className="btn btn-default dashboard-submit" onClick={this.handleSubmit}>Search <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
        </form>
        <InfluencerSearchResults results={this.state.results} />
      </div>
    );
  };

};

export default InfluencerFind;