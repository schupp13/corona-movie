import React, { Component } from "react";
import axios from "axios";
import ActorCard from "../ActorCard/ActorCard";
import MoviePoster from "../MoviePoster/MoviePoster";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Pagination from "../Pagination/Pagination";
import "./ActorsPage.scss";

class ActorsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actorsID: "",
      actor: {},
      profile_path: "",
      known_for: [],
      sortBy: "popularity.desc",
      page: 1,
      total_pages: 0,
      total_results: 0,
    };
  }

  componentDidMount() {
    this.getActor();
    this.discoverActorByID();
  }

  getActor = () => {
    let actorsID = this.props.match.params.id;
    axios
      .get(
        `https://api.themoviedb.org/3/person/${actorsID}?api_key=12aa3499b6032630961640574aa332a9`
      )
      .then((results) => {
        this.setState({
          actor: results.data,
        });
      })
      .catch();
  };

  discoverActorByID = () => {
    const { sortBy, page } = this.state;
    let actorsID = this.props.match.params.id;
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=12aa3499b6032630961640574aa332a9&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=1&with_people=${actorsID}&page=${page}`
      )
      .then((results) => {
        console.log(results);
        this.setState({
          known_for: results.data.results,
          page: results.data.page,
          total_pages: results.data.total_pages,
          total_results: results.data.total_results,
        });
      })
      .catch();
  };

  sortAction = (sort) => {
    this.setState(
      {
        sortBy: sort,
        page: 1,
      },
      this.discoverActorByID
    );
  };

  paginate = (e, value) => {
    this.setState(
      {
        page: value,
      },
      this.discoverActorByID
    );
  };

  render() {
    const { actor, known_for, total_pages, total_results, page } = this.state;

    let ActorProfile = `https://image.tmdb.org/t/p/original/${actor.profile_path}`;

    console.log(this.state);

    let DiscoverActor = known_for.map((element) => {
      return (
        <MoviePoster
          title={element.title}
          poster={element.poster_path}
          rating={element.vote_average}
          releaseDate={element.release_date}
          id={element.id}
        />
      );
    });

    return (
      <div className="actor-page">
        <div className="container">
          <div className="top-of-page">
            <div className="left-container">
              <div className="actor-profile">
                <img src={ActorProfile}></img>
              </div>
              <div className="actor-personal-info">
                <h3>Personal Info</h3>
                <div className="actor-birthday">
                  <h4>Birthday</h4>
                  {actor.birthday}
                </div>
                <div className="actor-place-of-birth">
                  <h4>Place of Birth</h4>
                  {actor.place_of_birth}
                </div>
              </div>
            </div>
            <div className="right-container">
              <h1 className="actor-name">{actor.name}</h1>
              <p className="actor-bio">{actor.biography}</p>
              <div className="actor-known-for">{DiscoverActor}</div>
            </div>
          </div>
          <div className="movie-options-container">
            <ButtonGroup>
              <Button onClick={() => this.sortAction("popularity.desc")}>
                Popular
              </Button>
              <Button onClick={() => this.sortAction("release_date.desc")}>
                Filmography
              </Button>
            </ButtonGroup>
            <div className="movie-options">{DiscoverActor} </div>
            <div className="pagination">
              <Pagination
                page={page}
                count={total_pages}
                setPage={this.paginate}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ActorsPage;
