import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.getElementById("background").style.backgroundColor = "#2f3238";
    document.getElementById("background").style.position = "fixed";
    document.getElementById("background").style.height = "100vh";
  }

  componentWillUnmount(){
    document.getElementById("background").style.backgroundColor = null;
    document.getElementById("background").style.position = null;
    document.getElementById("background").style.height = null;
  }

  render() {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 text-center">

        <div className="jumbotron">
          <img className="home-logo" src="../../../assets/images/logo.png" alt="Restawant" />
          <p className="lead">Most convenient way for anyone to earn extra cash and help businesses grow.</p>
        </div>

        <div className="grid">
          <figure className="effect-ming">
            <img src="../../../assets/images/restaurants.jpg" alt="Restaurants"/>
            <figcaption>
              <h2><span>Restaurants</span></h2>
              <p>Grow Your Business</p>
              <Link to="/restaurant/signup"><button className="home-sign-up">Sign Up</button></Link>
              <Link to="/restaurant/login"><button className="home-login">Login</button></Link>
            </figcaption>     
          </figure>
          <figure className="effect-ming">
            <img src="../../../assets/images/influencers.jpg" alt="Influencers"/>
            <figcaption>
              <h2><span>Influencers</span></h2>
              <p>Earn Extra Cash</p>
              <Link to="/influencer/signup"><button className="home-sign-up">Sign Up</button></Link>
              <Link to="/influencer/login"><button className="home-login">Login</button></Link>
            </figcaption>     
          </figure>
        </div>

      </div>
    );
  }
}

      // <div className="col-md-12 text-center">
      //   <div className="ribbon text-center">
      //     <div className="col-md-6 icon-div">
      //       <Link to="/restaurant/signup"><i className="home-icon fa fa-cutlery" aria-hidden="true"></i></Link>
      //       <h4><strong>RESTAURANTS</strong></h4>
      //       <p>Grow Your Business</p>
      //     </div>
      //     <div className="col-md-6 icon-div">
      //       <Link to="/influencer/signup"><i className="home-icon fa fa-money" aria-hidden="true"></i></Link>
      //       <h4><strong>INFLUENCERS</strong></h4>
      //       <p>Earn Some Cash</p>
      //     </div>
      //   </div>
      //   <h3>Are you a restaurant looking for more business? Sign up with us today!</h3>
      //   <Link to="/restaurant/signup"><button type="button" className="btn btn-default">Join</button></Link>
      //   <br/>
      //   <h3>Looking to earn extra cash? Sign up with us today!</h3>
      //   <Link to="/influencer/signup"><button type="button" className="btn btn-default">Join</button></Link>


      // </div>

export default Home;