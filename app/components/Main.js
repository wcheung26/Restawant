import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";

import RestaurantLogin from "./children/Restaurant/RestaurantLogin";
import RestaurantSignup from "./children/Restaurant/RestaurantSignup";
import RestaurantDashboard from "./children/Restaurant/RestaurantDashboard";
import RestaurantScan from "./children/Restaurant/RestaurantScan"
import InfluencerLogin from "./children/Influencer/InfluencerLogin";
import InfluencerSignup from "./children/Influencer/InfluencerSignup";
import InfluencerDashboard from "./children/Influencer/InfluencerDashboard";
import AdminLogin from "./children/Admin/AdminLogin";
import AdminSignup from "./children/Admin/AdminSignup";
import AdminDashboard from "./children/Admin/AdminDashboard";
import Home from "./children/Home";
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
    this.setState({ showModal: true });
  }
  
  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<Link className="navbar-brand" to="/">Restawant</Link>
						</div>
						<div id="navbar" className="navbar-collapse collapse">
							<ul className="nav navbar-nav navbar-right">
                <li><Link to="#" onClick={this.openModal}><i className="fa fa-info-circle" aria-hidden="true"></i> About</Link></li>
                { this.state.userAuth === true &&
                  <li><Link to="/logout"><i className="fa fa-sign-out" aria-hidden="true"></i> Log Out</Link></li>
                }
							</ul>
						</div>
					</div>
				</nav>
        <div className="container-fluid main">
          <div className="row">
            <Switch>
              { this.state.restaurantAuth && this.state.userAuth ? (
                  null
                ) : (
                  <Route exact path="/restaurant/signup" component={RestaurantSignup} />
              )}
              { this.state.restaurantAuth && this.state.userAuth ? (
                  <Route path="/restaurant" component={RestaurantDashboard} />
                ) : (
                  <Route path="/restaurant" component={RestaurantLogin} />
              )}
              { this.state.influencerAuth && this.state.userAuth ? (
                  null
                ) : (
                  <Route exact path="/influencer/signup" component={InfluencerSignup} />
              )}
              { this.state.influencerAuth && this.state.userAuth ? (
                  <Route path="/influencer" component={InfluencerDashboard} />
                ) : (
                  <Route path="/influencer" component={InfluencerLogin} />
              )}
              <Route path="/admin/signup" component={AdminSignup} />
              { this.state.adminAuth && this.state.userAuth ? (
                  <Route path="/admin" component={AdminDashboard} />
                ) : (
                  <Route path="/admin" component={AdminLogin} />
              )}
              { this.state.userAuth ? (
                  <Route exact path="/logout" render={(props) => (
                    <Logout {...props} setUserAuth={this.setUserAuth} /> )} />
                ) : (
                  null
              )}
              <Route path="/api/restaurant/qr/confirm" component={RestaurantScan} />
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

export default Main;