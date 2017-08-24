import React from "react";
import helpers from "../../utils/helpers";

class InfluencerSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: []
    }
  }

  componentDidMount() {
    // Get the latest figures.
    helpers.getInflHistory().then(response => {
      console.log("Influencer Summary: ", response);
      this.setState({ summary: response });
    });
  };

  render() {
    return (
      <div>
        <h3>Performance Summary</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Restaurant Name</th>
              <th>Promotions Participated</th>
              <th>Total Scans</th>
              <th>Total Earnings</th>
            </tr>
          </thead>
          <tbody>
            {this.state.summary.map((restaurant, i) => {
              return (
                <tr key={restaurant.restaurantId}>
                  <td>{restaurant.restaurantName}</td>
                  <td>{restaurant.promotionsParticipated}</td>
                  <td>{restaurant.totalScans}</td>
                  <td>${restaurant.totalEarnings}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
};

export default InfluencerSummary;