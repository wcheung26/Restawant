import React from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

// import RestaurantPanel from "./RestaurantPanel";
import RestaurantCreate from "./RestaurantCreate";
import RestaurantPromotions from "./RestaurantPromotions";
import RestaurantInfluencers from "./RestaurantInfluencers";
import RestaurantSummary from "./RestaurantSummary";

class RestaurantDashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.getElementById("background-overlay").style.background = "#ffffff";
  }

  componentWillUnmount(){
    document.getElementById("background-overlay").style.background = null;
  }
  
  render() {
    return (
      <div>
        <div className="sidebar-nav">
          <Link to="/restaurant/dashboard/create">Create Promotion</Link>
          <Link to="/restaurant/dashboard/promotions">Existing Promotions</Link>
          <Link to="/restaurant/dashboard/influencers">Find Influencers</Link>
          <Link to="/restaurant/dashboard/summary">Summary</Link>
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
