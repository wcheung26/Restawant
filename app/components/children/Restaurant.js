var React = require("react");

var SignupRest = require("./SignupRest");
var LoginRest = require("./LoginRest");

var Restaurant = React.createClass({
  // getInitialState: function() {

  // },
  render: function() {
    return (
      <div className="col-md-12">
        <Route exact path="/restaurant" render={(props) => (
          <SignupRest {...props}
          />
        )} />
        <Route exact path="/restaurant/login" render={(props) => (
          <LoginRest {...props}
          />
        )} />
      </div>
    );
  }
});

module.exports = Restaurant;