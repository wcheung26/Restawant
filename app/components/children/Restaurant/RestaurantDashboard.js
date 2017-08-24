import React from "react";
import { Route } from "react-router-dom";

import RestaurantPanel from "./RestaurantPanel";
import RestaurantCreate from "./RestaurantCreate";
import RestaurantPromotions from "./RestaurantPromotions";
import RestaurantInfluencers from "./RestaurantInfluencers";
import RestaurantSummary from "./RestaurantSummary";

class RestaurantDashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="container">
        <div className="col-md-3">
          <RestaurantPanel /> 
        </div>
          
        <div className="col-md-9">
          <Route path="/restaurant/dashboard/create" component={RestaurantCreate} />
          <Route path="/restaurant/dashboard/promotions" component={RestaurantPromotions} />
          <Route path="/restaurant/dashboard/influencers" component={RestaurantInfluencers} />
          <Route path="/restaurant/dashboard/summary" component={RestaurantSummary} />
        </div>
      </div>
    );
  }
};

export default RestaurantDashboard;
