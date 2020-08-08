import React, { Component } from "react";
import axios from "axios";
import ActorCard from "../ActorCard/ActorCard";
import AverageRating from "../AverageRating/AverageRating";
import MovieReviewCard from "../MovieReviewCard/MovieReviewCard";
import MovieCard from "../MovieCard/MovieCard";
import Chip from "@material-ui/core/Chip";
import HomeIcon from "@material-ui/icons/Home";
import netflixpic from "../../img/netflix.png";
import AppleIcon from "@material-ui/icons/Apple";
import MovieVideo from "../MovieVideo/MovieVideo";
import TrailerModal from "../TrailerModal/TrailerModal";
import SeasonsCard from "../SeasonsCard/SeasonsCard";
import "./TVShowPage.scss";

class TVShowPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tvshowID: "",
      tvshow: {},
      cast: [],
      crew: [],
      reviews: [],
      similarTvShows: [],
      genres: [],
      homepage: "",
      videos: [],
      runtime:[],
      firstAirDate:'',
      seasons: [],
      status: '',
      episodes: '',
      networks: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.componentDidMount();
    }
  }

  componentDidMount() {
    this.getTVShow();
    this.getCredits();
    this.getReviews();
    this.getSimilarTvShows();
    this.getVideos();
  }

  getTVShow = () => {
    let tvshowID = this.props.match.params.id;
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${tvshowID}?api_key=12aa3499b6032630961640574aa332a9`
      )
      .then((results) => {
        console.log(results);
        this.setState({
          tvshow: results.data,
          homepage: results.data.homepage,
          genres: results.data.genres,
          runtime: results.data.episode_run_time,
          firstAirDate: results.data.first_air_date,
          seasons: results.data.seasons,
          status: results.data.status,
          episodes: results.data.number_of_episodes,
          networks: results.data.networks
        });
      })
      .catch();
  };

  getCredits = () => {
    let tvshowID = this.props.match.params.id;
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${tvshowID}/credits?api_key=12aa3499b6032630961640574aa332a9`
      )
      .then((results) => {
        console.log(results);
        this.setState({
          cast: results.data.cast,
          crew: results.data.crew,
        });
      })
      .catch();
  };

  getReviews = () => {
    let tvshowID = this.props.match.params.id;
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${tvshowID}/reviews?api_key=12aa3499b6032630961640574aa332a9`
      )
      .then((results) => {
        console.log(results);
        this.setState({
          reviews: results.data.results,
        });
      })
      .catch();
  };

  getSimilarTvShows = () => {
    let tvshowID = this.props.match.params.id;
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${tvshowID}/similar?api_key=12aa3499b6032630961640574aa332a9`
      )
      .then((results) => {
        console.log(results);
        this.setState({
          similarTvShows: results.data.results,
        });
      })
      .catch();
  };

  getVideos = () => {
    let tvshowID = this.props.match.params.id;
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${tvshowID}/videos?api_key=12aa3499b6032630961640574aa332a9`
      )
      .then((results) => {
        console.log(results);
        this.setState({
          videos: results.data.results,
        });
      })
      .catch();
  };

  render() {
    const {
      tvshow,
      cast,
      crew,
      reviews,
      similarTvShows,
      genres,
      homepage,
      videos,
      seasons,
      status,
      firstAirDate,
      runtime,
      episodes,
      networks
    } = this.state;

    let runtimejsx = runtime && runtime.join(', ') + 'min';

    let Background = `https://image.tmdb.org/t/p/original/${tvshow.backdrop_path}`;
    let poster = `https://image.tmdb.org/t/p/original/${tvshow.poster_path}`;

    let actorsjsx = cast.map((actor) => {
      return <ActorCard actor={actor} />;
    });
    let crewjsx = crew.map((crew) => {
      return <ActorCard actor={crew} />;
    });

    let reviewsjsx = reviews.map((review) => {
      return <MovieReviewCard review={review} />;
    });

    let similarTvShowsjsx = similarTvShows.map((tvshow, index) => {
      return <MovieCard tvshow={tvshow} key={index} id={tvshow.id} title={tvshow.name} overview={tvshow.overview} voteAverage={tvshow.vote_average} backdropPath={tvshow.backdrop_path} type="tvshows"/>;
    });

    let seasonsjsx =  seasons.map(season =>{
      return <SeasonsCard season={season} tvshowID={tvshow.id} />
    });

    let homepageOption = homepage.includes("netflix.com") ? (
      <img src={netflixpic} alt="netflix link"></img>
    ) : homepage.includes("apple.com") ? (
      <AppleIcon />
    ) : (
      <HomeIcon />
    );

    let chips = genres.map((genre) => {
      return <Chip label={genre.name} />;
    });

    let videosjsx = videos.map((video) => {
      return <MovieVideo movie={video} />;
    });

    let networksjsx = networks.map((network) =>{
      return <img alt={network.name + " logo"} src={`https://image.tmdb.org/t/p/w92/${network.logo_path}`} />;
    });

    console.log(this.state);
    return (
      <div className="tvshow-page">
        <div className="container">
          <div
            className="tvshow-banner"
            style={{ backgroundImage: `url(${Background})` }}
          >
            <div className="banner-overlay">
              <div className="banner-content">
                <h1>{tvshow.name}</h1>
                <div className="directors">
                  <p>Status: {status} </p>
                  <p>Premiered: {firstAirDate}</p>
                  <p>episode length: {runtimejsx}</p>
                  <p>episodes: {episodes}</p>
                  <div>{networksjsx}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="tvshow-page-content">
            <div className="poster-div">
              <img alt="tv poster" src={poster}></img>
              <div className="tvshow-rating-chart">
              <AverageRating rating={tvshow.vote_average * 10} />
              </div>
            </div>
            <div className="tvshow-details">
              <div className="tvshow-overview">
                <h4>Overview</h4>
                {tvshow.overview}
              </div>
              <div className="chips">{chips}</div>
              <div className="tvshow-bottom">
                
                <div className="tvshow-homepage">
                  <a href={homepage} target="__blank">
                    {homepageOption}
                  </a>
                </div>
                <div className="tvshow-trailer">
                  <TrailerModal type="tv" id={tvshow.id} />
                </div>
              </div>
            </div>
          </div>
          <div
            className="scroll-container-div parallax"
            style={{ backgroundImage: `url(${Background})` }}
          >
            <h2>Cast</h2>

            <div className="scroll-div">{actorsjsx}</div>
          </div>
          <div className="scroll-container-div">
            <h2>Seasons</h2>
            <div className="scroll-div">{seasonsjsx}</div>
          </div>
          <div className="scroll-container-div">
            <h2>Reviews</h2>
            <div className="scroll-div">{reviewsjsx}</div>
          </div>
          <div
            className="scroll-container-div parallax"
           style={{ backgroundImage: `url(${Background})` }}
          >
            <h2>Crew</h2>

            <div className="scroll-div">{crewjsx}</div>
          </div>
          <div className="scroll-container-div">
            <h2>TV Show Trailers</h2>
            <div className="scroll-div">{videosjsx}</div>
          </div>
          <div className="scroll-container-div">
            <h2>Similar TV Shows</h2>
            <div className="scroll-div">{similarTvShowsjsx}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default TVShowPage;
