import React, { Component } from "react";
import MovieCard from "../../Cards/MovieCard/MovieCard";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import axios from "axios";

class TopRatedTVShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      page: 0,
      total_pages: 0,
      type: "top_rated",
    };
  }

  componentDidMount = () => {
    this.getTVShows();
  };

  changeType = (type) => {
    this.setState(
      {
        type,
      },
      this.getTVShows
    );
  };

  getTVShows = () => {
    const { type } = this.state;
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${type}?api_key=12aa3499b6032630961640574aa332a9&language=en-US&page=1`
      )
      .then((res) => {
        this.setState({
          results: res.data.results,
          page: res.data.page,
          total_pages: res.data.total_pages,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleScroll = () => {
    // const firstElement = document.getElementById('scroll-div').firstChild;
    // const lastElment = document.getElementById('scroll-div').lastChild;
    // if(document.getElementById('scroll-div').scrollLeft > (5891 * this.state.page)){
    //   console.log("true")
    //   this.addPage();
    // }
    // console.log(document.getElementById('scroll-div').scrollLeft)
  };

  addPage = () => {
    this.setState({ page: this.state.page + 1 }, this.tagOnMore);
  };

  tagOnMore = () => {
    const { page, type } = this.state;
    axios
      .get(`https://api.themoviedb.org/3/tv/${type}`, {
        params: {
          api_key: "12aa3499b6032630961640574aa332a9",
          page: page,
        },
      })
      .then((result) => {
        this.setState({
          results: [...this.state.results, ...result.data.results],
          page: result.data.page,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  createMessage(type) {
    return type === "top_rated"
      ? "Top Rated"
      : type === "popular"
      ? "Most Popular"
      : type === "on_the_air"
      ? "On Air"
      : "Playing Today";
  }

  render() {
    let buttons = [
      { name: "Top Rated", function: () => this.changeType("top_rated") },
      { name: "Most Popular", function: () => this.changeType("popular") },
      { name: "On Air", function: () => this.changeType("on_the_air") },
      { name: "On Air Today", function: () => this.changeType("airing_today") },
    ];
    let { page, total_pages, type } = this.state;
    let message = this.createMessage(type);
    let tvshows = this.state.results.map((tvshow, index) => {
      return (
        <MovieCard
          message={`#${index + 1} ${message}`}
          tvshow={tvshow}
          key={index}
          id={tvshow.id}
          title={tvshow.name}
          overview={tvshow.overview}
          voteAverage={tvshow.vote_average}
          backdropPath={tvshow.backdrop_path}
          type="tvshows"
        />
      );
    });

    return (
      <div className="trending">
        <ScrollDiv
          buttons={buttons}
          title={`TV Shows`}
          cards={tvshows}
          handleScroll={this.handleScroll}
          page={page}
          total_pages={total_pages}
          addPage={this.addPage}
        ></ScrollDiv>
      </div>
    );
  }
}

export default TopRatedTVShow;
