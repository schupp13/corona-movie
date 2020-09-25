import React, { Component } from "react";
import axios from "axios";
import MultiCard from "../../Cards/MultiCard/MultiCard";
import "./SearchPage.scss";
import TextField from "@material-ui/core/TextField";
import Pagination from "../../Features/Pagination/Pagination";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

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
      input_search: "",
      movies_count: 0,
      most_popular_count: 0,
      people_count: 0,
      collection_count: 0,
      tvshow_count: 0,
      company_count: 0,
    };
  }

  componentDidMount() {
    this.setState({ search: this.props.match.params.search });
    this.getMultiSearch();
    this.getAllSearch();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.search !== prevProps.match.params.search) {
      this.setState(
        {
          search: this.props.match.params.search,
        },
        this.componentDidMount
      );
    }
  }

  submitForm = (e) => {
    e.preventDefault();
    this.props.history.push(`/search/${this.state.input_search}`); // <--- The page you want to redirect your user to.
  };

  searchClick = () => {
    this.setState(
      {
        search: this.state.input_search,
      },
      this.componentDidMount
    );
  };

  searchInput = (e) => {
    this.setState({
      input_search: e.target.value.trim(),
    });
  };

  paginate = (e, value) => {
    this.setState(
      {
        page: value,
      },
      this.getMultiSearch
    );
  };

  getAllSearch = () => {
    const { search } = this.state;

    const URLMulti = `https://api.themoviedb.org/3/search/multi?api_key=12aa3499b6032630961640574aa332a9&language=en-US&page=1&include_adult=false&query=${search}&page=1`;
    const URLTv = `https://api.themoviedb.org/3/search/tv?api_key=12aa3499b6032630961640574aa332a9&language=en-US&page=1&include_adult=false&query=${search}&page=1`;
    const URLMovie = `https://api.themoviedb.org/3/search/movie?api_key=12aa3499b6032630961640574aa332a9&language=en-US&page=1&include_adult=false&query=${search}&page=1`;
    const URLPerson = `https://api.themoviedb.org/3/search/person?api_key=12aa3499b6032630961640574aa332a9&language=en-US&page=1&include_adult=false&query=${search}&page=1`;
    const URLCollection = `https://api.themoviedb.org/3/search/collection?api_key=12aa3499b6032630961640574aa332a9&language=en-US&page=1&include_adult=false&query=${search}&page=1`;
    const URLCompany = `https://api.themoviedb.org/3/search/company?api_key=12aa3499b6032630961640574aa332a9&language=en-US&page=1&include_adult=false&query=${search}&page=1`;

    const multi = axios.get(URLMulti);
    const tv = axios.get(URLTv);
    const movie = axios.get(URLMovie);
    const person = axios.get(URLPerson);
    const collection = axios.get(URLCollection);
    const company = axios.get(URLCompany);

    Promise.all([multi, tv, movie, person, collection, company])
      .then((values) => {
        console.log(values);
        this.setState({
          most_popular_count: values[0].data.total_results,
          tvshow_count: values[1].data.total_results,
          movies_count: values[2].data.total_results,
          people_count: values[3].data.total_results,
          collection_count: values[4].data.total_results,
          company_count: values[5].data.total_results,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getMultiSearch = () => {
    let { page, search, search_type } = this.state;

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
    this.setState(
      {
        search_type: e.target.name,
        page: 1,
      },
      this.getMultiSearch
    );
  };

  render() {
    let {
      page,
      results,
      search_type,
      total_pages,
      movies_count,
      most_popular_count,
      people_count,
      collection_count,
      tvshow_count,
    } = this.state;
    let jsx = results.map((element, key) => {
      return element.media_type === "movie" ? (
        <MultiCard
          overview={element.overview}
          date={element.release_date}
          title={element.title}
          image={element.poster_path}
          movie={element}
          key={element.id}
          id={element.id}
          type={"movies"}
        />
      ) : element.media_type === "collection" ? (
        <MultiCard
          overview={element.overview}
          date={element.release_date}
          title={element.title}
          image={element.poster_path}
          movie={element}
          key={element.id}
          id={element.id}
          type={"collections"}
        />
      ) : element.media_type === "tv" ? (
        <MultiCard
          overview={element.overview}
          date={element.first_air_date}
          title={element.name}
          image={element.poster_path}
          tvshow={element}
          key={element.id}
          id={element.id}
          type={"tvshows"}
        />
      ) : search_type === "movie" ? (
        <MultiCard
          overview={element.overview}
          date={element.release_date}
          title={element.title}
          image={element.poster_path}
          movie={element}
          key={element.id}
          id={element.id}
          type={"movies"}
        />
      ) : search_type === "tv" ? (
        <MultiCard
          overview={element.overview}
          date={element.first_air_date}
          title={element.name}
          image={element.poster_path}
          tvshow={element}
          key={element.id}
          id={element.id}
          type="tvshows"
        />
      ) : search_type === "collection" ? (
        <MultiCard
          overview={element.overview}
          date={element.first_air_date}
          title={element.name}
          image={element.poster_path}
          tvshow={element}
          key={element.id}
          id={element.id}
          type="collections"
        />
      ) : (
        <MultiCard
          overview={""}
          date={element.known_for_department}
          title={element.name}
          image={element.profile_path}
          id={element.id}
          key={element.id}
          type="actors"
        />
      );
    });

    return (
      <div className="search-page-container">
        <div className="search-input">
          {/* <form onSubmit={this.submitForm}>
            <TextField
              id="outlined-basic"
              label="Search here"
              variant="outlined"
              name="results"
              fullWidth
              onChange={this.searchInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form> */}
        </div>
        <div className="search-page-main">
          <div className="search-left">
            <div className="mobile-results"></div>
            <div className="search-results-container mobile-results">
              <h2>Results</h2>
              {most_popular_count ? (
                <button
                  onClick={this.handleClick}
                  name="multi"
                  className="search-button"
                  autoFocus
                >
                  <p> Most Popular </p>{" "}
                  <div>
                    <Chip label={most_popular_count} />
                  </div>
                </button>
              ) : (
                ""
              )}

              {movies_count ? (
                <button
                  onClick={this.handleClick}
                  name="movie"
                  className="search-button"
                >
                  Movies <Chip label={movies_count} />
                </button>
              ) : (
                ""
              )}

              {tvshow_count ? (
                <button
                  onClick={this.handleClick}
                  name="tv"
                  className="search-button"
                >
                  TV Shows <Chip label={tvshow_count} />
                </button>
              ) : (
                ""
              )}

              {people_count ? (
                <button
                  onClick={this.handleClick}
                  name="person"
                  className="search-button"
                >
                  People <Chip label={people_count} />
                </button>
              ) : (
                ""
              )}

              {collection_count ? (
                <button
                  onClick={this.handleClick}
                  name="collection"
                  className="search-button"
                >
                  Collection <Chip label={collection_count} />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="search-right">
            <div className="search-results">
              {results.length > 0 ? jsx : "No Results"}
              {results.length && <div className="pagination-div"></div>}
            </div>
          </div>
        </div>
        <div>
          <Pagination page={page} count={total_pages} setPage={this.paginate} />
        </div>
      </div>
    );
  }
}
