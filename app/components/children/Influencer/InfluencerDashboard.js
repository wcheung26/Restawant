import React from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

import InfluencerFind from "./InfluencerFind";
import InfluencerExisting from "./InfluencerExisting";
import InfluencerSummary from "./InfluencerSummary";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.getElementById("main").style.marginTop = "50px";
  }

  componentWillUnmount(){
    document.getElementById("main").style.marginTop = "70px";
  } 

  render() {
    return (
      <div className="dashboard-content-wrapper">
        <div className="sidebar-nav">
          <img className="dashboard-logo" src="../../../../assets/images/logo.png" alt="Restawant" />
          <hr />
          <Link to="/influencer/dashboard/find"><i className="fa fa-search" aria-hidden="true"></i> Find Promotions</Link>
          <Link to="/influencer/dashboard/existing"><i className="fa fa-check" aria-hidden="true"></i> My Promotions</Link>
          <Link to="/influencer/dashboard/summary"><i className="fa fa-info-circle" aria-hidden="true"></i> My Performance</Link>
          <Link to="/logout" className="logout"><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</Link>
        </div>

        <div className="dashboard-wrapper">
          <div className="container-fluid">
            <Route path="/influencer/dashboard/find" component={InfluencerFind} />
            <Route path="/influencer/dashboard/existing" component={InfluencerExisting} />
            <Route path="/influencer/dashboard/summary" component={InfluencerSummary} />
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
