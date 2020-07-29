import React, { Component } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import TVShowsCard from "../TVShowsCard/TVShowsCard";
import ActorCard from "../ActorCard/ActorCard";
import MultiCard from "../MultiCard/MultiCard";

export default class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      search: this.props.match.params.search,
      total_pages: "",
      total_results: "",
      results: [],
      search_type: "multi",
    };
  }

  componentDidMount() {
    this.getMultiSearch();
  }

  getMultiSearch = (search_type = "multi") => {
    let { page, search } = this.state;
    axios
      .get(
        `https://api.themoviedb.org/3/search/${search_type}?api_key=12aa3499b6032630961640574aa332a9&language=en-US&page=1&include_adult=false&query=${search}&page=${page}`
      )
      .then((search) => {
        console.log(search);
        this.setState({
          results: search.data.results,
          total_pages: search.data.total_pages,
          total_results: search.data.total_results,
          search_type: search_type,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleClick = (e) => {
    console.log(e.target.name);
    this.getMultiSearch(e.target.name);
  };

  render() {
    let { results, search_type } = this.state;
    console.log(this.state);
    let jsx = results.map((element) => {
      return element.media_type === "movie" ? (
        <MovieCard movie={element} />
      ) : element.media_type === "tv" ? (
        <TVShowsCard tvshow={element} />
      ) : search_type === "movie" ? (
        <MultiCard
          overview={element.overview}
          date={element.release_date}
          title={element.title}
          image={element.poster_path}
          movie={element}
        />
      ) : search_type === "tv" ? (
        <MultiCard
          overview={element.overview}
          date={element.first_air_date}
          title={element.name}
          image={element.poster_path}
          tvshow={element}
        />
      ) : (
        <MultiCard title={element.name} image={element.profile_path} />
      );
    });

    return (
      <div>
        <div className="search-results-container">
          <h2>Search Results</h2>
          <button onClick={this.handleClick} name="movie">
            Movies
          </button>
          <button onClick={this.handleClick} name="tv">
            TV Shows
          </button>
          <button onClick={this.handleClick} name="person">
            People
          </button>
          <button onClick={this.handleClick} name="collection">
            Collection
          </button>
        </div>
        <div>{jsx}</div>
      </div>
    );
  }
}
