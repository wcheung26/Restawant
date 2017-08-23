import React from "react";
import { Route } from "react-router-dom";

import InfluencerPanel from "./InfluencerPanel";
import InfluencerFind from "./InfluencerFind";
import InfluencerExisting from "./InfluencerExisting";
import InfluencerSummary from "./InfluencerSummary";

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
      influencerData: null
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps.influencerData);
		this.setState({ influencerData: nextProps.influencerData });
	}

	render() {
		return (
			<div className="container">
				<div className="col-md-3">
					<InfluencerPanel /> 
				</div>

				<div className="col-md-9">
					<Route path="/influencer/dashboard/find" component={InfluencerFind} />
					<Route path="/influencer/dashboard/existing" component={InfluencerExisting} />
					<Route path="/influencer/dashboard/summary" component={InfluencerSummary} />
				</div>
			</div>
		);
	}
};

					

export default Home;
