import React, { useEffect, useState } from "react";
import axios from "axios";
import ActorProfile from "../../Features/ActorProfile/ActorProfile";
import PictureModal from "../../Features/PictureModal/PictureModal";
import MoviePoster from "../../Features/MoviePoster/MoviePoster";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";

export default function ActorPageHooks(props) {
  let [sortBy, setSortBy] = useState("popularity.desc");
  let [moviePage, setMoviePage] = useState(1);
  let [movieTotalPage, setMovieTotalPage] = useState();
  let [tvPage, setTvPage] = useState("1");
  let [actor, setActor] = useState({
    userState: {},
    actor: {},
    knownFor: [],
    images: [],
    taggedImages: [],
    page: 1,
    totalPages: 2,
  });

  useEffect(() => {
    getActorPage();
  }, [sortBy]);

  const getActorPage = () => {
    let item_id = parseInt(props.match.params.id);
    let user_id = parseInt(JSON.parse(localStorage.getItem("user")).id);
    let media_id = 5; // 5 is for actors};

    const userState = axios.post(`/api/user/state`, {
      user_id,
      item_id,
      media_id,
    });

    const actorInfo = axios.get(
      `https://api.themoviedb.org/3/person/${item_id}`,
      {
        params: {
          api_key: "12aa3499b6032630961640574aa332a9",
          append_to_response: "images,tagged_images,external_ids",
        },
      }
    );

    const getMovies = axios.get(`https://api.themoviedb.org/3/discover/movie`, {
      params: {
        api_key: "12aa3499b6032630961640574aa332a9",
        language: "en-US",
        with_people: props.match.params.id,
        sort_by: sortBy,
        include_adult: "false",
        include_video: "true",
        page: moviePage,
      },
    });

    const getTv = axios.get(`https://api.themoviedb.org/3/discover/tv`, {
      params: {
        api_key: "12aa3499b6032630961640574aa332a9",
        language: "en-US",
        sort_by: sortBy,
        with_people: props.match.params.id,
        include_adult: "false",
        include_video: "true",
        page: tvPage,
      },
    });

    Promise.all([actorInfo, getMovies, getTv, userState])
      .then((results) => {
        console.log(results);
        setActor({
          person: results[0].data,
          userState: results[3].data,
          images: results[0].data.images.profiles,
          taggedImages: results[0].data.tagged_images.results,
          knownFor: results[1].data.results,
          page: results[1].data.page,
          totalPages: results[1].data.total_pages,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeSort = (sort) => {
    console.log(sort);
    setSortBy(sort);
  };
  const addPage = () => {
    setMoviePage(moviePage + 1);
  };

  const handleLike = (e) => {
    let user_id = parseInt(JSON.parse(localStorage.getItem("user")).id);
    let media_id = 5; // 1 is for movies
    let item_id = parseInt(props.match.params.id);
    axios
      .post(`/api/favorites`, { item_id, user_id, media_id })
      .then((results) => {
        console.log(results);
        setActor({ ...actor, userState: results.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let buttons = [
    { name: "Popular For", function: () => changeSort("popularity.desc") },
    {
      name: "Filmography",
      function: () => changeSort("primary_release_date.desc"),
    },
  ];
  let DiscoverActor = actor.knownFor.map((element, index) => {
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
  let actorImages = actor.images.map((element, index) => {
    let actorImageOriginal = `https://image.tmdb.org/t/p/original/${element.file_path}`;
    let actorImageDisplay = `https://image.tmdb.org/t/p/w185/${element.file_path}`;
    return (
      <PictureModal
        key={index}
        imageOriginal={actorImageOriginal}
        imageDisplay={actorImageDisplay}
        portrait={true}
        width="185px"
      />
    );
  });

  let taggedImages = actor.taggedImages.map((element, index) => {
    let actorImageOriginal = `https://image.tmdb.org/t/p/original/${element.file_path}`;
    let actorImageDisplay = `https://image.tmdb.org/t/p/w185/${element.file_path}`;
    return (
      <PictureModal
        key={index}
        imageOriginal={actorImageOriginal}
        imageDisplay={actorImageDisplay}
        portrait={true}
        width="185px"
      />
    );
  });

  return (
    <div>
      {actor.person && (
        <>
          <ActorProfile
            profilePic={`https://image.tmdb.org/t/p/original/${actor.person.profile_path}`}
            name={actor.person.name}
            bio={actor.person.biography}
            place_of_birth={actor.person.place_of_birth}
            birthday={actor.person.birthday}
            deathday={actor.person.deathday}
            liked={actor.userState.userLiked}
            handleLike={handleLike}
          />
          <ScrollDiv
            buttons={buttons}
            title=""
            cards={DiscoverActor}
            handleScroll={() => {}}
            page={actor.page}
            total_pages={actor.total_pages}
            addPage={addPage}
          />
          <ScrollDiv
            title="Profiles"
            cards={actorImages}
            handleScroll={() => {}}
            page={0}
            total_pages={0}
            addPage={() => {}}
          />
          <ScrollDiv
            title="Tagged Images"
            cards={taggedImages}
            handleScroll={() => {}}
            page={0}
            total_pages={0}
            addPage={() => {}}
          />
        </>
      )}
    </div>
  );
}
