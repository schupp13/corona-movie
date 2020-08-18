import React, { Component } from "react";
import axios from "axios";
import "./MoviePage.scss";
import ActorCard from "../../Cards/ActorCard/ActorCard";
import MovieReviewCard from "../../Cards/MovieReviewCard/MovieReviewCard";
import MovieCard from "../../Cards/MovieCard/MovieCard";
import MovieVideo from "../../Features/MovieVideo/MovieVideo";
import Banner from "../../Features/Banner/Banner";
import OverviewSection from "../../Sections/OverviewSection/OverviewSection";
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
      companies:[],
      movie_posters:[],
      movie_backdrops:[]
    };
  }

  componentDidMount() {
    this.getMovie();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getMovie();
    }
  }

  getMovie = () =>{
    let movieID = this.props.match.params.id;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=12aa3499b6032630961640574aa332a9&append_to_response=credits,images,videos,reviews,similar`
      )
      .then((results) => {
        console.log(results)
        this.setState({
          movie: results.data,
          actors: results.data.credits.cast,
          crew: results.data.credits.crew,
          movie_posters: results.data.images.posters,
          movie_backdrops: results.data.images.backdrops,
          reviews: results.data.reviews.results,
          videos: results.data.videos.results,
          similar: results.data.similar.results,
          genres: results.data.genres
        });
      })
      .catch();
  }

  
  render() {
    
    let {
      movie,
      genres,
      homepage,
      director,
      companies,
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
      <>
          <Banner background={Background} title={movie.title} tagline={movie.tagline} search={false} />
          <OverviewSection type="movie" title={movie.title} poster_path={movie.poster_path} vote_average={movie.vote_average} release_date={movie.release_date} homepage={homepage} genres={genres} id={movie.id} overview={movie.overview}></OverviewSection>
          
          <div
            className="scroll-container-div parallax"
            style={{ backgroundImage: `url(${Background})` }}
          >
            <h2>Cast</h2>
            <div className="scroll-div">{actorsJSX}</div>
          </div>
          
           <div className="scroll-container-div">
            <h2>Reviews</h2>
            <div className="scroll-div">{reviewsJSX}</div>
          </div>
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
          <div className="scroll-container-div">
            <h2>Similar Films</h2>
            <div className="scroll-div">{similarJSX}</div>
          </div>
          <div
            className="scroll-container-div"
          >
            <h2>Crew</h2>
            <div className="scroll-div">{crewJSX}</div>
          </div>
       
      </>
    );
  }
}
