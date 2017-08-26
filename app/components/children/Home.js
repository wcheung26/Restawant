import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-12 text-center">
        <div className="ribbon text-center">
          <div className="col-md-6 icon-div">
            <Link to="/restaurant/signup"><i className="home-icon fa fa-cutlery" aria-hidden="true"></i></Link>
            <h4><strong>RESTAURANTS</strong></h4>
            <p>Grow Your Business</p>
          </div>
          <div className="col-md-6 icon-div">
            <Link to="/influencer/signup"><i className="home-icon fa fa-money" aria-hidden="true"></i></Link>
            <h4><strong>INFLUENCERS</strong></h4>
            <p>Earn Some Cash</p>
          </div>
        </div>
        <h3>Are you a restaurant looking for more business? Sign up with us today!</h3>
        <Link to="/restaurant/signup"><button type="button" className="btn btn-default">Join</button></Link>
        <br/>
        <h3>Looking to earn extra cash? Sign up with us today!</h3>
        <Link to="/influencer/signup"><button type="button" className="btn btn-default">Join</button></Link>


      </div>
    );
  }
}

export default Home;