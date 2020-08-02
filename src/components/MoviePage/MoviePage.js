import React, { Component } from "react";
import MovieDetails from "../MovieDetails/MovieDetails";
import axios from "axios";
import "./MoviePage.scss";
import AverageRating from "../AverageRating/AverageRating";
import Chip from "@material-ui/core/Chip";
import HomeIcon from "@material-ui/icons/Home";
import netflixpic from "../../img/netflix.png";
import AppleIcon from "@material-ui/icons/Apple";
import TrailerModal from "../TrailerModal/TrailerModal";
import ActorCard from "../ActorCard/ActorCard";
import MovieReviewCard from "../MovieReviewCard/MovieReviewCard";
import MovieCard from "../MovieCard/MovieCard";
import MovieVideo from "../MovieVideo/MovieVideo";

export default class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieID: "",
      movie: {},
      genres: [],
      homepage: "false",
      trailer: {},
      actors: [],
      crew: [],
      director: [],
      writer: [],
      reviews: [],
      similar: [],
      videos: [],
    };
  }

  componentDidMount() {
    this.getMovie();
    this.getTrailer();
    this.getCast();
    this.getReviews();
    this.getSimilar();
    this.getImages();
    this.setState({
      movieID: this.props.match.params.id,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.componentDidMount();
    }
  }

  getMovie = () => {
    let movieID = this.props.match.params.id;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=12aa3499b6032630961640574aa332a9`
      )
      .then((results) => {
        this.setState({
          movie: results.data,
          genres: results.data.genres,
          homepage: results.data.homepage,
        });
      })
      .catch();
  };

  getTrailer = () => {
    let movieID = this.props.match.params.id;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=12aa3499b6032630961640574aa332a9&language=en-US`
      )
      .then((results) => {
        this.setState({
          trailer: results.data.results[0],
        });
      })
      .catch();
  };

  getCast = () => {
    let movieID = this.props.match.params.id;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=12aa3499b6032630961640574aa332a9`
      )
      .then((result) => {
        this.setState({
          actors: result.data.cast,
          crew: result.data.crew,
          director: result.data.crew.filter((element) => {
            if (element.job == "Director") {
              return element;
            }
          }),
          wirter: result.data.crew.filter((element) => {
            if (element.department == "Writing") {
              return element;
            }
          }),
        });
      });
  };

  getReviews = () => {
    let movieID = this.props.match.params.id;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}/reviews?api_key=12aa3499b6032630961640574aa332a9`
      )
      .then((results) => {
        this.setState({
          reviews: results.data.results,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getSimilar = () => {
    let movieID = this.props.match.params.id;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=12aa3499b6032630961640574aa332a9`
      )
      .then((results) => {
        this.setState({
          similar: results.data.results,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getImages = () => {
    let movieID = this.props.match.params.id;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=12aa3499b6032630961640574aa332a9`
      )
      .then((videos) => {
        this.setState({
          videos: videos.data.results,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let {
      movie,
      genres,
      homepage,
      director,
      actors,
      reviews,
      similar,
      videos,
    } = this.state;
    let movieID = this.props.match.params.id;
    let directors = director.map((element, index) => {
      return (
        <span>
          {index > 0 && ", "}
          {element.name}
        </span>
      );
    });

    let Background = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;

    let poster = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

    let homepageOption = homepage !== null && homepage.includes("netflix.com")  ? (
      <img src={netflixpic}></img>
    ) :homepage !== null && homepage.includes("apple.com") ? (
      <AppleIcon />
    ) : (
      <HomeIcon />
    );
    let chips = genres.map((genre) => {
      return <Chip label={genre.name} />;
    });

    let actorsJSX = actors.map((actor) => {
      return <ActorCard actor={actor} />;
    });

    let reviewsJSX = reviews.map((review) => {
      return <MovieReviewCard review={review} />;
    });

    let similarJSX = similar.map((movie) => {
      return <MovieCard movie={movie} />;
    });

    let videosJSX = videos.map((movie) => {
      return <MovieVideo movie={movie} />;
    });
    return (
      <div className="movie-page">
        <div className="container">
          <div
            className="movie-banner"
            style={{ backgroundImage: `url(${Background})` }}
          >
            <div className="banner-overlay">
              <div className="banner-content">
                <h1>{movie.title}</h1>
                <div className="directors">
                  <p>Directed By: {directors}</p>
                </div>
                <p>{movie.tagline}</p>
              </div>
            </div>
          </div>
          <div className="movie-page-content">
            <div className="poster-div">
              <img src={poster}></img>
            </div>
            <div className="movie-details">
              <div className="movie-overview">
                <h4>Overview</h4>
                {movie.overview}
              </div>
              <div className="chips">{chips}</div>
              <div className="movie-bottom">
                <div className="movie-rating">
                  <AverageRating rating={movie.vote_average * 10} />
                  <p>Votes: {movie.vote_count}</p>
                </div>
                 <div className="movie-homepage" >
                  <a href={movie.homepage} target="__blank">
                    {homepageOption}
                  </a>
                </div>
                <div className="movie-trailer">
                  <TrailerModal type="movie" id={movieID} />
                </div>
              </div>
            </div>
          </div>
          <div
            className="scroll-container-div parallax"
            style={{ backgroundImage: `url(${Background})` }}
          >
            <h2>Cast</h2>
            <div className="scroll-div">{actorsJSX}</div>
          </div>
          {/* <div className="parallax" style={{ backgroundImage: `url(${Background})` }}></div> */}
          <div className="scroll-container-div">
            <h2>Reviews</h2>
            <div className="scroll-div">{reviewsJSX}</div>
          </div>
          {/* <div className="parallax" style={{ backgroundImage: `url(${Background})` }}></div> */}

          <div
            className="scroll-container-div parallax"
            style={{ backgroundImage: `url(${Background})` }}
          >
            <h2>Videos</h2>
            <div className="scroll-div">{videosJSX}</div>
          </div>
          {/* <div className="parallax" style={{ backgroundImage: `url(${Background})` }}></div> */}

          <div className="scroll-container-div">
            <h2>Similar Films</h2>
            <div className="scroll-div">{similarJSX}</div>
          </div>
        </div>
      </div>
    );
  }
}
