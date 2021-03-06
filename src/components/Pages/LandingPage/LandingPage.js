import React, { Component } from "react";
import axios from "axios";
import "./LandingPage.scss";
import LoginForm from "../../Forms/LoginForm/LoginForm";
import RegisterForm from "../../Forms/RegisterForm/RegisterForm";
import ReactCardFlip from "react-card-flip";

export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      config: {},
      isFlipped: false,
      errorLogin: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getTrendingMovies();
    this.getMovieDBconfig();
  }

  errorLoginFlip = () => {
    this.setState({ errorLogin: true });
  };

  getTrendingMovies = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=12aa3499b6032630961640574aa332a9"
      )
      .then((result) => {
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
        this.setState({
          config: res.data.images,
        });
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
    let moviesMapped = this.state.movies.map((movie, index) => {
      let Background = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
      return (
        <div
          key={index}
          className={`movie-div`}
          style={{ backgroundImage: `url(${Background})` }}
        ></div>
      );
    });
    return (
      <div className="landing-page-container">
        <div
          className={this.state.errorLogin ? "error-overlay" : "overlay"}
        ></div>

        <div className="landing-page page">{moviesMapped}</div>
        <div className="login-div">
          <ReactCardFlip
            isFlipped={this.state.isFlipped}
            flipDirection="horizontal"
            infinite="true"
          >
            {/* front of card */}
            <LoginForm
              onClick={this.handleClick}
              errorLogin={this.errorLoginFlip}
            ></LoginForm>
            {/* back of card */}
            <RegisterForm
              onClick={this.handleClick}
              errorLogin={this.errorLoginFlip}
            ></RegisterForm>
          </ReactCardFlip>
        </div>
      </div>
    );
  }
}
