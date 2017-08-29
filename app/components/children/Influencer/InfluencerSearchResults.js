import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';

import helpers from "../../utils/helpers";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showQRL: false,
      promotions: [],
      newQR: null
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.generateQR = this.generateQR.bind(this);
    this.closeQR = this.closeQR.bind(this);
  };

  // Search for promotions, then open modal
  openModal(rId) {
    helpers.getActivePromotions(rId).then(response => {
      if (this.state.promotions !== response) {
      console.log("Active restaurant promotions: ", response);
        this.setState({ 
          promotions: response,
          showModal: true
        });
      }
    });
  };

  closeQR() {
    this.setState({showQR: false});
  }

  // Close modal
  closeModal() {
    this.setState({showModal: false});
    this.setState({ newQR: null });
  };

  generateQR(promotionId) {
    helpers.generateQR(promotionId).then(response => {
      if (this.state.newQR !== response) {
        console.log("New QR url: ", response);
        this.setState({ 
          newQR: response,
          showQR: true
        });
      }
    })
  };

  render() {
    if (this.props.results.length > 0) {
      // Render results if restaurants found
      return (
        <div>
          <h3 className="dashboard-subheader">Search Results</h3>
          <table className="table">
            <thead>
              <tr className="info">
                <td></td>
                <td>Restaurant Name</td>
                <td>Address</td>
                <td>Promotions</td>
              </tr>
            </thead>
            <tbody>
              {this.props.results.map((restaurant, i) => {
                return (
                  <tr key={restaurant.id}>
                    <td>{i + 1}</td>
                    <td><a href={"https://www.yelp.com/biz/" + restaurant.yelpId} target="_blank">{restaurant.name}</a></td>
                    <td>{restaurant.address}, {restaurant.city}</td>
                    <td><button onClick={ () => this.openModal(restaurant.id) } className="btn btn-default view-promotions">See Promotions</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <Modal show={this.state.showModal} onHide={this.closeModal} bsSize="large">
            <Modal.Header closeButton>
              <Modal.Title>Active Promotions</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <table className="table">
                <thead>
                  <tr className="info">
                    <th></th>
                    <th>Promotion Name</th>
                    <th>Description</th>
                    <th>Reward Per Scan</th>
                    <th>Expiration</th>
                    <th>Promote</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.promotions.map((promotion, i) => {
                    return (
                      <tr key={promotion.id}>
                        <td>{i + 1}</td>
                        <td>{promotion.name}</td>
                        <td>{promotion.offer}</td>
                        <td>${promotion.reward}</td>
                        <td>{moment(promotion.expiration).format("MMMM D, YYYY")}</td>
                        <td><button onClick={ () => this.generateQR(promotion.id) } className="btn btn-default promote">Promote</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </Modal.Body>
          </Modal>

          <Modal show={this.state.showQR} onHide={this.closeQR} bsSize="small">
            <Modal.Header closeButton>
              <Modal.Title>QR Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <h3>Unique QR Code Generated!</h3>
                <p>Save and share this code on your social media and with your friends</p>
                <img src={this.state.newQR} alt="Your QR Code" />
                <br />
                <button onClick={ this.closeQR } className="btn btn-default back-to-results">Back to Results</button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      );
    } else if (!this.props.results) {
      // Render nothing if no search has been done
      return (
        <div>
          <br />
        </div>
      )

    } else {
      // Render text if no results were found after search
      return (
        <div>
          <h3 className="dashboard-subheader">Search Results</h3>
          <table className="table">
            <thead>
              <tr className="info">
                <td></td>
                <td>Restaurant Name</td>
                <td>Address</td>
                <td>Promotions</td>
              </tr>
            </thead>
          </table>
          <p className="text-center">No search results.</p>
        </div>
      )
    }
  }
}

export default SearchResults;