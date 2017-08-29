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
    if (this.state.summary.length === 0) {
      return (
        <div className="">
          <h2 className="dashboard-header"><i className="fa fa-info-circle" aria-hidden="true"></i> Performance Summary</h2>
          <hr />
          <table className="table">
            <thead>
              <tr className="info">
                <th></th>
                <th>Restaurant Name</th>
                <th>Promotions Participated</th>
                <th>Total Scans</th>
                <th>Total Earnings</th>
              </tr>
            </thead>
            <tbody className="text-center">
              No performance summary available.
            </tbody>
          </table>
        </div>
      );
    }
    else {
      return (
        <div className="">
          <h2 className="dashboard-header"><i className="fa fa-info-circle" aria-hidden="true"></i> Performance Summary</h2>
          <hr />
          <table className="table">
            <thead>
              <tr className="info">
                <th></th>
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
                    <td>{i + 1}</td>
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
    }
  };
};

export default InfluencerSummary;