import React from "react";

import helpers from "../../utils/helpers";

class RestaurantFind extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			influencers: []
		}
	}

	componentDidMount() {
		helpers.findInfluencers().then(results => {
			console.log("All influencers: ", results.data);
			this.setState({ influencers: results.data });
		});
	}

	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading text-center">All Influencers</div>
				<div className="panel-body">
					<ul className="list-group">
						{this.state.influencers.map((influencer, i) => {
							return (
								<li className="list-group-item" key={i}>Name: {influencer.firstName} {influencer.lastName}, Email: {influencer.email}</li>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
};

export default RestaurantFind;