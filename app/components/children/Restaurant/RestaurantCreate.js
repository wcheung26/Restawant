import React from "react";

import helpers from "../../utils/helpers";

class RestaurantCreate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      type: "text",
      formPromoName: "",
      formPromo: "",
      formExpiration: "",
      formReward: "",
      showPromoNameError: false,
      showPromoError: false,
      showExpirationError: false,
      showExpirationInvalidError: false,
      showRewardError: false,
      showRewardInvalidError: false,
      showSuccessMessage: false
    }

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.showSuccessMessage !== this.state.showSuccessMessage) {
      setTimeout(() => {
        this.setState({
          showSuccessMessage: false
        })
      }, 30000);
    }
  }

  onFocus() {
    this.setState({
      type: "date"
    });
  }

  onBlur() {
    this.setState({
      type: "text"
    });
  }

  handleChange(event) {
    let newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      showPromoNameError: false,
      showPromoError: false,
      showExpirationError: false,
      showExpirationInvalidError: false,
      showRewardError: false,
      showRewardInvalidError: false,
      showSuccessMessage: false
    });      
    // Save to Database if Valid
    console.log("Promo Name: ", this.state.formPromoName);
    console.log("Promo Code: ", this.state.formPromo);
    console.log("Expiration: ", this.state.formExpiration);
    console.log("Reward: ", this.state.formReward);

    // Must set a variable like this because setState is asynchronous 
    let success = true;

    if (!this.state.formPromoName) {
      success = false;
      this.setState({
        showPromoNameError: true
      });
    }

    if (!this.state.formPromo) {
      success = false;
      this.setState({
        showPromoError: true
      });
    }

    if (!this.state.formExpiration) {
      success = false;
      this.setState({
        showExpirationError: true
      });
    } else {
      // console.log("Promo Expiration Date: ", moment(this.state.formExpiration));
      // console.log("Today: ", moment());
      // a.diff(b) is equivalent to a - b < 0
      // b.diff(a) is equivalent to b - a > 0
      // console.log(moment(this.state.formExpiration).diff(moment(), "years", true));
      // console.log(moment(this.state.formExpiration).diff(moment(), "years", true) > 2);
      if (this.state.formExpiration < moment().format("YYYY-MM-DD") || moment(this.state.formExpiration).diff(moment(), "years", true) > 2) {
        success = false;
        this.setState({
          showExpirationInvalidError: true
        }); 
      }
    }

    if (!this.state.formReward) {
      success = false;
      this.setState({
        showRewardError: true
      });
    } else {
      // console.log("Reward input is string... ", !parseInt(this.state.formReward));
      if (!parseInt(this.state.formReward)) {
        success = false;
        this.setState({
          showRewardInvalidError: true
        });
      }
    }

    if (success) {
      let newPromo = {
        name: this.state.formPromoName,
        offer: this.state.formPromo,
        expiration: this.state.formExpiration,
        reward: this.state.formReward
      };

      helpers.createRestaurantPromo(newPromo);

      this.setState({
        formPromoName: "",
        formPromo: "",
        formExpiration: "",
        formReward: "",
        showSuccessMessage: true
      });
    }

  }

  render () {
    return (
      <div className="">
        <h2 className="dashboard-header"><i className="fa fa-plus" aria-hidden="true"></i> Create Promotion</h2>
        <hr />
        <form className="dashboard-form">
          <div className="form-group">
            <input
              type="text" 
              value={this.state.formPromoName}
              className="form-control"
              id="formPromoName" 
              placeholder="&#xf0a3;   Promotion Name" 
              onChange={this.handleChange}
              autoComplete="off"
              required 
            />  
          </div>
          { this.state.showPromoNameError ? 
            <p className="form-error">* Please provide a name for your promotion.</p>
           : null }
          <div className="form-group">
            <input
              type="text" 
              value={this.state.formPromo}
              className="form-control"
              id="formPromo" 
              placeholder="&#xf06b;   Offer Details" 
              onChange={this.handleChange}
              autoComplete="off"
              required 
            />
          </div>
          { this.state.showPromoError ? 
            <p className="form-error">* Please enter the promotion details.</p>
           : null }
          <div className="form-group">
            <input
              type={this.state.type} 
              value={this.state.formExpiration}
              className="form-control" 
              id="formExpiration"
              placeholder="&#xf073;   Expiration Date" 
              onChange={this.handleChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              required
            />
          </div>
          { this.state.showExpirationError ? 
            <p className="form-error">* Please enter the expiration date of the promotion.</p>
           : null }
          { this.state.showExpirationInvalidError ? 
            <p className="form-error">* Please enter a valid expiration date for the promotion.</p>
           : null }
          <div className="form-group">
            <input
              type="text" 
              value={this.state.formReward}
              className="form-control" 
              id="formReward"
              placeholder="&#xf155;   Reward Per Scan" 
              onChange={this.handleChange}
              autoComplete="off"
              required
            />
          </div>
          { this.state.showRewardError ? 
            <p className="form-error">* Please enter the reward per scan (in dollars) to the influencer.</p>
           : null }
          { this.state.showRewardInvalidError ? 
            <p className="form-error">* Please enter a number for the reward per scan (in dollars).</p>
           : null }
          <button type="submit" className="btn btn-default dashboard-submit" onClick={this.handleSubmit}>Create <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
          { this.state.showSuccessMessage ?
            <span className="success-message"><i className="fa fa-check-square" aria-hidden="true"></i> Promotion successfully created!</span>
           : null }
        </form>
      </div>
    );
  };

};

export default RestaurantCreate;