import React from "react";
import moment from "moment";

import helpers from "../../utils/helpers";

class InfluencerExisting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activePromotions: [],
			pastPromotions: []
		}
	}

  componentDidMount() {
    // Get the latest figures.
    helpers.getInfluencerPromotions().then(function(response) {
      console.log("GOT Influencer Promotions:", response);
      if (response !== this.state.promotions) {
      	let activePromotions = [];
      	let pastPromotions = [];
        for (var i = 0; i < response.length; i++) {
        	if ( moment(response[i].promotion.expiration).isBefore(moment()) ||
        		 moment(response[i].promotion.expiration).isSame(moment()) ) {
        		pastPromotions.push(response[i]);
        	} else {
        		activePromotions.push(response[i]);
        	}
        }
        this.setState({ 
        	activePromotions: activePromotions,
        	pastPromotions: pastPromotions
        });
      	console.log("=======================")
        console.log("State updated");
      }
    }.bind(this));
  };

  render() {
    return (
    	<div>
    		<h3>Active Promotions</h3>
	    	<table className="table">
	    		<tbody>
		    		<tr>
		    			<th>#</th>
		    			<th>Promotion Name</th>
		    			<th>Description</th>
		    			<th>Expiration</th>
		    			<th>Reward</th>
		    			<th>Total Scans</th>
		    			<th>Total Payout</th>
		    		</tr>
		    		{this.state.activePromotions.map((promotion, i) => {
		    			return (
		    				<tr key={promotion.promotionId}>
			    				<th>{i + 1}</th>
			    				<td><a href={promotion.url}>{promotion.promotion.name}</a></td>
			    				<td>{promotion.promotion.offer}</td>
			    				<td>{promotion.promotion.expiration}</td>
			    				<td>${promotion.promotion.reward}/scan</td>
			    				<td>{promotion.clicks}</td>
			    				<td>${promotion.promotion.reward * promotion.clicks}</td>
			    			</tr>
		    			)
		    		})}
		    	</tbody>
	    	</table> 
	    	<br />
	    	<h3>Past Promotions</h3>
	    	<table className="table">
	    		<tbody>
		    		<tr>
		    			<th>#</th>
		    			<th>Promotion Name</th>
		    			<th>Description</th>
		    			<th>Expiration</th>
		    			<th>Reward</th>
		    			<th>Total Scans</th>
		    			<th>Total Payout</th>
		    		</tr>
		    		{this.state.pastPromotions.map((promotion, i) => {
		    			return (
		    				<tr key={promotion.promotionId}>
			    				<th>{i + 1}</th>
			    				<td><a href={promotion.url}>{promotion.promotion.name}</a></td>
			    				<td>{promotion.promotion.offer}</td>
			    				<td>{promotion.promotion.expiration}</td>
			    				<td>${promotion.promotion.reward}/scan</td>
			    				<td>{promotion.clicks}</td>
			    				<td>${promotion.promotion.reward * promotion.clicks}</td>
			    			</tr>
		    			)
		    		})}
		    	</tbody>
	    	</table>
	    </div>
    );
  };

};

export default InfluencerExisting;