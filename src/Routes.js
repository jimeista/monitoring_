import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import MMap from "./pages/MMap";

export const Routes = () => {
 return (
  <Switch>
   <Route exact path="/" component={Home} />
   <Route exact path="/map" component={MMap} />
   <Redirect exact from="*" to="/" />
  </Switch>
 );
};
