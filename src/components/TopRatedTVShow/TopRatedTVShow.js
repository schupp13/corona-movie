import React, { Component } from "react";
import TVShowsCard from "../TVShowsCard/TVShowsCard";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
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
      return <TVShowsCard tvshow={tvshow} key={index} />;
    });

    return (
      <div className="trending">
        <h2>Top Rated TV Shows ({this.state.header})</h2>

        <div className="trending-items">{tvshows}</div>
      </div>
    );
  }
}

export default TopRatedTVShow;
