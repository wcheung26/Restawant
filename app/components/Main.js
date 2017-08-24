import React, { Component } from "react";
import { Route, Link, Redirect, Switch } from "react-router-dom";

import RestaurantLogin from "./children/Restaurant/RestaurantLogin";
import RestaurantSignup from "./children/Restaurant/RestaurantSignup";
import RestaurantDashboard from "./children/Restaurant/RestaurantDashboard";
import InfluencerLogin from "./children/Influencer/InfluencerLogin";
import InfluencerSignup from "./children/Influencer/InfluencerSignup";
import InfluencerDashboard from "./children/Influencer/InfluencerDashboard";
import AdminLogin from "./children/Admin/AdminLogin";
import AdminSignup from "./children/Admin/AdminSignup";
import AdminDashboard from "./children/Admin/AdminDashboard";
import Home from "./children/Home";
import Logout from "./children/Logout";

import helpers from "./utils/helpers";

class Main extends Component {
  constructor(props) {
    super(props);

		this.state = {
      restaurantAuth: false,
      influencerAuth: false,
      adminAuth: false,
      userAuth: false,
      restaurantData: null,
      influencerData: null
    }
    
    this.setUserAuth = this.setUserAuth.bind(this);
  }

  componentDidMount() {
    helpers.checkRestaurantAuth().then(response => {
      if (response.data.id !== undefined) {
        this.setState({ restaurantAuth: true });
        this.setState({ restaurantData: response.data });
      }
      else {
        this.setState({ restaurantAuth: false });
      }
    });

    helpers.checkInfluencerAuth().then(response => {
      if (response.data.id !== undefined) {
        this.setState({ influencerAuth: true });
        this.setState({ influencerData: response.data });
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
        this.setState({ userAuth: true });
      }
      else {
        this.setState({ userAuth: false });
      }
		});
  }

  setUserAuth(res) {
    this.setState({ userAuth: false });
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
                { this.state.userAuth === false &&
                  <li><Link to="/restaurant/login"><i className="fa fa-cutlery" aria-hidden="true"></i> Restaurants</Link></li>
                }
                { this.state.userAuth === false &&
                  <li><Link to="/influencer/login"><i className="fa fa-user" aria-hidden="true"></i> Influencers</Link></li>
                }
                { this.state.userAuth === true &&
                  <li><Link to="/logout"><i className="fa fa-sign-out" aria-hidden="true"></i> Log Out</Link></li>
                }
							</ul>
						</div>
					</div>
				</nav>
        <div className="container main">
          <div className="row">
            <Switch>
              <Route exact path="/restaurant/login" render={(props) => (
                <RestaurantLogin {...props}
                />
              )} />
              <Route exact path="/restaurant/signup" render={(props) => (
                <RestaurantSignup {...props}
                />
              )} />
              { 
                this.state.restaurantAuth ? <Route path="/restaurant/dashboard" render={(props) => (
                <RestaurantDashboard {...props}
                  restaurantData={this.state.restaurantData} 
                /> )} /> : null
              }
              <Route exact path="/influencer/login" render={(props) => (
                <InfluencerLogin {...props}
                />
              )} />
              <Route exact path="/influencer/signup" render={(props) => (
                <InfluencerSignup {...props}
                />
              )} />
              { 
                this.state.influencerAuth ? <Route path="/influencer/dashboard" render={(props) => (
                <InfluencerDashboard {...props}
                  influencerData={this.state.influencerData}
                /> )} /> : null
              }
              { 
                this.state.adminAuth ? <Route path="/admin/dashboard" render={(props) => (
                <AdminDashboard {...props}
                /> )} /> : null
              }
              <Route exact path="/admin/login" render={(props) => (
                <AdminLogin {...props}
                />
              )} />
              <Route path="/admin/signup" render={(props) => (
                <AdminSignup {...props}
                />
              )} />
              { 
                this.state.userAuth ? <Route exact path="/logout" render={(props) => (
                <Logout {...props}
                  setUserAuth={this.setUserAuth}
                /> )} /> : null
              }
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;