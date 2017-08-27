import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import helpers from "../../utils/helpers";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      promotions: [],
      newQR: null
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.generateQR = this.generateQR.bind(this);
    this.resetQRState = this.resetQRState.bind(this);
  };

  // Search for promotions, then open modal
  openModal(rId) {
    helpers.getActivePromotions(rId).then(response => {
      if (this.state.promotions !== response) {
      console.log("Active restaurant promotions: ", response);
        this.setState({ 
          promotions: response,
          modalIsOpen: true
        });
      }
    });
  };

  // Close modal
  closeModal() {
    this.setState({modalIsOpen: false});
  };

  generateQR(promotionId) {
    helpers.generateQR(promotionId).then(response => {
      if (this.state.newQR !== response) {
        console.log("New QR url: ", response);
        this.setState({ 
          newQR: response,
        });
      }
    })
  };

  resetQRState() {
    this.setState({ newQR: null })
  }
  
  render() {
    if (this.state.newQR) {
      return(
        <div>
          <h2>Unique QR Code Generated!</h2>
          <p>Save and share this code on your social media and with your friends</p>
          <img src={this.state.newQR} alt="Your QR Code" />
          <br />
          <button onClick={ this.resetQRState } className="btn btn-default">Back to Results</button>
        </div>
      )
    }
    if (this.props.results.length > 0) {
      // Render results if restaurants found
      return (
        <div>
          <table className="table">
            <tbody>
              {this.props.results.map((restaurant, i) => {
                return (
                  <tr key={restaurant.id}>
                    <th>{i + 1}</th>
                    <td><a href="#">{restaurant.name}</a></td>
                    <td>{restaurant.address}, {restaurant.city}</td>
                    <td><a href={"https://www.yelp.com/biz/" + restaurant.yelpId}>View on Yelp</a></td>
                    <td><button onClick={ () => this.openModal(restaurant.id) } className="btn btn-default">See Promotions</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <Modal
            isOpen={this.state.modalIsOpen}
            contentLabel="promotionsModal"
          >
            <div>
              <h2>Active Promotions For This Restaurant</h2>
              <p>Select a promotion:</p>
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Promotion Name</th>
                    <th>Promotion Offer</th>
                    <th>Reward per Scan</th>
                    <th>Expires On</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.promotions.map((promotion, i) => {
                    return (
                      <tr key={promotion.id}>
                        <th>{i + 1}</th>
                        <td>{promotion.name}</td>
                        <td>{promotion.offer}</td>
                        <td>{promotion.reward}</td>
                        <td>{promotion.expiration}</td>
                        <td><button onClick={ () => this.generateQR(promotion.id) } className="btn btn-default">Promote</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <button onClick={this.closeModal} className="btn btn-default">Back to Restaurants</button>
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
        <div className="text-center">
          <p>No results found.</p>
        </div>
      )
    }
  }
}

export default SearchResults;