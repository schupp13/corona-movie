import React, { Component } from 'react'
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';
import TVShowsCard from '../TVShowsCard/TVShowsCard';
import ActorCard from '../ActorCard/ActorCard';

export default class SearchPage extends Component {

    constructor(props){
        super(props);
        
        
        this.state = {
            page: 1,
            search: this.props.match.params.search,
            total_pages: '',
            total_results: '',
            results: []
        }
    }


    componentDidMount(){
      
        this.getMultiSearch();
     
    }

    getMultiSearch = ()=>{
        let {page, search} = this.state;
        axios.get(`https://api.themoviedb.org/3/search/multi?api_key=12aa3499b6032630961640574aa332a9&language=en-US&page=1&include_adult=false&query=${search}&page=${page}`)
        .then(search =>{
            console.log(search);
            this.setState({
                results: search.data.results,
                total_pages: search.data.total_pages,
                total_results: search.data.total_results
            });
        })
        .catch(error =>{
            console.log(error);
        })
    }
    render() {
        let {results} = this.state;
        let jsx = results.map(element =>{
            return element.media_type === "movie" ? <MovieCard movie={element} /> : element.media_type ==="tv" ? <TVShowsCard tvshow={element}/> : <ActorCard actor={element}/>;
        })
        return (
            <div>
                {jsx}
            </div>
        )
    }
}
