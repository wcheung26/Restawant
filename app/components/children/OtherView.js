import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';

import Navbar from "../children/Navbar";
import RestaurantLogin from "../children/Restaurant/RestaurantLogin";
import RestaurantSignup from "../children/Restaurant/RestaurantSignup";
import RestaurantDashboard from "../children/Restaurant/RestaurantDashboard";
import InfluencerLogin from "../children/Influencer/InfluencerLogin";
import InfluencerSignup from "../children/Influencer/InfluencerSignup";
import InfluencerDashboard from "../children/Influencer/InfluencerDashboard";
import AdminLogin from "../children/Admin/AdminLogin";
import AdminSignup from "../children/Admin/AdminSignup";
import AdminDashboard from "../children/Admin/AdminDashboard";
import Home from "../children/Home";
import Logout from "../children/Logout";

import helpers from "../utils/helpers";

class OtherView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    }
    
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
        <Navbar userAuth={this.props.userAuth} openModal={this.state.openModal} />
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
                  null
              )}
              <Route path="/" component={Home} />
            </Switch>
            <Modal show={this.state.showModal} onHide={this.closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>About Restawant</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>A platform assisting restaurants to manage and grow their social media marketing.</h4>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.closeModal}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default OtherView;