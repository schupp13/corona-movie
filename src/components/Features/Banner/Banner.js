import React, { Component } from 'react';
import axios from 'axios';
import './Banner.scss';

export default class Banner extends Component {

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
        console.log(this.state);
        let Background = `https://image.tmdb.org/t/p/original/${this.state.poster}`;

            return (
            <div className="banner-display" style={{ backgroundImage: `url(${Background})` }} >
              <div className="banner-overlay"></div>
            </div>
        )
    }
}
