import React from "react";
import moment from "moment";
import { Modal, Button } from 'react-bootstrap';

import helpers from "../../utils/helpers";

class InfluencerExisting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePromotions: [],
      pastPromotions: [],
      showModal: false,
      qrUrl: ''
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    // Get the latest figures.
    helpers.getInfluencerPromotions().then(function(response) {
      console.log("GOT Influencer Promotions:", response);
      if (response !== this.state.promotions) {
        let activePromotions = [];
        let pastPromotions = [];
        for (var i = 0; i < response.length; i++) {
          if ( moment(response[i].promotion.expiration).isBefore(moment()) ||
             moment(response[i].promotion.expiration).isSame(moment()) ) {
            pastPromotions.push(response[i]);
          } else {
            activePromotions.push(response[i]);
          }
        }
        this.setState({ 
          activePromotions: activePromotions,
          pastPromotions: pastPromotions
        });
        console.log("=======================")
        console.log("State updated");
      }
    }.bind(this));
  };

  openModal(url) {
      this.setState({ 
        qrUrl: url,
        showModal: true
      });
  };

  closeModal() {
    this.setState({ showModal: false });
  };

  render() {
    var active;
    if (this.state.activePromotions.length === 0) {
      active = (
        <table className="table">
          <tbody>
            <tr>
              <th>No active promotions.</th>
            </tr>
          </tbody>
        </table>
      );
    }
    else {
      active = ( 
        <table className="table">
          <tbody>
            <tr className="info">
              <th></th>
              <th>Promotion Name</th>
              <th>Description</th>
              <th>Expiration</th>
              <th>Reward</th>
              <th>Total Scans</th>
              <th>Total Payout</th>
            </tr>
            {this.state.activePromotions.map((promotion, i) => {
              return (
                <tr key={promotion.promotionId}>
                  <td>{i + 1}</td>
                  <td><a href="#" onClick={ () => this.openModal(promotion.url)}>{promotion.promotion.name}</a></td>
                  <td>{promotion.promotion.offer}</td>
                  <td>{moment(promotion.promotion.expiration).format("MMMM D, YYYY")}</td>
                  <td>${promotion.promotion.reward}/scan</td>
                  <td>{promotion.clicks}</td>
                  <td>${promotion.promotion.reward * promotion.clicks}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }

    var past;
    if (this.state.pastPromotions.length === 0) {
      past = (
        <table className="table">
          <tbody>
            <tr>
              <th>No past promotions.</th>
            </tr>
          </tbody>
        </table>
      );
    }
    else {
      past = (
        <table className="table">
          <tbody>
            <tr className="info">
              <th></th>
              <th>Promotion Name</th>
              <th>Description</th>
              <th>Expiration</th>
              <th>Reward</th>
              <th>Total Scans</th>
              <th>Total Payout</th>
            </tr>
            {this.state.pastPromotions.map((promotion, i) => {
              return (
                <tr key={promotion.promotionId}>
                  <th>{i + 1}</th>
                  <td><a href="#" onClick={ () => this.openModal(promotion.url)}>{promotion.promotion.name}</a></td>
                  <td>{promotion.promotion.offer}</td>
                  <td>{moment(promotion.promotion.expiration).format("MMMM D, YYYY")}</td>
                  <td>${promotion.promotion.reward}/scan</td>
                  <td>{promotion.clicks}</td>
                  <td>${promotion.promotion.reward * promotion.clicks}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }

    return (
      <div className="">
        <h2 className="dashboard-header"><i className="fa fa-check" aria-hidden="true"></i> My Promotions</h2>
        <hr />
        <h3 className="dashboard-subheader">Active Promotions</h3>
        {active}
        <h3 className="dashboard-subheader">Past Promotions</h3>
        {past}
        <Modal show={this.state.showModal} onHide={this.closeModal} bsSize="small">
          <Modal.Header closeButton>
            <Modal.Title>QR Code</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p className="text-center">Save and share this code on your social media and with your friends</p>
              <img className="qr-codes" src={this.state.qrUrl} alt="QR Code" />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  };

};

export default InfluencerExisting;