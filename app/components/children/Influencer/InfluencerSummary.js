import React from "react";
import helpers from "../../utils/helpers";

class InfluencerSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: ""
    }
  }

  componentDidMount() {
    // Get the latest figures.
    helpers.getInflHistory().then(function(response) {
      console.log(response);
      if (response !== this.state.summary) {
        console.log("Summary", response.data);
        this.setState({ summary: response.data });
      }
    }.bind(this));
  };

  render() {
    return (
      <div>
        <h3>Performance Summary</h3>
        <table className="table">
          <tbody>
            <tr>
              <th>#</th>
              <th>Restaurant Name</th>
              <th>Promotions Participated</th>
              <th>Total Scans</th>
              <th>Total Earnings</th>
            </tr>
            {this.state.summary.map((restaurant, i) => {
              return (
                <tr key={restaurant}>
                  <th>{i + 1}</th>
                  <th></th>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  };
};

export default InfluencerSummary;