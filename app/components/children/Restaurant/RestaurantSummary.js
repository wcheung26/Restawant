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
    var display;
    if (this.state.influencers.length === 0) {
      display = (
        <div>
          <table className="table">
            <thead>
              <tr className="info">
                <th>Name</th>
                <th>Email</th>
                <th>Total Scans</th>
                <th>Total Payout</th>
                <th>Average Payout</th>
              </tr>
            </thead>
          </table>
          <p className="text-center">There are no affiliated influencers.</p>
        </div>
      );
    }
    else {
      display = (
        <table className="table">
          <thead>
            <tr className="info">
              <th>Influencer Name</th>
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
                  <td><a href={"mailto:" + influencer.email + "?Subject=Hello,%20" + influencer.name + "!"} target="_top">{influencer.email}</a></td>
                  <td>{influencer.totalScans}</td>
                  <td>${influencer.totalPayout}</td>
                  <td>${influencer.averagePayout}/scan</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }

    return (
      <div className="">
        <h2 className="dashboard-header"><i className="fa fa-info-circle" aria-hidden="true"></i> Summary</h2>
        <hr />
        <h3 className="dashboard-subheader">Top Influencers</h3>
        {display}

        <h3 className="dashboard-subheader">Finance</h3>
          <table className="table">
            <thead>
              <tr className="info">
                <th>Total Scans</th>
                <th>Total Payout</th>
                <th>Average Payout</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.totalScans}</td>
                <td>${this.state.totalPayout}</td>
                <td>${this.state.averagePayout}/scan</td>
              </tr>                     
            </tbody>
          </table>
      </div>
    );
  };
};

export default RestaurantSummary;