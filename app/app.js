import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import Main from "./components/Main";

ReactDOM.render((
  <BrowserRouter>
    <Route component={Main} />
  </BrowserRouter>
), document.getElementById("app"));