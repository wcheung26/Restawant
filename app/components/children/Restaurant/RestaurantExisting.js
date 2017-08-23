import React from "react";

import helpers from "../../utils/helpers";

class RestaurantExisting extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// activeInfluencers: [],
			// pastInfluencers: []
			influencers: []
		}
	}

	componentDidMount() {
		helpers.getExistingInfluencers().then(function(results) {
			console.log("Existing Influencers: ", results);
			// if (results !== this.props.)
		});
	}

	// render() {
	// 	return (

	// 	);
	// }

};

export default RestaurantExisting;