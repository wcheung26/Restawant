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
      results: ''
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

  handleSelect(fullAddress) {
    this.setState({ fullAddress })
  }

  render () {
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
      <div className="panel panel-default">
        <div className="panel-heading text-center">Search Your City</div>
        <div className="panel-body">
          <form>
            <div className="input-group">
              <label>Search Nearby</label>
              <span className="input-group-addon" id="building-icon"><i className="fa fa-building" aria-hidden="true"></i></span>
              <PlacesAutocomplete inputProps={inputProps} onSelect={this.handleSelect} classNames={cssClasses} />
            </div>
            <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
          </form>
          <InfluencerSearchResults results={this.state.results} />
        </div>
      </div>
    );
  };

};

export default InfluencerFind;