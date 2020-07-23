import React, { Component } from "react";
import Navbar from "../NavBar/NavBar";
import './HomePage.scss';
import Banner from "../Banner/Banner";
import MultiSearch from "../MultiSearch/MultiSearch";
import TrendingMovies from "../TrendingMovies/TrendingMovies";
import axios from 'axios';

export default class HomePage extends Component {

    constructor(props){
        super(props);
        this.state = {
           poster: '',
            config: {}
        };
    }

    componentDidMount(){
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
              poster: result.data.results[1].backdrop_path,
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
          })
          .catch((error) => {
            console.log(error);
          });
      };
  render() {
    let Background = `https://image.tmdb.org/t/p/original/${this.state.poster}`;

    return (
      <div className="homepage">
          <div className="container">

        
        {/* Make Banner */}
        <div className="banner" style={{ backgroundImage: `url(${Background})`}}>
            <div className="banner-overlay">
                <div className="banner-content"> 
                <h1>Welcome to Kepp it Reel...</h1>
                    <MultiSearch />
                </div> 
            </div> 
        </div>
        {/* Search  */}
        <div className="search-results">
        

         {/* Trending Movies */}
         {/* <TrendingMovies /> */}
        
<TrendingMovies />   
        
        </div>
        </div>
       
      </div>
    );
  }
}
