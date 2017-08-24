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
    return (
      <div className="panel panel-default">
        <div className="panel-heading text-center">All Influencers</div>
        <div className="panel-body">
          <ul className="list-group">
            {this.state.influencers.map((influencer, i) => {
              return (
                <li className="list-group-item" key={influencer.id}>Name: {influencer.name}, Email: {influencer.email}, Total Scans: {influencer.totalScans}</li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
};

export default RestaurantInfluencers;