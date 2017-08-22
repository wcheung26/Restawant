import React from "react";
import { Route } from "react-router-dom";

import RestaurantPanel from "./RestaurantPanel";
import RestaurantCreate from "./RestaurantCreate";
import RestaurantExisting from "./RestaurantExisting";
// import RestaurantBrowse from "./RestaurantBrowse";
// import RestaurantSummary from "./RestaurantSummary";

class Home extends React.Component {
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
					<Route path="/restaurant/dashboard/existing" component={RestaurantExisting} />
				</div>
			</div>
		);
	}
};

					// <Route path="/home/restaurant/browse" component={RestaurantBrowse} />
					// <Route path="/home/restaurant/summary" component={RestaurantSummary} />

export default Home;
