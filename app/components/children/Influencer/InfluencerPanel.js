import React from "react";
import { Link } from "react-router-dom";

class InfluencerPanel extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading text-center">Restawant</div>
				<div className="panel-body">
					<p><Link to="/influencer/dashboard/find">Find Promotions</Link></p>
					<p><Link to="/influencer/dashboard/existing">My Promotions</Link></p>
					<p><Link to="/influencer/dashboard/summary">My Performance</Link></p>
				</div>
			</div>
		);
	}

};

export default InfluencerPanel;