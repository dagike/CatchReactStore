import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StorePicker from "./StorePicker";
import App from "./App";
import NotFound from "./NotFound";

export default () => (
  <BrowserRouter>
    <Switch>
      {/* Main page to choose a store */}
      <Route exact path="/" component={StorePicker} />
      {/* Store page */}
      <Route path="/store/:storeId" component={App} />
      {/* Anything that doesn't have a route */}
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);
