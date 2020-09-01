import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import MovieCard from "../../Cards/MovieCard/MovieCard";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";

import "./TrendingMovies.scss";
export default class TrendingMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      header: "Today",
      page: 0,
      total_pages: 0,
      when: "day",
    };
  }

  componentDidMount() {
    this.getTrendingMovies();
    document.addEventListener("scroll", this.handleScroll);
  }

  // componentWillUnmount() {
  //   document.removeEventListener("scroll", this.handleScroll);
  // }

  handleClick = (e) => {
    console.log(e.target);
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

  getTrendingMovies = (when = "day", page = "1") => {
    let header =
      when === "day"
        ? "Today"
        : when === "week"
        ? "This Week"
        : when === "now_playing"
        ? "In Theaters"
        : "";
    let trending = when === "day" || when === "week" ? "trending/" : "";
    axios
      .get(`https://api.themoviedb.org/3/${trending}movie/${when}`, {
        params: {
          api_key: "12aa3499b6032630961640574aa332a9",
          language: "en-US",
          page: page,
        },
      })
      .then((result) => {
        this.setState({
          results: result.data.results,
          header: header,
          when: when,
          page: result.data.page,
          total_pages: result.data.total_pages,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addPage = () => {
    this.setState({ page: this.state.page + 1 }, this.tagOnMore);
  };

  tagOnMore = () => {
    const { when, page } = this.state;
    let trending = when === "day" || when === "week" ? "trending/" : "";

    console.log(this.state);
    axios
      .get(`https://api.themoviedb.org/3/${trending}movie/${when}`, {
        params: {
          api_key: "12aa3499b6032630961640574aa332a9",
          language: "en-US",
          page: page,
        },
      })
      .then((result) => {
        console.log(result.data);
        this.setState({
          results: [...this.state.results, ...result.data.results],
          page: result.data.page,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let { page, total_pages } = this.state;
    let movies = this.state.results.map((movie, index) => {
      return (
        <MovieCard
          movie={movie}
          key={index}
          id={movie.id}
          title={movie.title}
          overview={movie.overview}
          voteAverage={movie.vote_average}
          backdropPath={movie.backdrop_path}
          message={`#${index + 1} on Trending`}
          type="movies"
        />
      );
    });

    let buttons = [
      { name: "Today", function: () => this.getTrendingMovies("day") },
      { name: "Week", function: () => this.getTrendingMovies("week") },
      {
        name: "In Theaters",
        function: () => this.getTrendingMovies("now_playing"),
      },
    ];

    return (
      <div className="trending">
        {/* <ButtonGroup size="small" aria-label="small outlined button group">
          <Button
            onClick={() => {
              this.getTrendingMovies("day");
            }}
            name="day"
            className={this.state.header === 'Today' ? 'active trending-button': 'trending-button'}
          >
            Today
          </Button>
          <Button
            onClick={() => {
              this.getTrendingMovies("week");
            }}
            name="week"
            className={this.state.header === 'This Week' ? 'active trending-button': 'trending-button'}

          >
            Week
          </Button>
          <Button
            onClick={() => {
              this.getTrendingMovies("now_playing");
            }}
            name="week"
            className={this.state.header === 'In Theaters' ? 'active trending-button': 'trending-button'}

          >
            In Theaters
          </Button>
        </ButtonGroup> */}
        <ScrollDiv
          buttons={buttons}
          title={`Movies - Trending ${this.state.header}`}
          cards={movies}
          handleScroll={this.handleScroll}
          page={page}
          total_pages={total_pages}
          addPage={this.addPage}
        ></ScrollDiv>
      </div>
    );
  }
}
