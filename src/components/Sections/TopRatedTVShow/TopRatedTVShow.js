import React, { Component } from "react";
import MovieCard from "../../Cards/MovieCard/MovieCard";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import axios from "axios";

class TopRatedTVShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      page: 0,
      total_pages: 0,
      type: 'top_rated'
    };
  }

  componentDidMount = () => {
    this.getTVShows();
  };

  changeType = (type) =>{
    this.setState({
      type
    }, this.getTVShows);
  }

  getTVShows = () => { 
    const {type} = this.state;
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${type}?api_key=12aa3499b6032630961640574aa332a9&language=en-US&page=1`
      )
      .then((res) => {
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
   const {page, type} = this.state;
   axios
   .get(
     `https://api.themoviedb.org/3/tv/${type}`
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
    let {page, total_pages, type} = this.state;
    let message = type === "top_rated" ? 'Top Rated': type === 'popular' ? 'Most Popular' : type === 'on_the_air' ?  'On Air' : 'Playing Today';
    let tvshows = this.state.results.map((tvshow, index) => {
      return <MovieCard message={`#${index + 1} ${message}`} tvshow={tvshow} key={index} id={tvshow.id} title={tvshow.name} overview={tvshow.overview} voteAverage={tvshow.vote_average} backdropPath={tvshow.backdrop_path} type="tvshows"/>;
    });

    return (
      <div className="trending">
        <ButtonGroup size="small" aria-label="small outlined button group">
          <Button
            onClick={() => {
              this.changeType("top_rated");
            }}
            name="day"
            className={this.state.type === 'top_rated' ? 'active trending-button': 'trending-button'}
          >
            Top Rated
          </Button>
          <Button
            onClick={() => {
              this.changeType("popular");
            }}
            name="week"
            className={this.state.type === 'popular' ? 'active trending-button': 'trending-button'}

          >
            Most Popular
          </Button>
          <Button
            onClick={() => {
              this.changeType("on_the_air");
            }}
            name="week"
            className={this.state.type === 'on_the_air' ? 'active trending-button': 'trending-button'}

          >
            On Air
          </Button>
          <Button
            onClick={() => {
              this.changeType("airing_today");
            }}
            name="week"
            className={this.state.type === 'airing_today' ? 'active trending-button': 'trending-button'}

          >
            On Air Today
          </Button>
        </ButtonGroup>
        <ScrollDiv title={`TV - ${message}`}cards={tvshows} handleScroll={this.handleScroll} page={page} total_pages={total_pages} addPage={this.addPage}></ScrollDiv>
      </div>
    );
  }
}

export default TopRatedTVShow;
