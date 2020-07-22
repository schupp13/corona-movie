import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "../components/Landing/Landing";
import HomePage from "../components/HomePage/HomePage";


export default(
    <Switch>
        <Route  exact path ="/" component={Landing}></Route>
        <Route path="/welcome" component={HomePage}></Route>
    </Switch>
);