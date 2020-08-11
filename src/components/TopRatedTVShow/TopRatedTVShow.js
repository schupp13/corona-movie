import React, { Component } from "react";
import MovieCard from "../MovieCard/MovieCard";
import ScrollDiv from "../ScrollDiv/ScrollDiv";
import axios from "axios";

class TopRatedTVShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      page: 0,
      total_pages: 0
    };
  }

  componentDidMount = () => {
    this.getTVShows();
  };

  getTVShows = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/tv/top_rated?api_key=12aa3499b6032630961640574aa332a9&language=en-US&page=1"
      )
      .then((res) => {
        console.log(res)
        this.setState({ 
          results: res.data.results,
          page: res.data.page,
          total_pages: res.data.total_pages
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleScroll = () => {
    // const firstElement = document.getElementById('scroll-div').firstChild;
    // const lastElment = document.getElementById('scroll-div').lastChild;
    // if(document.getElementById('scroll-div').scrollLeft > (5891 * this.state.page)){
    //   console.log("true")
    //   this.addPage();
    // }
    // console.log(document.getElementById('scroll-div').scrollLeft)
}

  addPage = () => {
    this.setState({page : this.state.page + 1}, this.tagOnMore)
  }

 tagOnMore = () => {
   const {page} = this.state;
   axios
   .get(
     `https://api.themoviedb.org/3/tv/top_rated`
     ,{
       params: {
         api_key: '12aa3499b6032630961640574aa332a9',
         page: page,
       }
     })
   .then((result) => {
     this.setState({
       results: [... this.state.results, ...result.data.results],
       page: result.data.page,

     });
   })
   .catch((error) => {
     console.log(error);
   });
 }

 
  render() {
    console.log(this.state)
    let {page, total_pages} = this.state;
    let tvshows = this.state.results.map((tvshow, index) => {
      return <MovieCard message={`#${index + 1} Top Rated`} tvshow={tvshow} key={index} id={tvshow.id} title={tvshow.name} overview={tvshow.overview} voteAverage={tvshow.vote_average} backdropPath={tvshow.backdrop_path} type="tvshows"/>;
    });

    return (
      <div className="trending">
        <h2>Top Rated TV Shows </h2>

        <ScrollDiv cards={tvshows} handleScroll={this.handleScroll} page={page} total_pages={total_pages} addPage={this.addPage}></ScrollDiv>
      </div>
    );
  }
}

export default TopRatedTVShow;
