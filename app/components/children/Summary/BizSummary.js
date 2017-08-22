var React = require("react");
var helpers = require("../../utils/helpers");

var BizSummary = React.createClass({
  // getInitialState: function() {

  // },

  componentDidMount: function() {
    // Get the latest figures.
    helpers.getBizHistory().then(function(response) {
      console.log(response);
      if (response !== this.state.history) {
        console.log("History", response.data);
        this.setState({ history: response.data });
      }
    }.bind(this));
  },

  render: function() {
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
  }
});

module.exports = BizSummary;