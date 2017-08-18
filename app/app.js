var React = require("react");
var ReactDOM = require("react-dom");
var router = require("react-router-dom");
var BrowserRouter = router.BrowserRouter;
var Route = router.Route;

var Main = require("./components/Main");

ReactDOM.render((
  <BrowserRouter>
    <Route component={Main} />
  </BrowserRouter>
),document.getElementById("app"));