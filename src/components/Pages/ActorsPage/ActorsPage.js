import React, { Component, useState } from "react";
import axios from "axios";
import MoviePoster from "../../Features/MoviePoster/MoviePoster";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ProfileCard from "../../Cards/ProfileCard/ProfileCard";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";
import Banner from "../../Features/Banner/Banner";
import ButtonToggle from "../../Features/ButtonToggle/ButtonToggle";
import ActorProfile from "../../Features/ActorProfile/ActorProfile";
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
      actor_images: [],
      header: "Popular",
    };
  }

  componentDidMount() {
    this.getActor();
    this.discoverActorByID();
    this.getActorImages();
  }

  getActor = () => {
    let actorsID = this.props.match.params.id;
    axios
      .get(
        `https://api.themoviedb.org/3/person/${actorsID}?api_key=12aa3499b6032630961640574aa332a9`
      )
      .then((results) => {
        console.log(results.data);
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
        this.setState({
          header: sortBy === "popularity.desc" ? "Popular" : "Filmography",
          known_for: results.data.results,
          page: results.data.page,
          total_pages: results.data.total_pages,
          total_results: results.data.total_results,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  discoverActorByIDAddMore = () => {
    const { sortBy, page } = this.state;
    let actorsID = this.props.match.params.id;
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=12aa3499b6032630961640574aa332a9&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=1&with_people=${actorsID}&page=${page}`
      )
      .then((results) => {
        this.setState({
          known_for: [...this.state.known_for, ...results.data.results],
          page: results.data.page,
          total_pages: results.data.total_pages,
          total_results: results.data.total_results,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getActorImages = () => {
    let actorsID = this.props.match.params.id;
    axios
      .get(
        `https://api.themoviedb.org/3/person/${actorsID}/images?api_key=12aa3499b6032630961640574aa332a9&language=en-US`
      )
      .then((results) => {
        console.log(results);
        this.setState({
          actor_images: results.data.profiles,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  sortAction = (sort) => {
    console.log(sort);
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

  handleScroll = () => {};

  addPage = () => {
    this.setState({ page: this.state.page + 1 }, this.discoverActorByIDAddMore);
  };

  render() {
    const { actor, known_for, total_pages, page, actor_images } = this.state;

    let buttons = [
      { name: "Popular", function: () => this.sortAction("popularity.desc") },
      {
        name: "Filmography",
        function: () => this.sortAction("primary_release_date.desc"),
      },
    ];

    let actorImages = actor_images.map((element, index) => {
      let actorImage = `https://image.tmdb.org/t/p/w185/${element.file_path}`;

      return (
        <div className="actor-image">
          <img src={actorImage} alt={actor.name + " profile" + index} />{" "}
        </div>
      );
    });

    let DiscoverActor = known_for.map((element, index) => {
      console.log(element);
      return (
        <MoviePoster
          key={index}
          title={element.title}
          poster={element.poster_path}
          rating={element.vote_average}
          releaseDate={element.release_date}
          type={"movies"}
          id={element.id}
        />
      );
    });
    const ProfilePic = `https://image.tmdb.org/t/p/original/${actor.profile_path}`;

    return (
      <>
        <ActorProfile
          profilePic={ProfilePic}
          name={actor.name}
          bio={actor.biography}
          place_of_birth={actor.place_of_birth}
          birthday={actor.birthday}
          deathday={actor.deathday}
        />

        <ScrollDiv
          buttons={buttons}
          title=""
          cards={DiscoverActor}
          handleScroll={this.handleScroll}
          page={page}
          total_pages={total_pages}
          addPage={this.addPage}
        ></ScrollDiv>

        <ScrollDiv
          title=""
          cards={actorImages}
          handleScroll={this.handleScroll}
          page={0}
          total_pages={0}
          addPage={this.addPage}
        ></ScrollDiv>
      </>
    );
  }
}

export default ActorsPage;
