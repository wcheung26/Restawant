var React = require("react");
var helpers = require("../../utils/helpers");

var InflSummary = React.createClass({
  // getInitialState: function() {

  // },

  componentDidMount: function() {
    // Get the latest figures.
    helpers.getInflHistory().then(function(response) {
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
            <th>Restaurant Name</th>
            <th>Promotions Participated</th>
            <th>Total Scans</th>
            <th>Total Earnings</th>
          </tr>
        </table>
      </div>
    );
  }
});

module.exports = InflSummary;