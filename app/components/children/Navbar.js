import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              { this.props.userAuth ? (
                  <Link className="navbar-brand" to="#"><img className="home-navbar-logo" src="../../../assets/images/logo2.png" alt="Restawant"/></Link>
                ) : (
                  <Link className="navbar-brand" to="/"><img className="home-navbar-logo" src="../../../assets/images/logo2.png" alt="Restawant"/></Link>
              )}

            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="#" onClick={this.props.openModal}><i className="fa fa-info-circle" aria-hidden="true"></i> About</Link></li>
                { this.props.userAuth === true &&
                  <li><Link to="/logout"><i className="fa fa-sign-out" aria-hidden="true"></i> Log Out</Link></li>
                }
              </ul>
            </div>
          </div>
        </nav>
    );
  }
}

export default Navbar;