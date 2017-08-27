import React, { Component } from "react";
import { Link } from "react-router-dom";

import helpers from "../../utils/helpers";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: []
    }
    this.handleApprove = this.handleApprove.bind(this);
    this.handleDeny = this.handleDeny.bind(this);
  }

  componentDidMount() {
    helpers.getAdminApprove().then(results => {
      this.setState({ restaurants: results });
    });
  }

  handleApprove(id) {
    helpers.approveRestaurant({ id: id }).then(results => {
      helpers.getAdminApprove().then(results => {
        this.setState({ restaurants: results });
      });
    });
  }

  handleDeny(id) {
    helpers.denyRestaurant({ id: id }).then(results => {
      helpers.getAdminApprove().then(results => {
        this.setState({ restaurants: results });
      });
    });
  }
  
  render() {
    if (this.state.restaurants.length === 0) {
      return (
        <div>
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <h3 className="text-center">Restaurants Pending Approval</h3>
            <div className="panel panel-default">
              <div className="panel-body text-center">
                <h4>No Restaurants Pending Approval</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      );
    }
    else {
      return (
        <div>
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <h3 className="text-center">Restaurants Pending Approval</h3>
            <div className="panel-group" id="restaurantAccordion">
              {this.state.restaurants.map((val, i) => {
                return (
                  <div className="panel panel-default" key={i}>
                    <div className="panel-heading">
                      <a data-toggle="collapse" data-parent="#restaurantAccordion" href={"#collapse" + val.id}><h4 className="panel-title">{val.name}</h4></a>
                    </div>
                    <div id={"collapse" + val.id} className="panel-collapse collapse">
                      <div className="panel-body">
                        <a href={"https://www.yelp.com/biz/" + val.yelpId}><h4>{val.name}</h4></a>
                        <p><strong>Yelp ID: </strong>{val.yelpId}</p>
                        <p><strong>Address: </strong>{val.address}, {val.city}, {val.state}</p>
                        <p><strong>Phone: </strong>{val.phone}</p>
                        <p><strong>Email: </strong>{val.email}</p>
                        <p><strong>Link to Image of Seller's Permit: </strong><a href={val.verificationUrl} target="_blank">{val.verificationUrl}</a></p>
                        <button type="button" className="btn btn-default" onClick={() => this.handleApprove(val.id)}>Approve</button>
                        <button type="button" className="btn btn-default" onClick={() => this.handleDeny(val.id)}>Deny</button>
                      </div>
                    </div>
                  </div>      
                );
              })}
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      );
    }
  }
}

export default AdminDashboard;