import React, { Component } from "react";
import axios from "axios";
import ActorCard from "../../Cards/ActorCard/ActorCard";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";
// import Button from "@material-ui/core/Button";
// import ButtonGroup from "@material-ui/core/ButtonGroup";

export default class PopularActors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popActors: [],
      page: 1,
      total_pages: 0
    };
  }

  componentDidMount() {
    this.getPopularActors();
  }

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

  getPopularActors = () => {
    const {page} = this.state;

    axios
      .get(
        `https://api.themoviedb.org/3/person/popular?api_key=12aa3499b6032630961640574aa332a9&language=en-US&page=1`
      ,{
        params: {
          language: 'en-US', 
          api_key: '12aa3499b6032630961640574aa332a9',
          page: page,
        
        }
      })
      .then((results) => {

        this.setState({ 
          popActors: results.data.results,
          page: results.data.page,
          total_pages: results.data.total_pages
         });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  tagOnMore = () => {
    const {page} = this.state;
    axios
    .get(
      `https://api.themoviedb.org/3/person/popular`
      ,{
        params: {
          language: 'en-US', 
          api_key: '12aa3499b6032630961640574aa332a9',
          page: page,
        
        }
      })
    .then((result) => {
      this.setState({
        popActors: [... this.state.popActors, ...result.data.results],
        page: result.data.page,
 
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    let {popActors, page , total_pages} = this.state;
    let actors = popActors.map((actor, index) => {
      return <ActorCard actor={actor} key={index}  />;
    });

    return (
      <div className="trending">
       
        <ScrollDiv title="Popular Actors" cards={actors} handleScroll={this.handleScroll} page={page} total_pages={total_pages} addPage={this.addPage}></ScrollDiv>
      </div>
    );
  }
}
