import React, { Component } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import TVShowsCard from "../TVShowsCard/TVShowsCard";
import ActorCard from "../ActorCard/ActorCard";
import MultiCard from "../MultiCard/MultiCard";
import './SearchPage.scss';
import MultiSearch from "../MultiSearch/MultiSearch";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';


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
      input_search: ''
    };
  }

  componentDidMount() {
    this.setState({search: this.props.match.params.search});
    this.getMultiSearch();
  }

  componentDidUpdate(prevProps){
    if (this.props.match.params.search !== prevProps.match.params.search) {
        this.searchClick();
      }
    
}



searchClick = () =>{
    this.setState({
        search: this.state.input_search
    }, this.getMultiSearch);
}

searchInput = (e)=>{
    console.log(e.target.value);
    this.setState({
        input_search: e.target.value.trim()
    });
  }



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
    this.setState({
        search_type: e.target.name
    }, this.getMultiSearch);
  };

  render() {
    let { results, search_type, search } = this.state;
    console.log(this.state);
    let jsx = results.map((element) => {
      return element.media_type === "movie" ? (
        <MultiCard
        overview={element.overview}
        date={element.release_date}
        title={element.title}
        image={element.poster_path}
        movie={element}
        id={element.id}
      />
      ) :element.media_type === "collection" ?(
        <MultiCard
        overview={element.overview}
        date={element.release_date}
        title={element.title}
        image={element.poster_path}
        movie={element}
        id={element.id}
      />
      ) : element.media_type === "tv" ? (
        <MultiCard
          overview={element.overview}
          date={element.first_air_date}
          title={element.name}
          image={element.poster_path}
          tvshow={element}
          id={element.id}
        />
      ) : search_type === "movie" ? (
        <MultiCard
          overview={element.overview}
          date={element.release_date}
          title={element.title}
          image={element.poster_path}
          movie={element}
          id={element.id}
        />
      ) : search_type === "tv" ? (
        <MultiCard
          overview={element.overview}
          date={element.first_air_date}
          title={element.name}
          image={element.poster_path}
          tvshow={element}
          id={element.id}
        />
      ) : search_type === "collection" ? (
        <MultiCard
        overview={"test"}
        date={element.first_air_date}
          title={element.name}
          image={element.poster_path}
          tvshow={element}
          id={element.id}
        />
      ) : (
        <MultiCard title={element.name} image={element.profile_path} overview={'acting'} />
      );
    });

    return (
      <div className="search-page">
  
          <div className="search-page-container">
          <div className="search-input">    
                <TextField id="outlined-basic" label="Search Here" variant="outlined" name="results" fullWidth onChange={this.searchInput}/>
                <Button variant="contained" component={Link} to={`/search/${this.state.input_search}`}>Search</Button>
        </div>
        <div className="search-page-main">
        <div className="search-results-container">
        <h2>{search[0].toUpperCase()+search.slice(1).toLowerCase()} Results</h2>
          <button onClick={this.handleClick} name="multi" className="search-button" autofocus>
            Most Popular
          </button>
          <button onClick={this.handleClick} name="movie" className="search-button">
            Movies
          </button>
          <button onClick={this.handleClick} name="tv" className="search-button">
            TV Shows
          </button>
          <button onClick={this.handleClick} name="person" className="search-button">
            People
          </button>
          <button onClick={this.handleClick} name="collection" className="search-button">
            Collection
          </button>
        </div>
        <div className="search-results">{jsx}</div>
        </div>
        </div>
      </div>
    );
  }
}
