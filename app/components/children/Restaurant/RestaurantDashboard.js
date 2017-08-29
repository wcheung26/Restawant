import React from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

import RestaurantCreate from "./RestaurantCreate";
import RestaurantPromotions from "./RestaurantPromotions";
import RestaurantInfluencers from "./RestaurantInfluencers";
import RestaurantSummary from "./RestaurantSummary";

class RestaurantDashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    document.getElementById("main").style.marginTop = "50px";
  }

  componentWillUnmount(){
    document.getElementById("main").style.marginTop = "70px";
  }  

  render() {
    return (
      <div className="dashboard-content-wrapper">
        <div className="sidebar-nav">
          <img className="dashboard-logo" src="../../../../assets/images/logo.png" alt="Restawant" />
          <hr />
          <Link to="/restaurant/dashboard/create"><i className="fa fa-plus" aria-hidden="true"></i> Create Promotion</Link>
          <Link to="/restaurant/dashboard/promotions"><i className="fa fa-check" aria-hidden="true"></i>Existing Promotions</Link>
          <Link to="/restaurant/dashboard/influencers"><i className="fa fa-search" aria-hidden="true"></i> Find Influencers</Link>
          <Link to="/restaurant/dashboard/summary"><i className="fa fa-info-circle" aria-hidden="true"></i>Summary</Link>
          <Link to="/logout" className="logout"><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</Link>
        </div>
          
        <div className="dashboard-wrapper">
          <div className="container-fluid">
            <Route path="/restaurant/dashboard/create" component={RestaurantCreate} />
            <Route path="/restaurant/dashboard/promotions" component={RestaurantPromotions} />
            <Route path="/restaurant/dashboard/influencers" component={RestaurantInfluencers} />
            <Route path="/restaurant/dashboard/summary" component={RestaurantSummary} />
          </div>
        </div>
      </div>
    );
  }
};

export default RestaurantDashboard;
