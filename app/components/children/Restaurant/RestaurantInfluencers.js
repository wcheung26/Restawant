import React from "react";

import helpers from "../../utils/helpers";

class RestaurantInfluencers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      influencers: []
    }
  }

  componentDidMount() {
    helpers.getInfluencers().then(results => {
      console.log("All influencers: ", results.data);
      this.setState({ influencers: results.data });
    });
  }

  render() {
    if (this.state.influencers.length === 0) {
      return (
        <div className=""> 
          <h2 className="dashboard-header"><i className="fa fa-search" aria-hidden="true"></i> Find Influencers</h2>
          <hr />
          <table className="table">
            <thead>
              <tr className="info">
                <th>There are no influencers currently signed up.</th>
              </tr>
            </thead>
          </table>
        </div>
      );
    }
    else {
      return (
        <div className=""> 
          <h2 className="dashboard-header"><i className="fa fa-search" aria-hidden="true"></i> Find Influencers</h2>
          <hr />
          <table className="table">
            <thead>
              <tr className="info">
                <th>Influencer Name</th>
                <th>Email</th>
                <th>Total Scans</th>
              </tr>
            </thead>
            <tbody>
              {this.state.influencers.map((influencer, i) => {
                return (
                  <tr key={influencer.id}>
                    <td>{influencer.name}</td>
                    <td><a href={"mailto:" + influencer.email + "?Subject=Hello,%20" + influencer.name + "!"} target="_top">{influencer.email}</a></td>
                    <td>{influencer.totalScans}</td>
                  </tr>
                );
              })}               
            </tbody>
          </table>
        </div>
      );
    }
  }
};

export default RestaurantInfluencers;