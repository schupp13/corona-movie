import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../../Cards/MovieCard/MovieCard";
import SeasonsCard from "../../Cards/SeasonsCard/SeasonsCard";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";
import Banner from "../../Features/Banner/Banner";
import OverviewSection from "../../Sections/OverviewSection/OverviewSection";
import "./SeasonPage.scss";

export default function SeasonPage(props) {
  const [season, setSeason] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [show, setShow] = useState({});
  const [otherSeasons, setOtherSeasons] = useState([]);
  const [videos, setVideos] = useState([]);
  const [userWatchList, setUserWatchList] = useState(false);
  const [userLiked, setUserLiked] = useState(false);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getShow();
    getSeasons();
    checkUserState();
  }, [props.match.params]);

  const getShow = () => {
    const { id } = props.match.params;
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=12aa3499b6032630961640574aa332a9&append_to_response=credits,images,videos,reviews,similar`
      )
      .then((results) => {
        console.log(results);
        setShow(results.data);
        setOtherSeasons(results.data.seasons);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSeasons = () => {
    const { id, seasonid } = props.match.params;
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonid}?api_key=12aa3499b6032630961640574aa332a9&language=en-US&append_to_response=credits,images,videos`
      )
      .then((results) => {
        console.log(results);
        setSeason(results.data);
        setEpisodes(results.data.episodes);
        setVideos(results.data.videos.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const checkUserState = () => {
    let item_id = parseInt(props.match.params.seasonid);
    let user_id = parseInt(JSON.parse(localStorage.getItem("user")).id);
    let media_id = 4; // 4 is for seasons
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
    let media_id = 4; // 4 is for seasons
    let item_id = parseInt(props.match.params.seasonid);
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
    let media_id = 4; // 3 is for episodes
    let item_id = parseInt(props.match.params.seasonid);
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

  const handleError = (e) => {
    console.log(e);
    e.target.src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png";
  };

  let episodesjsx = episodes.map((ep, i) => {
    return (
      <MovieCard
        movie={ep}
        message={"Episode " + ep.episode_number}
        key={i}
        id={ep.id}
        title={ep.name}
        overview={ep.overview}
        voteAverage={ep.vote_average}
        backdropPath={ep.still_path}
        episodeLink={`/tvshows/${show.id}/seasons/${season.season_number}/episodes/${ep.episode_number}`}
        type="episode"
      />
    );
  });

  let seasonsjsx = otherSeasons.map((season, index) => {
    return <SeasonsCard season={season} tvshowID={show.id} key={index} />;
  });
  // let trailer = videos.map((movie, index) => {
  //   return movie.type === "Trailer";
  // });

  const ShowBackground = `https://image.tmdb.org/t/p/original/${show.backdrop_path}`;
  const SeasonBackground = `https://image.tmdb.org/t/p/original/${season.poster_path}`;

  let Background = SeasonBackground ? SeasonBackground : ShowBackground;
  return (
    <>
      <Banner
        background={SeasonBackground}
        title={show.name + " " + season.name}
        tagline={season.overview + " " + season.air_date}
        search={false}
        companies={show.networks}
        trailer={videos}
        type={season}
        liked={userLiked}
        handleLike={handleLike}
        watchList={userWatchList}
        handleWatchList={handleWatchList}
      />
      {/* <OverviewSection
        type="tv"
        title={season.name}
        poster_path={season.poster_path}
        vote_average={show.vote_average}
        release_date={season.air_date}
        homepage={""}
        genres={[]}
        id={show.id}
        overview={season.overview}
        status={""}
      ></OverviewSection> */}
      <ScrollDiv
        title={`${season.name} Episodes`}
        cards={episodesjsx}
        handleScroll={() => {}}
        page={0}
        total_pages={0}
        addPage={() => {}}
      ></ScrollDiv>
      <ScrollDiv
        title={`Other Seasons`}
        cards={seasonsjsx}
        handleScroll={() => {}}
        page={0}
        total_pages={0}
        addPage={() => {}}
      ></ScrollDiv>
    </>
  );
}
