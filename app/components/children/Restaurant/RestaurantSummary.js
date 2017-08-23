import React from "react";

import helpers from "../../utils/helpers";

class RestaurantSummary extends Component {

  constructor(props) {
    super(props);

    this.state = {
      history: 
    }
  }
  // componentDidMount() {
    // Get the latest figures.
    // helpers.getRestaurantHistory().then(response => {
    //   console.log(response);
    //   if (response !== this.state.history) {
    //     console.log("History", response.data);
    //     this.setState({ history: response.data });
    //   }
    // }
  // };

  render() {
    return (
    	<div>
    		<h3>Summary</h3>
	    	<table>
	    		<tr>
	    			<th>Promotion Name</th>
	    			<th>Total Influencers</th>
	    			<th>Total Scans</th>
	    			<th>Total Payout</th>
	    		</tr>
	    	</table>
	    </div>
    );
  };
};

export default RestaurantSummary;