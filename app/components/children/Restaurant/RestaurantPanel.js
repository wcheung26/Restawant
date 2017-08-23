import React from "react";
import { Link } from "react-router-dom";

class RestaurantPanel extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading text-center">Restawant</div>
				<div className="panel-body">
					<p><Link to="/restaurant/dashboard/create">Create Promotion</Link></p>
					<p><Link to="/restaurant/dashboard/existing">Existing Influencers</Link></p>
					<p><Link to="/restaurant/dashboard/find">Find Influencers</Link></p>
					<p><Link to="/restaurant/dashboard/summary">Summary</Link></p>
				</div>
			</div>
		);
	}

};

export default RestaurantPanel;