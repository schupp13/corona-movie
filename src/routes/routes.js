import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "../components/Landing/Landing";
import HomePage from "../components/HomePage/HomePage";
import MoviePage from "../components/MoviePage/MoviePage";
import SearchPage from "../components/SearchPage/SearchPage";


export default(
    <Switch>
        <Route  exact path ="/" component={Landing}></Route>
        <Route path="/welcome" component={HomePage}></Route>
        <Route path="/movies/:id" component={MoviePage}></Route>
        <Route path="/search/:search" component={SearchPage}></Route>
    </Switch>
);