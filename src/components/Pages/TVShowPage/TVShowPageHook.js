import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../../Features/Banner/Banner";
import Progress from "../../Features/Porgress/Progress";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import ActorSection from "../../Sections/ActorSection/ActorSection";
import ReviewSection from "../../Sections/ReviewSection/ReviewSection";
import OverviewSection from "../../Sections/OverviewSection/OverviewSection";
import BackdropSection from "../../Sections/BackdropSection/BackdropSection";
import PosterSection from "../../Sections/PosterSection/PosterSection";
import VideoSection from "../../Sections/VideoSection/VideoSection";
import SimilarSection from "../../Sections/SimilarSection/SimilarSection";
import SeasonSection from "../../Sections/SeasonSection/SeasonSection";

export default function TVShowPageHook(props) {
  useEffect(() => {
    setLoading(false);
    getTVPage();
  }, [props.match.params.id]);
  let [TVShow, setTVShow] = useState({
    TVShow: {},
    videos: [],
    userState: {},
    cast: [],
    crew: [],
    reviews: [],
    backdrops: [],
    posters: [],
    companies: [],
    seasons: [],
    backdrop_path: "",
  });

  let [loading, setLoading] = useState(false);
  let [fail, setFail] = useState(false);

  const getTVPage = () => {
    let movie_id = props.match.params.id;
    let item_id = parseInt(props.match.params.id);
    let user_id = parseInt(JSON.parse(localStorage.getItem("user")).id);
    let media_id = 2; // 1 is for tvshow

    const movieDB = axios.get(`https://api.themoviedb.org/3/tv/${movie_id}`, {
      params: {
        api_key: `12aa3499b6032630961640574aa332a9`,
        append_to_response: `credits,images,videos,reviews,similar`,
      },
    });
    const getUserState = axios.post(`/api/user/state`, {
      user_id,
      item_id,
      media_id,
    });

    Promise.all([movieDB, getUserState])
      .then((results) => {
        console.log(results[1].data);

        setTVShow({
          TVShow: results[0].data,
          videos: results[0].data.videos.results,
          userState: results[1].data,
          cast: results[0].data.credits.cast,
          crew: results[0].data.credits.crew,
          reviews: results[0].data.reviews.results,
          genres: results[0].data.genres,
          backdrops: results[0].data.images.backdrops,
          posters: results[0].data.images.posters,
          companies: results[0].data.production_companies,
          backdrop_path: results[0].data.backrop_path,
          seasons: results[0].data.seasons,
        });
        setLoading(true);
        windowScroll();
      })
      .catch((error) => {
        console.log(error);
        setFail(true);
      });
  };

  const windowScroll = () => {
    window.scroll({
      top: 0,
      behavior: "auto",
    });
  };
  const handleLike = (e) => {
    let user_id = parseInt(JSON.parse(localStorage.getItem("user")).id);
    let media_id = 2; // 2 is for tv
    let item_id = parseInt(props.match.params.id);
    axios
      .post(`/api/favorites`, { item_id, user_id, media_id })
      .then((data) => {
        console.log(data);
        setTVShow({
          ...TVShow,
          userState: {
            ...TVShow.userState,
            userLiked: data.data[0] ? true : false,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getTrailer = () => {
    return TVShow.videos.filter((show, index) => {
      return show.type === "Trailer";
    });
  };
  const getBackground = () => {
    return (
      TVShow.TVShow.backdrop_path &&
      `https://image.tmdb.org/t/p/original/${TVShow.TVShow.backdrop_path}`
    );
  };

  const handleWatchList = (e) => {
    console.log("hit");
    let user_id = parseInt(JSON.parse(localStorage.getItem("user")).id);
    let media_id = 2; // 2 is for tvshow
    let item_id = parseInt(props.match.params.id);
    axios
      .post(`/api/watchlist`, { item_id, user_id, media_id })
      .then((data) => {
        console.log(data);
        setTVShow({
          ...TVShow,
          userState: {
            ...TVShow.userState,
            userWatchlist: data.data[0] ? true : false,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let Background =
    TVShow.backdrop_path &&
    `https://image.tmdb.org/t/p/original/${TVShow.TVShow.backdrop_path}`;
  console.log(TVShow);
  return (
    <div>
      {" "}
      {loading && fail === false ? (
        <>
          <Banner
            background={getBackground()}
            title={TVShow.TVShow.name}
            tagline={TVShow.TVShow.tagline}
            search={false}
            liked={TVShow.userState.userLiked}
            type="movie"
            id={TVShow.id}
            handleLike={handleLike}
            watchList={TVShow.userState.userWatchlist}
            handleWatchList={handleWatchList}
            trailer={getTrailer()}
            userOptions={true}
          />
          <OverviewSection
            type="tvshow"
            title={TVShow.TVShow.name}
            poster_path={TVShow.TVShow.poster_path}
            vote_average={TVShow.TVShow.vote_average}
            release_date={TVShow.TVShow.release_date}
            homepage={TVShow.TVShow.homepage}
            genres={TVShow.genres}
            id={TVShow.TVShow.id}
            overview={TVShow.TVShow.overview}
            companies={TVShow.companies}
          ></OverviewSection>
          <div
            className="parallax"
            style={{ backgroundImage: `url(${getBackground()})` }}
          >
            sdf
            <ActorSection actors={TVShow.cast} title="Cast" />
          </div>
          <ActorSection actors={TVShow.crew} title="Crew" />
          <div
            className="parallax"
            style={{ backgroundImage: `url(${getBackground()})` }}
          >
            <ReviewSection id={TVShow.TVShow.id} type="tv" />
          </div>
          <BackdropSection images={TVShow.backdrops} />
          <SeasonSection seasons={TVShow.seasons} tvshow={TVShow.TVShow} />
          <PosterSection images={TVShow.posters} />
          <div
            className="parallax"
            style={{ backgroundImage: `url(${getBackground()})` }}
          >
            <VideoSection videos={TVShow.videos} />
          </div>
          <SimilarSection id={TVShow.TVShow.id} type="tv" />
        </>
      ) : !loading && fail === false ? (
        <Progress />
      ) : (
        <ErrorPage />
      )}
    </div>
  );
}
