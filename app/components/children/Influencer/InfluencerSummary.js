import React from "react";
import helpers from "../../utils/helpers";

class InfluencerSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: ""
    }
  }

  componentDidMount() {
    // Get the latest figures.
    helpers.getInflHistory().then(function(response) {
      console.log(response);
      if (response !== this.state.history) {
        console.log("History", response.data);
        this.setState({ history: response.data });
      }
    }.bind(this));
  };

  render() {
    return (
      <div>
        <h3>Summary</h3>
        <table className="table">
          <tbody>
            <tr>
              <th>Restaurant Name</th>
              <th>Promotions Participated</th>
              <th>Total Scans</th>
              <th>Total Earnings</th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
};

export default InfluencerSummary;