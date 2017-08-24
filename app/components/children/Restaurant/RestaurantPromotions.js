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
    return (
      <div> 
        <h3>Active Promotions</h3>
        <div className="panel-group" id="activePromotionAccordion">
          {this.state.activePromotions.map((activePromotion, i) => {
            return (
              <div className="panel panel-default" key={activePromotion.promotion.id}>
                <div className="panel-heading">
                  <a data-toggle="collapse" data-parent="#activePromotionAccordion" href={"#collapse" + activePromotion.promotion.id}><h4 className="panel-title">{activePromotion.promotion.name}</h4></a>
                </div>
                <div id={"collapse" + activePromotion.promotion.id} className="panel-collapse collapse">
                  <div className="panel-body">

                    <h3>Promotion Details:</h3>
                    <p><strong>Name: </strong>{activePromotion.promotion.name}</p>
                    <p><strong>Offer: </strong>{activePromotion.promotion.offer}</p>
                    <p><strong>Period: </strong>{activePromotion.promotion.period}</p>
                    <p><strong>Reward: </strong>${activePromotion.promotion.reward} per transaction</p>

                    <h3>Top Influencers:</h3>
                    {activePromotion.influencers.map((influencer, j) => {
                      return (
                        <p key={influencer.id}>Name: {influencer.name}, Email: {influencer.email}, Scans: {influencer.discountScans}</p>
                      );
                    })}

                    <h3>Summary:</h3>
                    <p><strong>Total Influencers: </strong>{activePromotion.summary.totalInfluencers}</p>
                    <p><strong>Total Scans: </strong>{activePromotion.summary.totalScans}</p>
                    <p><strong>Total Payout: </strong>${activePromotion.summary.totalPayout}</p>

                  </div>
                </div>
              </div>      
            );
          })}
        </div>

        <h3>Past Promotions</h3>
        <div className="panel-group" id="pastPromotionAccordion">
          {this.state.pastPromotions.map((pastPromotion, i) => {
            return (
              <div className="panel panel-default" key={pastPromotion.promotion.id}>
                <div className="panel-heading">
                  <a data-toggle="collapse" data-parent="#pastPromotionAccordion" href={"#collapse" + pastPromotion.promotion.id}><h4 className="panel-title">{pastPromotion.promotion.name}</h4></a>
                </div>
                <div id={"collapse" + pastPromotion.promotion.id} className="panel-collapse collapse">
                  <div className="panel-body">

                    <h3>Promotion Details:</h3>
                    <p><strong>Name: </strong>{pastPromotion.promotion.name}</p>
                    <p><strong>Offer: </strong>{pastPromotion.promotion.offer}</p>
                    <p><strong>Period: </strong>{pastPromotion.promotion.period}</p>
                    <p><strong>Reward: </strong>${pastPromotion.promotion.reward} per transaction</p>

                    <h3>Top Influencers:</h3>
                    {pastPromotion.influencers.map((influencer, j) => {
                      return (
                        <p key={influencer.id}>Name: {influencer.name}, Email: {influencer.email}, Scans: {influencer.discountScans}</p>
                      );
                    })}

                    <h3>Summary:</h3>
                    <p><strong>Total Influencers: </strong>{pastPromotion.summary.totalInfluencers}</p>
                    <p><strong>Total Scans: </strong>{pastPromotion.summary.totalScans}</p>
                    <p><strong>Total Payout: </strong>${pastPromotion.summary.totalPayout}</p>

                  </div>
                </div>
              </div>      
            );
          })}
        </div>
      </div>
    );
  }

};

export default RestaurantPromotions;