import React, { Component } from "react";
import axios from "axios";
import ActorCard from "../ActorCard/ActorCard";
import MoviePoster from "../MoviePoster/MoviePoster";
import "./ActorsPage.scss";

class ActorsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actorsID: "",
      actor: {},
      profile_path: "",
      known_for: []
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
       let actorsID = this.props.match.params.id;
axios
.get(
 `https://api.themoviedb.org/3/discover/movie?api_key=12aa3499b6032630961640574aa332a9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_people=${actorsID}`
)
.then((results) => {

        this.setState({
          known_for: results.data.results,
        });
      })
      .catch();
  }

  render() {
    const { actor, known_for } = this.state;

    let ActorProfile = `https://image.tmdb.org/t/p/original/${actor.profile_path}`;

    console.log(this.state);

    let DiscoverActor = known_for.map(element => {
     return (
      <MoviePoster title={element.title} poster={element.poster_path} rating={element.vote_average} />
     )
    })

    return (
      <div className="actor-page">
      <div className="container">

      
        <div className="left-container">
          <div
            className="actor-profile"
          >
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
          <div className="actor-known-for">
          {DiscoverActor}
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default ActorsPage;
