import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "../components/Pages/LandingPage/LandingPage";
import HomePage from "../components/Pages/HomePage/HomePage";
import MoviePage from "../components/Pages/MoviePage/MoviePage";
import TVShowPage from "../components/Pages/TVShowPage/TVShowPage";
import SearchPage from "../components/Pages/SearchPage/SearchPage";
import ActorPage from "../components/Pages/ActorsPage/ActorsPage";
import SeasonPage from "../components/Pages/SeasonPage/SeasonPage";
import MovieSearchPage from "../components/Pages/MovieSearchPage/MovieSearchPage";
import TVSearchPage from "../components/Pages/TVSearchPage/TVSearchPage";
import NavBar from "../components/Sections/NavBar/NavBar";
import Footer from "../components/Sections/Footer/Footer";
import EpisodePage from "../components/Pages/EpisodePage/EpisodePage";
import ErrorPage from "../components/Pages/ErrorPage/ErrorPage";

const DefaultContainer = () => (
  <>
    <NavBar />
    <div className="container">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/welcome" component={HomePage} />
      <Route exact path="/movies/:id" component={MoviePage} />
      <Route
        exact
        path="/tvshows/:id/seasons/:seasonid/episodes/:episodeid"
        component={EpisodePage}
      />
      <Route
        exact
        path="/tvshows/:id/seasons/:seasonid"
        component={SeasonPage}
      />
      <Route exact path="/tvshows/:id" component={TVShowPage} />
      <Route exact path="/search/:search" component={SearchPage} />
      <Route exact path="/actors/:id" component={ActorPage} />
      <Route exact path="/moviesearch" component={MovieSearchPage} />
      <Route exact path="/tvsearch" component={TVSearchPage} />
    </div>
    <Footer />
  </>
);

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route component={DefaultContainer} />
  </Switch>
);
