import React, { Component } from "react";
import axios from "axios";
import "./MoviePage.scss";
import Chip from "@material-ui/core/Chip";
import HomeIcon from "@material-ui/icons/Home";
import netflixpic from "../../../img/netflix.png";
import AppleIcon from "@material-ui/icons/Apple";
import TrailerModal from "../../Features/TrailerModal/TrailerModal";
import ActorCard from "../../Cards/ActorCard/ActorCard";
import MovieReviewCard from "../../Cards/MovieReviewCard/MovieReviewCard";
import MovieCard from "../../Cards/MovieCard/MovieCard";
import MovieVideo from "../../Features/MovieVideo/MovieVideo";
import MoviePoster from "../../Features/MoviePoster/MoviePoster";

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
      movie_posters:[],
      movie_backdrops:[]
    };
  }

  componentDidMount() {
    this.getMovie();
    this.getTrailer();
    this.getCast();
    this.getReviews();
    this.getSimilar();
    this.getVideos();
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

  getImages = () => {
    let movieID = this.props.match.params.id;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}/images?api_key=12aa3499b6032630961640574aa332a9&language=en-US&include_image_language=en`
      )
      .then((results) => {
        console.log(results)
        this.setState({
          movie_posters: results.data.posters,
          movie_backdrops: results.data.backdrops
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

  getVideos = () => {
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
    console.log(this.state);
    let {
      movie,
      genres,
      homepage,
      director,
      actors,
      reviews,
      similar,
      videos,
      movie_posters,
      movie_backdrops,
      crew
    } = this.state;
    let movieID = this.props.match.params.id;

 

    let moviePosters = movie_posters.map((element, index) =>{
      return <div className="movie-posters" style={{margin:'15px'}} key={index}><img alt={element.name} src={`https://image.tmdb.org/t/p/w154/${element.file_path}`}></img></div>
    });

    let movieBackdrops = movie_backdrops.map((element, index) =>{
      return <div className="movie-backdrops" style={{margin:'15px'}} key={index}><img alt={element.name} src={`https://image.tmdb.org/t/p/w300/${element.file_path}`}></img></div>
    });

    let Background = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;


    let homepageOption =
      homepage !== null && homepage.includes("netflix.com") ? (
        <img src={netflixpic} alt="netflix logo"></img>
      ) : homepage !== null && homepage.includes("apple.com") ? (
        <AppleIcon />
      ) : (
        <HomeIcon />
      );
    let chips = genres.map((genre, index) => {
      return <Chip label={genre.name} key={index} />;
    });

    let actorsJSX = actors.map((actor, index) => {
      return <ActorCard actor={actor} key={index}  />;
    });

    let crewJSX = crew.map((actor, index) => {
      return <ActorCard actor={actor}  key={index}/>;
    });

    let reviewsJSX = reviews.map((review, index) => {
      return <MovieReviewCard review={review} key={index}/>;
    });

    let similarJSX = similar.map((movie,index) => {
      return <MovieCard message={`#${index + 1} similar`} movie={movie} key={index} id={movie.id} title={movie.title} overview={movie.overview} voteAverage={movie.vote_average} backdropPath={movie.backdrop_path} type="movies"/>;
    });

    let videosJSX = videos.map((movie, index) => {
      return <MovieVideo movie={movie} key={index} />;
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
                
                <p>{movie.tagline}</p>
              </div>
            </div>
          </div>
          <div className="movie-page-content">
            <div className="poster-div">
              {/* <img src={poster}></img> */}
              <MoviePoster
                title={movie.title}
                poster={movie.poster_path}
                rating={movie.vote_average}
                releaseDate={movie.release_date}
                id={movie.id}
              />
            </div>
            <div className="movie-details">
              <div className="movie-overview">
                <h4>Overview</h4>
                <p>{movie.overview}</p>
                <p>{movie.release_date && movie.release_date.substring(0,4)}</p>
              </div>
              <div className="chips">{chips}</div>
              <div className="movie-bottom">
                
                <div className="movie-homepage">
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

          <div className="scroll-container-div">
            <h2>Posters</h2>
            <div className="scroll-div">{moviePosters}</div>
          </div>
          <div className="scroll-container-div">
            <h2>Backdrops</h2>
            <div className="scroll-div">{movieBackdrops}</div>
          </div>
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
          <div
            className="scroll-container-div "
             
          >
            <h2>Crew</h2>
            <div className="scroll-div">{crewJSX}</div>
          </div>
        </div>
      </div>
    );
  }
}
