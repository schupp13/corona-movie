import React, { Component } from 'react';
import MovieDetails from '../MovieDetails/MovieDetails';
import axios from 'axios';
import './MoviePage.scss';
import AverageRating from '../AverageRating/AverageRating';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import netflixpic from '../../img/netflix.png';
import AppleIcon from '@material-ui/icons/Apple'
import TrailerModal from '../TrailerModal/TrailerModal';


export default class MoviePage extends Component {


    constructor(props){
        super(props);
        this.state ={
            movie: {},
            genres:[],
            homepage: 'false',
            trailer:{}
        };
    }

    componentDidMount(){
        this.getMovie();
        this.getTrailer();
    }

    getMovie = () =>{
        let movieID = this.props.match.params.id;
        axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=12aa3499b6032630961640574aa332a9`)
        .then(results =>{
            console.log(results.data);
            this.setState({
                movie : results.data, 
                genres: results.data.genres,
                homepage: results.data.homepage
            });
        })
        .catch()
    }

    getTrailer = () =>{
        let movieID = this.props.match.params.id;
        axios.get(`https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=12aa3499b6032630961640574aa332a9&language=en-US`)
        .then(results =>{
            console.log(results.data.results[0]);
            this.setState({
              trailer: results.data.results[0]
            });
        })
        .catch()
    }
    

    render() {
        let {movie, genres, homepage, trailer} = this.state;
        let movieID = this.props.match.params.id;

        console.log(trailer);
        let Background = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
        let poster = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        let homepageOption = homepage.includes('netflix.com') ? <img src={netflixpic}></img>: homepage.includes('apple.com') ?  <AppleIcon  />:   <HomeIcon  />;
        let chips = genres.map(genre =>{
            return <Chip label={genre.name}/>;
        })
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
            <img src={poster}></img>
     
          </div>
            <div className="movie-details">
            {movie.overview}
            <div className="chips">
            {chips}
            </div>
            <div className="movie-bottom">
                <div className="movie-rating">
                    <AverageRating rating={movie.vote_average * 10}/>
                    <p>Votes: {movie.vote_count}</p>
                
                </div>
                <div className="movie-homepage">
                <a href={movie.homepage} target="__blank">
                   
                    {homepageOption}
                    
                    </a>
                    <TrailerModal movieID={movieID}/>
                </div>
            </div>
    
      
            </div>

             </div>
                </div>
            </div>
        )
    }
}
