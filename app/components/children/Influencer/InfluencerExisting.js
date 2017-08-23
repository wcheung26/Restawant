import React from "react";

// import helpers from "../utils/helpers";

class InfluencerExisting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			promotions: ""
		}
	}

  componentDidMount() {
    // Get the latest figures.
    helpers.getInfluencerPromotions().then(function(response) {
      console.log(response);
      if (response !== this.state.promotions) {
        console.log("Influencer promotions:", response.data);
        this.setState({ promotions: response.data });
      }
    }.bind(this));
  };

  render() {
    return (
    	<div>
    		<h3>Promotions you signed up for</h3>
	    	<table className="table">
	    		<tbody>
		    		<tr>
		    			<th>#</th>
		    			<th>Promotion Name</th>
		    			<th>Total Scans</th>
		    			<th>Total Payout</th>
		    		</tr>
		    	</tbody>
	    	</table>
	    </div>
    );
  };

};

export default InfluencerExisting;