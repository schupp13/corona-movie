import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "../components/Pages/Landing/Landing";
import HomePage from "../components/Pages/HomePage/HomePage";
import MoviePage from "../components/Pages/MoviePage/MoviePage";
import TVShowPage from "../components/Pages/TVShowPage/TVShowPage";
import SearchPage from "../components/Pages/SearchPage/SearchPage";
import ActorPage from "../components/Pages/ActorsPage/ActorsPage";
import SeasonPage from "../components/Pages/SeasonPage/SeasonPage";

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
