import React from "react";
import { Route } from "react-router-dom";

import RestaurantPanel from "./RestaurantPanel";
import RestaurantCreate from "./RestaurantCreate";
import RestaurantExisting from "./RestaurantExisting";
import RestaurantFind from "./RestaurantFind";
// import RestaurantSummary from "./RestaurantSummary";

class RestaurantDashboard extends React.Component {
	constructor(props) {
		super(props);

		// this.state = {
		// 	restaurantData: null
		// }
	}

	// componentWillReceiveProps(nextProps) {
	// 	console.log(nextProps.restaurantData);
	// 	this.setState({ restaurantData: nextProps.restaurantData });
	// }
	
	render() {
		return (
			<div className="container">
				<div className="col-md-3">
					<RestaurantPanel /> 
				</div>

				<div className="col-md-9">
					<Route path="/restaurant/dashboard/create" component={RestaurantCreate} />
					<Route path="/restaurant/dashboard/existing" component={RestaurantExisting} />
					<Route path="/restaurant/dashboard/find" component={RestaurantFind} />
				</div>
			</div>
		);
	}
};

					// <Route path="/restaurant/dashboard/create" render={(props) => (
					// 	<RestaurantCreate {...props} restaurantData={this.state.restaurantData} />
					// )}/>
					// <Route path="/restaurant/dashboard/existing" render={(props) => (
					// 	<RestaurantExisting {...props} restaurantData={this.state.restaurantData} />
					// )}/>

					// <Route path="/home/restaurant/summary" component={RestaurantSummary} />

export default RestaurantDashboard;
