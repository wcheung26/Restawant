import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";

import RestaurantDashboard from "./children/Restaurant/RestaurantDashboard";
import RestaurantScan from "./children/Restaurant/RestaurantScan"
import InfluencerDashboard from "./children/Influencer/InfluencerDashboard";
import OtherView from "./children/OtherView";
import Logout from "./children/Logout";
import { Modal, Button } from 'react-bootstrap';

import helpers from "./utils/helpers";

class Main extends Component {
  constructor(props) {
    super(props);

		this.state = {
      restaurantAuth: false,
      influencerAuth: false,
      adminAuth: false,
      userAuth: false,
      showModal: false
    }
    
    this.setUserAuth = this.setUserAuth.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    helpers.checkRestaurantAuth().then(response => {
      if (response.data.id !== undefined) {
        this.setState({ restaurantAuth: true });
      }
      else {
        this.setState({ restaurantAuth: false });
      }
    });

    helpers.checkInfluencerAuth().then(response => {
      if (response.data.id !== undefined) {
        this.setState({ influencerAuth: true });
      }
      else {
        this.setState({ influencerAuth: false });
      }
    });
    
    helpers.checkAdminAuth().then(response => {
      if (response.data.id !== undefined) {
        this.setState({ adminAuth: true });
      }
      else {
        this.setState({ adminAuth: false });
      }
    });

    helpers.checkUserAuth().then(response => {
			if (response.data.id !== undefined) {
        if (response.data.isVerified === undefined) {
          this.setState({ userAuth: true });
        }
        else if (response.data.isVerified === true) {
          this.setState({ userAuth: true });
        }
      }
      else {
        this.setState({ userAuth: false });
      }
		});
  }

  setUserAuth(res) {
    this.setState({ userAuth: res });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    console.log("Test");
    this.setState({ showModal: true });
  }
  
  render() {
    return (
      <div>
        <div id="background"></div>
        <div id="background-overlay"></div>
        <div className="container-fluid" id="main">
          <div className="row">
            <Switch>
              { this.state.restaurantAuth && this.state.userAuth ? (
                  <Route path="/restaurant" component={RestaurantDashboard} />
                ) : (
                  null
                )}
              { this.state.influencerAuth && this.state.userAuth ? (
                  <Route path="/influencer" component={InfluencerDashboard} />
                ) : (
                  null
              )}
              { this.state.userAuth ? (
                  <Route exact path="/logout" render={(props) => (
                    <Logout {...props} setUserAuth={this.setUserAuth} /> )} />
                ) : (
                  null
              )}
              <Route path="/api/restaurant/qr/confirm" component={RestaurantScan} />
              <Route path="/" render={(props) => (
                <OtherView {...props}
                  restaurantAuth={this.state.restaurantAuth}
                  influencerAuth={this.state.influencerAuth}
                  adminAuth={this.state.adminAuth}
                  userAuth={this.state.userAuth}
                  openModal={this.openModal}
                  closeModal={this.closeModal}
                  showModal={this.state.showModal} /> )} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
