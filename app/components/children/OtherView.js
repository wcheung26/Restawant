import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';

import Navbar from "../children/Navbar";
import RestaurantLogin from "../children/Restaurant/RestaurantLogin";
import RestaurantSignup from "../children/Restaurant/RestaurantSignup";
import InfluencerLogin from "../children/Influencer/InfluencerLogin";
import InfluencerSignup from "../children/Influencer/InfluencerSignup";
import AdminLogin from "../children/Admin/AdminLogin";
import AdminSignup from "../children/Admin/AdminSignup";
import AdminDashboard from "../children/Admin/AdminDashboard";
import Home from "../children/Home";
import Logout from "../children/Logout";

import helpers from "../utils/helpers";

class OtherView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar userAuth={this.props.userAuth} openModal={this.props.openModal} />
        <div className="container-fluid main">
          <div className="row">
            <Switch>
              { this.props.restaurantAuth && this.props.userAuth ? (
                  null
                ) : (
                  <Route exact path="/restaurant/signup" component={RestaurantSignup} />
              )}
              { this.props.restaurantAuth && this.props.userAuth ? (
                  null
                ) : (
                  <Route path="/restaurant" component={RestaurantLogin} />
              )}
              { this.props.influencerAuth && this.props.userAuth ? (
                  null
                ) : (
                  <Route exact path="/influencer/signup" component={InfluencerSignup} />
              )}
              { this.props.influencerAuth && this.props.userAuth ? (
                  null
                ) : (
                  <Route path="/influencer" component={InfluencerLogin} />
              )}
              <Route path="/admin/signup" component={AdminSignup} />
              { this.props.adminAuth && this.props.userAuth ? (
                  <Route path="/admin" component={AdminDashboard} />
                ) : (
                  <Route path="/admin" component={AdminLogin} />
              )}
              <Route path="/" component={Home} />
            </Switch>
            <Modal show={this.props.showModal} onHide={this.props.closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>About</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                A platform assisting restaurants to manage and grow their social media marketing.
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default OtherView;