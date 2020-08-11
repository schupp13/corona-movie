import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "../components/Landing/Landing";
import HomePage from "../components/HomePage/HomePage";
import MoviePage from "../components/MoviePage/MoviePage";
import TVShowPage from "../components/TVShowPage/TVShowPage";
import SearchPage from "../components/SearchPage/SearchPage";
import ActorPage from "../components/ActorsPage/ActorsPage";
import SeasonPage from "../components/SeasonPage/SeasonPage";

export default (
  <Switch>
    <Route exact path="/" component={Landing}></Route>
    <Route path="/welcome" component={HomePage}></Route>
    <Route path="/movies/:id" component={MoviePage}></Route>
    <Route path="/tvshows/:id/seasons/:seasonid" component={SeasonPage} render={(props) => <Component {...props} />}></Route>

    <Route path="/tvshows/:id" component={TVShowPage}></Route>
    <Route path="/search/:search" component={SearchPage}></Route>
    <Route path="/actors/:id" component={ActorPage}></Route>
  </Switch>
);
