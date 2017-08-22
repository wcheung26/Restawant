import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import RestaurantLogin from "./children/Restaurant/RestaurantLogin";
import RestaurantSignup from "./children/Restaurant/RestaurantSignup";
import RestaurantDashboard from "./children/Restaurant/RestaurantDashboard";
import InfluencerLogin from "./children/Influencer/InfluencerLogin";
import InfluencerSignup from "./children/Influencer/InfluencerSignup";
import AdminLogin from "./children/Admin/AdminLogin";

class Main extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    // };
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
								<li><Link to="/restaurant/login"><i className="fa fa-cutlery" aria-hidden="true"></i> Restaurants</Link></li>
								<li><Link to="/influencer/login"><i className="fa fa-user" aria-hidden="true"></i> Influencers</Link></li>
							</ul>
						</div>
					</div>
				</nav>
        <div className="container main">
          <div className="row">
  					<Route exact path="/restaurant/login" render={(props) => (
              <RestaurantLogin {...props}
              />
            )} />
            <Route path="/restaurant/signup" render={(props) => (
              <RestaurantSignup {...props}
              />
            )} />
            <Route path="/restaurant/dashboard" render={(props) => (
              <RestaurantDashboard {...props}
              />
            )} />
						<Route exact path="/influencer/login" render={(props) => (
              <InfluencerLogin {...props}
              />
            )} />
						<Route exact path="/influencer/signup" render={(props) => (
              <InfluencerSignup {...props}
              />
            )} />
						<Route exact path="/admin" render={(props) => (
              <AdminLogin {...props}
              />
            )} />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;