import React from "react";

import helpers from "../../utils/helpers";

class RestaurantSummary extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      influencers: [],
      totalScans: 0,
      totalPayout: 0,
      averagePayout: 0
    }
  }

  componentDidMount() {
    // Get the latest figures.
    helpers.getRestaurantSummary().then(response => {
      console.log("Restaurant's Top 5 Influencers: ", response.data.influencers);
      console.log("Restaurant Finance Summary: ", response.data.finance);
      this.setState({
        influencers: response.data.influencers,
        totalScans: response.data.finance.totalScans,
        totalPayout: response.data.finance.totalPayout,
        averagePayout: response.data.finance.averagePayout
      });
    })
  }

  render() {
    return (
      <div>
        <h3>Summary</h3>
        <hr />
        <h4>Top 5 Influencers</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Total Scans</th>
              <th>Total Payout</th>
              <th>Average Payout</th>
            </tr>
          </thead>
          <tbody>
            {this.state.influencers.map((influencer, i) => {
              return (
                <tr key={influencer.id}>
                  <td>{influencer.name}</td>
                  <td>{influencer.email}</td>
                  <td>{influencer.totalScans}</td>
                  <td>${influencer.totalPayout}</td>
                  <td>${influencer.averagePayout}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h4>Finance</h4>
          <p><strong>Total Scans: </strong>{this.state.totalScans}</p>
          <p><strong>Total Payout: </strong>${this.state.totalPayout}</p>
          <p><strong>Average Payout: </strong>${this.state.averagePayout}</p>
      </div>
    );
  };
};

export default RestaurantSummary;