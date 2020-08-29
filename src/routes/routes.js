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
import Navbar from "../components/Sections/NavBar/NavBar";
import Footer from "../components/Sections/Footer/Footer";
import { SessionProvider } from "../components/SessionContext/SessionContext";
const DefaultContainer = () => (
  <SessionProvider>
    <Navbar />
    <div className="container">
      <Route exact path="/" component={LandingPage}></Route>
      <Route path="/welcome" component={HomePage}></Route>
      <Route path="/movies/:id" component={MoviePage}></Route>
      <Route
        path="/tvshows/:id/seasons/:seasonid"
        component={SeasonPage}
        render={(props) => <Component {...props} />}
      ></Route>
      <Route exact path="/tvshows/:id" component={TVShowPage}></Route>
      <Route path="/search/:search" component={SearchPage}></Route>
      <Route path="/actors/:id" component={ActorPage}></Route>
      <Route path="/moviesearch" component={MovieSearchPage}></Route>
      <Route path="/tvsearch" component={TVSearchPage}></Route>
    </div>
    <Footer />
  </SessionProvider>
);

export default (
  <Switch>
    <Route exact path="/" component={LandingPage}></Route>
    <Route component={DefaultContainer}></Route>
  </Switch>
);
