import React from "react";

import helpers from "../../utils/helpers";

class RestaurantPromotions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePromotions: [],
      pastPromotions: []
    }
  }

  componentDidMount() {
    helpers.getRestaurantPromotions().then(results => {
      // console.log("Received... ", results.data);
      console.log("Active Promotions: ", results.data.active);
      console.log("Past Promotions: ", results.data.past);
      this.setState({
        activePromotions: results.data.active,
        pastPromotions: results.data.past
      });
    });
  }

  render() {
    var active;
    if (this.state.activePromotions.length === 0) {
      active = (
        <div>
          <p className="text-center">No active promotions</p>
          <br />
        </div>
      );
    }
    else {
      active = ( 
        <div className="panel-group" id="activePromotionAccordion">
          {this.state.activePromotions.map((activePromotion, i) => {
            return (
              <div className="panel panel-default" key={activePromotion.promotion.id}>
                <a data-toggle="collapse" data-parent="#activePromotionAccordion" href={"#collapse" + activePromotion.promotion.id}><h4 className="panel-title">{activePromotion.promotion.name}</h4></a>
                <div id={"collapse" + activePromotion.promotion.id} className="panel-collapse collapse">
                  <div className="panel-body">

                    <h3 className="dashboard-subheader">Promotion Details</h3>
                    <table className="table">
                      <thead>
                        <tr className="info">
                          <th>Promotion Name</th>
                          <th>Description</th>
                          <th>Start Date</th>
                          <th>Expiration</th>
                          <th>Reward</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{activePromotion.promotion.name}</td>
                          <td>{activePromotion.promotion.offer}</td>
                          <td>{activePromotion.promotion.createdAt}</td>
                          <td>{activePromotion.promotion.expiration}</td>
                          <td>${activePromotion.promotion.reward}/scan</td>
                        </tr>                     
                      </tbody>
                    </table>

                    <h3 className="dashboard-subheader">Top Influencers</h3>
                    <table className="table">
                      <thead>
                        <tr className="info">
                          <th></th>
                          <th>Influencer Name</th>
                          <th>Email</th>
                          <th>Scans</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activePromotion.influencers.map((influencer, j) => {
                          return (
                            <tr key={influencer.id}>
                              <td>{j + 1}</td>
                              <td>{influencer.name}</td>
                              <td><a href={"mailto:" + influencer.email + "?Subject=Hello,%20" + influencer.name + "!"} target="_top">{influencer.email}</a></td>
                              <td>{influencer.discountScans}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {activePromotion.influencers.length === 0 ?
                      <p className="text-center">No current influencers</p> : null
                    }

                    <h3 className="dashboard-subheader">Summary</h3>
                    <table className="table">
                      <thead>
                        <tr className="info">
                          <th>Total Influencers</th>
                          <th>Total Scans</th>
                          <th>Total Payout</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{activePromotion.summary.totalInfluencers}</td>
                          <td>{activePromotion.summary.totalScans}</td>
                          <td>${activePromotion.summary.totalPayout}</td>
                        </tr>                     
                      </tbody>
                    </table>

                  </div>
                </div>
              </div>      
            );
          })}
        </div>
      );
    }

    var past;
    if (this.state.pastPromotions.length === 0) {
      past = (
        <div>
          <p className="text-center">No active promotions</p>
          <br />
        </div>
      );
    }
    else {
      past = (
        <div className="panel-group" id="pastPromotionAccordion">
          {this.state.pastPromotions.map((pastPromotion, i) => {
            return (
              <div className="panel panel-default" key={pastPromotion.promotion.id}>
                <a data-toggle="collapse" data-parent="#pastPromotionAccordion" href={"#collapse" + pastPromotion.promotion.id}><h4 className="panel-title">{pastPromotion.promotion.name}</h4></a>
                <div id={"collapse" + pastPromotion.promotion.id} className="panel-collapse collapse">
                  <div className="panel-body">

                    <h3 className="dashboard-subheader">Promotion Details</h3>
                    <table className="table">
                      <thead>
                        <tr className="info">
                          <th>Name</th>
                          <th>Offer</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Reward</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{pastPromotion.promotion.name}</td>
                          <td>{pastPromotion.promotion.offer}</td>
                          <td>{pastPromotion.promotion.createdAt}</td>
                          <td>{pastPromotion.promotion.expiration}</td>
                          <td>${pastPromotion.promotion.reward}/scan</td>
                        </tr>                     
                      </tbody>
                    </table>

                    <h3 className="dashboard-subheader">Top Influencers</h3>
                    <table className="table">
                      <thead>
                        <tr className="info">
                          <th></th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Scans</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pastPromotion.influencers.map((influencer, j) => {
                          return (
                            <tr key={influencer.id}>
                              <td>{j + 1}</td>
                              <td>{influencer.name}</td>
                              <td><a href={"mailto:" + influencer.email + "?Subject=Hello,%20" + influencer.name + "!"} target="_top">{influencer.email}</a></td>
                              <td>{influencer.discountScans}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {pastPromotion.influencers.length === 0 ?
                      <p className="text-center">No existing influencers</p> : null
                    }

                    <h3 className="dashboard-subheader">Summary</h3>
                    <table className="table">
                      <thead>
                        <tr className="info">
                          <th>Total Influencers</th>
                          <th>Total Scans</th>
                          <th>Total Payout</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{pastPromotion.summary.totalInfluencers}</td>
                          <td>{pastPromotion.summary.totalScans}</td>
                          <td>${pastPromotion.summary.totalPayout}</td>
                        </tr>                     
                      </tbody>
                    </table>

                  </div>
                </div>
              </div>      
            );
          })}
        </div>
      );
    }
    
    return (
      <div className=""> 
        <h2 className="dashboard-header"><i className="fa fa-check" aria-hidden="true"></i> Active Promotions</h2>
        <hr />
        {active}

        <h2 className="dashboard-header"><i className="fa fa-times" aria-hidden="true"></i> Past Promotions</h2>
        <hr />
        {past}
      </div>
    );
  }

};

export default RestaurantPromotions;