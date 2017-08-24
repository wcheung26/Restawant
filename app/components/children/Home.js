import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-12 text-center">
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