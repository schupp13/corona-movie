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
import "./MoviePageHook.scss";
export default function MoviePageHook(props) {
  let [movie, setMovie] = useState({
    movie: {},
    videos: [],
    userState: {},
    cast: [],
    crew: [],
    reviews: [],
    backdrops: [],
    posters: [],
    companies: [],
    backdrop_path: "",
  });

  let [loading, setLoading] = useState(false);
  let [fail, setFail] = useState(false);

  useEffect(() => {
    setLoading(false);
    getMoviePage();
  }, [props.match.params.id]);

  const getMoviePage = () => {
    let movie_id = props.match.params.id;
    let item_id = parseInt(props.match.params.id);
    let user_id = parseInt(JSON.parse(localStorage.getItem("user")).id);
    let media_id = 1; // 1 is for movies

    const movieDB = axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}`,
      {
        params: {
          api_key: `12aa3499b6032630961640574aa332a9`,
          append_to_response: `credits,images,videos,reviews,similar`,
        },
      }
    );
    const getUserState = axios.post(`/api/user/state`, {
      user_id,
      item_id,
      media_id,
    });

    Promise.all([movieDB, getUserState])
      .then((results) => {
        console.log(results[1].data);

        setMovie({
          movie: results[0].data,
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
    let media_id = 1; // 1 is for movies
    let item_id = parseInt(props.match.params.id);
    axios
      .post(`/api/favorites`, { item_id, user_id, media_id })
      .then((data) => {
        console.log(data);
        setMovie({
          ...movie,
          userState: {
            ...movie.userState,
            userLiked: data.data[0] ? true : false,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getTrailer = () => {
    return movie.videos.filter((movie, index) => {
      return movie.type === "Trailer";
    });
  };
  const getBackground = () => {
    return (
      movie.movie.backdrop_path &&
      `https://image.tmdb.org/t/p/original/${movie.movie.backdrop_path}`
    );
  };

  const handleWatchList = (e) => {
    console.log("hit");
    let user_id = parseInt(JSON.parse(localStorage.getItem("user")).id);
    let media_id = 1; // 1 is for movies
    let item_id = parseInt(props.match.params.id);
    axios
      .post(`/api/watchlist`, { item_id, user_id, media_id })
      .then((data) => {
        console.log(data);
        setMovie({
          ...movie,
          userState: {
            ...movie.userState,
            userWatchlist: data.data[0] ? true : false,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(movie);
  let Background =
    movie.backdrop_path &&
    `https://image.tmdb.org/t/p/original/${movie.movie.backdrop_path}`;

  return (
    <div>
      {loading && fail === false ? (
        <>
          <Banner
            background={getBackground()}
            title={movie.movie.title}
            tagline={movie.movie.tagline}
            search={false}
            liked={movie.userState.userLiked}
            type="movie"
            id={movie.id}
            handleLike={handleLike}
            watchList={movie.userState.userWatchlist}
            handleWatchList={handleWatchList}
            trailer={getTrailer()}
            userOptions={true}
          />
          <OverviewSection
            type="movie"
            title={movie.movie.title}
            poster_path={movie.movie.poster_path}
            vote_average={movie.movie.vote_average}
            release_date={movie.movie.release_date}
            homepage={movie.movie.homepage}
            genres={movie.genres}
            id={movie.movie.id}
            overview={movie.movie.overview}
            companies={movie.companies}
          ></OverviewSection>
          <div
            className="parallax"
            style={{ backgroundImage: `url(${getBackground()})` }}
          >
            <ActorSection actors={movie.cast} title="Cast" />
          </div>
          <ActorSection actors={movie.crew} title="Crew" />
          <div
            className="parallax"
            style={{ backgroundImage: `url(${getBackground()})` }}
          >
            <ReviewSection id={movie.movie.id} type="movie" />
          </div>
          <BackdropSection images={movie.backdrops} />
          <PosterSection images={movie.posters} />
          <div
            className="parallax"
            style={{ backgroundImage: `url(${getBackground()})` }}
          >
            <VideoSection videos={movie.videos} />
          </div>
          <SimilarSection id={movie.movie.id} type="movie" />
        </>
      ) : !loading && fail === false ? (
        <Progress />
      ) : (
        <ErrorPage />
      )}
    </div>
  );
}
