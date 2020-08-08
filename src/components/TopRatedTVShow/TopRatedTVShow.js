import React, { Component } from "react";
import MovieCard from "../MovieCard/MovieCard";

import axios from "axios";

class TopRatedTVShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      config: {},
    };
  }

  componentDidMount = () => {
    this.getTVShows();
    this.getMovieDBconfig();
  };

  getTVShows = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/tv/top_rated?api_key=12aa3499b6032630961640574aa332a9&language=en-US&page=1"
      )
      .then((res) => {
        this.setState({ results: res.data.results.slice(0, 10) });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getMovieDBconfig = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/configuration?api_key=12aa3499b6032630961640574aa332a9"
      )
      .then((res) => {
        this.setState({ config: res.data.images });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let tvshows = this.state.results.map((tvshow, index) => {
      return <MovieCard tvshow={tvshow} key={index} id={tvshow.id} title={tvshow.name} overview={tvshow.overview} voteAverage={tvshow.vote_average} backdropPath={tvshow.backdrop_path} type="tvshows"/>;
    });

    return (
      <div className="trending">
        <h2>Top Rated TV Shows </h2>

        <div className="trending-items">{tvshows}</div>
      </div>
    );
  }
}

export default TopRatedTVShow;
