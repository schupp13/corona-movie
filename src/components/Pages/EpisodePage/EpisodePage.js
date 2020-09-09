import React, { useState, useEffect } from "react";
import ActorCard from "../../Cards/ActorCard/ActorCard";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";
import PictureModal from "../../Features/PictureModal/PictureModal";
import MovieVideo from "../../Features/MovieVideo/MovieVideo";
import Banner from "../../Features/Banner/Banner";
import OverviewSection from "../../Sections/OverviewSection/OverviewSection";
import axios from "axios";

export default function EpisodePage(props) {
  useEffect(() => {
    getEpisode();
    checkUserState();
  }, []);

  const [episode, setEpisode] = useState({});
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [guest, setGuest] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const [userWatchList, setUserWatchList] = useState(false);
  const [userLiked, setUserLiked] = useState(false);
  const getEpisode = () => {
    const { id, seasonid, episodeid } = props.match.params;
    console.log(
      id + " id," + seasonid + " season id," + episodeid + " episode id"
    );

    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonid}/episode/${episodeid}`,
        {
          params: {
            api_key: "12aa3499b6032630961640574aa332a9",
            language: "en",
            append_to_response: "images,videos,credits",
          },
        }
      )
      .then((results) => {
        console.log(results);
        setEpisode(results.data);
        setVideos(results.data.videos.results);
        setImages(results.data.images.stills);
        setCast(results.data.credits.cast);
        setCrew(results.data.credits.crew);
        setGuest(results.data.credits.guest_stars);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkUserState = () => {
    let item_id = parseInt(props.match.params.episodeid);
    let user_id = parseInt(JSON.parse(localStorage.getItem("user")).id);
    let media_id = 3; // 3 is for episodes
    axios
      .post(`/api/user/state`, { user_id, item_id, media_id })
      .then((result) => {
        console.log(result);
        if (result.data.length > 0) {
          result.data.map((feat) => {
            if (feat["?column?"] === "userWatchlist") {
              setUserWatchList(true);
            } else if (feat["?column?"] === "userLiked") {
              setUserLiked(true);
            }
          });
        } else {
          setUserLiked(false);
          setUserWatchList(false);
        }
      })
      .catch((error) => {
        setUserLiked(false);
        setUserWatchList(false);
      });
  };

  const handleLike = (e) => {
    let user_id = parseInt(JSON.parse(localStorage.getItem("user")).id);
    let media_id = 3; // 3 is for episodes
    let item_id = parseInt(props.match.params.episodeid);
    axios
      .post(`/api/favorites`, { item_id, user_id, media_id })
      .then((data) => {
        setUserLiked(data.data[0] ? true : false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleWatchList = (e) => {
    let user_id = parseInt(JSON.parse(localStorage.getItem("user")).id);
    let media_id = 3; // 3 is for episodes
    let item_id = parseInt(props.match.params.episodeid);
    axios
      .post(`/api/watchlist`, { item_id, user_id, media_id })
      .then((data) => {
        console.log(data);
        setUserWatchList(data.data[0] ? true : false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let stills = images.map((element, index) => {
    let imageDisplay = `https://image.tmdb.org/t/p/w300/${element.file_path}`;
    let imageOriginal = `https://image.tmdb.org/t/p/original/${element.file_path}`;
    return (
      <PictureModal
        key={index}
        imageDisplay={imageDisplay}
        imageOriginal={imageOriginal}
        portrait={false}
        width={"300px"}
      />
    );
  });

  let actorsjsx = cast.map((actor, index) => {
    return <ActorCard actor={actor} key={index} />;
  });
  let crewjsx = crew.map((crew, index) => {
    return <ActorCard actor={crew} key={index} />;
  });
  let guestjsx = guest.map((crew, index) => {
    return <ActorCard actor={crew} key={index} />;
  });
  let videosjsx = videos.map((video, index) => {
    return <MovieVideo movie={video} key={index} />;
  });
  const ShowBackground = `https://image.tmdb.org/t/p/original/${episode.still_path}`;

  return (
    <div>
      <Banner
        background={ShowBackground}
        title={episode.name}
        tagline={episode.overview + " " + episode.air_date}
        search={false}
        trailer={videos}
        liked={userLiked}
        handleLike={handleLike}
        watchList={userWatchList}
        handleWatchList={handleWatchList}
      />

      <ScrollDiv
        title="Special Guest"
        cards={guestjsx}
        handleScroll={() => {}}
        page={0}
        total_pages={0}
        addPage={() => {}}
      ></ScrollDiv>
      <div
        className="parallax"
        style={{ backgroundImage: `url(${ShowBackground})` }}
      >
        <ScrollDiv
          title="Cast"
          cards={actorsjsx}
          handleScroll={() => {}}
          page={0}
          total_pages={0}
          addPage={() => {}}
        ></ScrollDiv>
      </div>
      <ScrollDiv
        title="Crew"
        cards={crewjsx}
        handleScroll={() => {}}
        page={0}
        total_pages={0}
        addPage={() => {}}
      ></ScrollDiv>
      <div
        className="parallax"
        style={{ backgroundImage: `url(${ShowBackground})` }}
      >
        <ScrollDiv
          title="Stills From Episode"
          cards={stills}
          handleScroll={() => {}}
          page={0}
          total_pages={0}
          addPage={() => {}}
        ></ScrollDiv>
      </div>
      <ScrollDiv
        title="TV Show Trailers"
        cards={videosjsx}
        handleScroll={() => {}}
        page={0}
        total_pages={0}
        addPage={() => {}}
      ></ScrollDiv>
    </div>
  );
}
