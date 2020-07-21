import React, { Component } from "react";
import axios from "axios";
import "./Landing.scss";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../LoginForm/RegisterForm";
import ReactCardFlip from "react-card-flip";

export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      config: {},
      isFlipped: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getTrendingMovies();
    this.getMovieDBconfig();
  }

  getTrendingMovies = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=12aa3499b6032630961640574aa332a9"
      )
      .then((result) => {
        console.log(result.data.results);
        this.setState({
          movies: result.data.results.slice(0, 10),
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
        this.state.config = res.data.images;
        console.log(this.state.config);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleClick(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      isFlipped: !prevState.isFlipped,
    }));
  }

  render() {
    let moviesMapped = this.state.movies.map((movie) => {
      let Background = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
      return (
        <div
          className="movie-div"
          style={{ backgroundImage: `url(${Background})` }}
        ></div>
      );
    });
    return (
      <div className="landing-page page">
        <div className="overlay"></div>
        {moviesMapped}
        <ReactCardFlip
          isFlipped={this.state.isFlipped}
          flipDirection="horizontal"
          infinite="true"
        >
            {/* front of card */}
          <LoginForm onClick={this.handleClick}></LoginForm>
          {/* back of card */}
          <RegisterForm onClick={this.handleClick}></RegisterForm>
        </ReactCardFlip>
      </div>
    );
  }
}
