var React = require("react");
var router = require("react-router-dom");
var Link = router.Link;
var Route = router.Route;

var Main = React.createClass({
  // getInitialState: function() {
  // },
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<Link className="navbar-brand" to="/">Restawant</Link>
						</div>
						<div id="navbar" className="navbar-collapse collapse">
							<ul className="nav navbar-nav navbar-right">
								<li><Link to="/"><i className="fa fa-cutlery" aria-hidden="true"></i> Restaurants</Link></li>
								<li><Link to="/"><i className="fa fa-user" aria-hidden="true"></i> Influencers</Link></li>
							</ul>
						</div>
					</div>
				</nav>
        <div className="container">
        </div>
      </div>
    );
  }
});

module.exports = Main;