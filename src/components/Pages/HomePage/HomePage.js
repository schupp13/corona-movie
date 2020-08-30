import React, { Component } from "react";
import "./HomePage.scss";
import MultiSearch from "../../Forms/MultiSearch/MultiSearch";
import TrendingMovies from "../../Sections/TrendingMovies/TrendingMovies";
import TopRatedTVShow from "../../Sections/TopRatedTVShow/TopRatedTVShow";
import PopularActors from "../../Sections/PopularActors/PopularActors";
import axios from "axios";
import Banner from "../../Features/Banner/Banner";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poster: "",
      config: {},
    };
  }

  componentDidMount() {
    console.log(localStorage.getItem("user"));
    this.getTrendingMovies();
    this.getMovieDBconfig();
  }

  getTrendingMovies = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=12aa3499b6032630961640574aa332a9"
      )
      .then((result) => {
        this.setState({
          poster: result.data.results[0].backdrop_path,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getMovieDBconfig = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/configuration?api_key=12aa3499b6032630961640574aa332a9"
      )
      .then((res) => {
        this.setState({
          config: res.data.images,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let Background =
      this.state.poster &&
      `https://image.tmdb.org/t/p/original/${this.state.poster}`;

    return (
      <>
        <Banner
          background={Background}
          title="Welcome to Keep It Reel"
          tagline={"... now keep it real."}
          search={true}
        >
          {" "}
        </Banner>
        <div className="search-results">
          <TrendingMovies />
        </div>
        <div className="search-results">
          <TopRatedTVShow />
        </div>
        <div className="search-results">
          <PopularActors />
        </div>
      </>
    );
  }
}
