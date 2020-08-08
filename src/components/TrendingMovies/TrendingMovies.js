import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import MovieCard from "../MovieCard/MovieCard";
import "./TrendingMovies.scss";
export default class TrendingMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      header: "Today",
    };
  }

  componentDidMount() {
    this.getTrendingMovies();
  }

  handleClick = (e) => {
    console.log(e.target);
  };

  getTrendingMovies = (when = "day") => {
    let header = when === "day" ? "Today" : "This Week";

    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/${when}?api_key=12aa3499b6032630961640574aa332a9`
      )
      .then((result) => {
        this.setState({
          results: result.data.results,
          header: header,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let movies = this.state.results.map((movie, index) => {
      return <MovieCard movie={movie} key={index} id={movie.id} title={movie.title} overview={movie.overview} voteAverage={movie.vote_average} backdropPath={movie.backdrop_path} type="movies"/>;
    });

    return (
      <div className="trending">
        <h2>Trending Movies ({this.state.header})</h2>
        <ButtonGroup size="small" aria-label="small outlined button group">
          <Button
            onClick={() => {
              this.getTrendingMovies("day");
            }}
            name="day"
          >
            Today
          </Button>
          <Button
            onClick={() => {
              this.getTrendingMovies("week");
            }}
            name="week"
          >
            Week
          </Button>
        </ButtonGroup>
        <div className="trending-items">{movies}</div>
      </div>
    );
  }
}
