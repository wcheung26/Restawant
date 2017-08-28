import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";

import RestaurantDashboard from "./children/Restaurant/RestaurantDashboard";
import InfluencerDashboard from "./children/Influencer/InfluencerDashboard";
import AdminDashboard from "./children/Admin/AdminDashboard";
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
    }
    
    this.setUserAuth = this.setUserAuth.bind(this);
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
  
  render() {
    return (
      <div>
        <div className="container-fluid main">
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
              { this.state.adminAuth && this.state.userAuth ? (
                  <Route path="/admin" component={AdminDashboard} />
                ) : (
                  null
              )}
              { this.state.userAuth ? (
                  <Route exact path="/logout" render={(props) => (
                    <Logout {...props} setUserAuth={this.setUserAuth} /> )} />
                ) : (
                  null
              )}
              <Route path="/" render={(props) => (
                <OtherView {...props}
                  restaurantAuth={this.state.restaurantAuth}
                  influencerAuth={this.state.influencerAuth}
                  adminAuth={this.state.adminAuth}
                  userAuth={this.state.userAuth} /> )} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;