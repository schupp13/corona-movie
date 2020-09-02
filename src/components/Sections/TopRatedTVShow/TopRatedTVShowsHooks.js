import React, { useState, useEffect, useRef } from "react";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";
import MovieCard from "../../Cards/MovieCard/MovieCard";

import axios from "axios";

export default function TopRatedTVShowsHooks(props) {
  const mountedRef = useRef(true);
  const { height, width } = useWindowDimensions();

  let [results, setResults] = useState({
    tvshows: [],
    page: 1,
    totalPages: 0,
    type: "top_rated",
  });

  useEffect(() => {
    getTVShows(results.type, results.page);
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const changeType = (type) => {
    getTVShows(type);
  };

  const getTVShows = (type, page = 1) => {
    axios
      .get(`https://api.themoviedb.org/3/tv/${type}`, {
        params: {
          api_key: "12aa3499b6032630961640574aa332a9",
          language: "en-US",
          page: page,
        },
      })
      .then((result) => {
        if (!mountedRef.current) return null;

        let data =
          page > 1
            ? [...results.tvshows, ...result.data.results]
            : [...result.data.results];

        setResults({
          tvshows: data,
          page: result.data.page,
          totalPages: result.data.total_pages,
          type,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addPage = () => {
    getTVShows(results.type, results.page + 1);
  };

  const createMessage = (type) => {
    return type === "top_rated"
      ? "Top Rated"
      : type === "popular"
      ? "Most Popular"
      : type === "on_the_air"
      ? "On Air"
      : "Playing Today";
  };

  const handleScroll = () => {};

  let buttons = [
    { name: "Top Rated", function: () => changeType("top_rated") },
    { name: "Most Popular", function: () => changeType("popular") },
    { name: "On Air", function: () => changeType("on_the_air") },
    { name: "On Air Today", function: () => changeType("airing_today") },
  ];
  let message = createMessage(results.type);

  // let { page, total_pages, type } = state;
  let tvshows = results.tvshows.map((tvshow, index) => {
    return (
      <MovieCard
        message={`#${index + 1} ${message}`}
        tvshow={tvshow}
        key={index}
        id={tvshow.id}
        title={tvshow.name}
        overview={tvshow.overview}
        voteAverage={tvshow.vote_average}
        backdropPath={tvshow.backdrop_path}
        type="tvshows"
      />
    );
  });

  return (
    <div className="trending">
      <ScrollDiv
        buttons={buttons}
        title={`TV - ${message}`}
        cards={tvshows}
        handleScroll={handleScroll}
        page={results.page}
        total_pages={results.totalPages}
        addPage={addPage}
      ></ScrollDiv>
    </div>
  );
}
