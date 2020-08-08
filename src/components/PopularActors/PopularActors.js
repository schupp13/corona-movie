import React, { Component } from "react";
import axios from "axios";
import ActorCard from "../ActorCard/ActorCard";
// import Button from "@material-ui/core/Button";
// import ButtonGroup from "@material-ui/core/ButtonGroup";

export default class PopularActors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popActors: [],
    };
  }

  componentDidMount() {
    this.getPopularActors();
  }

  getPopularActors = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/person/popular?api_key=12aa3499b6032630961640574aa332a9&language=en-US&page=1`
      )
      .then((results) => {
        this.setState({ popActors: results.data.results });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let actors = this.state.popActors.map((actor, index) => {
      return <ActorCard actor={actor} key={index}  />;
    });

    return (
      <div className="trending">
        <h2>Popular Actors</h2>

        <div className="trending-items">{actors}</div>
      </div>
    );
  }
}
