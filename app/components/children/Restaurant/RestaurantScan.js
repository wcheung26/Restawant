import React, { Component } from "react";
import helpers from "../../utils/helpers";


class RestaurantSignup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantAuth: false,
      restaurantName: null
    }
  }

  componentDidMount() {
    console.log("didMount");
    helpers.checkRestaurantAuth().then(response => {
      if (response.data.id !== undefined) {
        this.setState({ 
          restaurantAuth: true,
          restaurantName: response.data.name
        });
      }
      else {
        this.setState({ restaurantAuth: false });
      }
    });
  }


  render() {
    if (this.state.restaurantAuth) {
      return (
        <div className="row">
          <div className="col-xs-12 text-center">
            <h1>{this.state.restaurantName}</h1>
            <hr />
            <h2>Thank you for scanning!<br /> <small>Your scan has been recorded.</small></h2>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-xs-12 text-center">
            <h1>Oops. Something went wrong.</h1>
            <hr />
            <h3>Please log in with your restaurant account, and then scan the code again.<br /> <small>Your scan was not recorded.</small></h3>
          </div>
        </div>
      )
    }
    
  }
}

export default RestaurantSignup;
