import React, { useEffect, useState, useRef } from "react";
import MovieCard from "../../Cards/MovieCard/MovieCard";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";
import { useWindowDimensions } from "../../Features/WindowHook/getWindowDimensions";
import ScrollDivMobile from "../../Features/ScrollDivMobile/ScrollDivMobile";
import axios from "axios";

export default function TrendingMoviesHook(props) {
  const { height, width, mobileSize } = useWindowDimensions();
  const mountedRef = useRef(true);
  let [results, setResults] = useState({
    movies: [],
    page: 1,
    totalPages: 0,
    when: "day",
    header: "Today",
  });

  useEffect(() => {
    getTrendingMovies(results.when, results.page);
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const addPage = () => {
    getTrendingMovies(results.when, results.page + 1);
  };

  const getTrendingMovies = (when = "day", page = "1") => {
    console.log(when);
    let header =
      when === "day"
        ? "Today"
        : when === "week"
        ? "This Week"
        : when === "now_playing"
        ? "In Theaters"
        : "";
    let trending = when === "day" || when === "week" ? "trending/" : "";
    axios
      .get(`https://api.themoviedb.org/3/${trending}movie/${when}`, {
        params: {
          api_key: "12aa3499b6032630961640574aa332a9",
          language: "en-US",
          page: page,
        },
      })
      .then((result) => {
        if (!mountedRef.current) return null;
        let resultData =
          page > 1
            ? [...results.movies, ...result.data.results]
            : [...result.data.results];

        setResults({
          movies: resultData,
          page: result.data.page,
          totalPages: result.data.total_pages,
          when,
          header,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let movies = results.movies.map((movie, index) => {
    return (
      <MovieCard
        movie={movie}
        key={index}
        id={movie.id}
        title={movie.title}
        overview={movie.overview}
        voteAverage={movie.vote_average}
        backdropPath={movie.backdrop_path}
        message={`#${index + 1} on Trending`}
        type="movies"
      />
    );
  });

  let buttons = [
    { name: "Today", function: () => getTrendingMovies("day") },
    { name: "Week", function: () => getTrendingMovies("week") },
    {
      name: "In Theaters",
      function: () => getTrendingMovies("now_playing"),
    },
  ];

  return (
    <div className="trending">
      <ScrollDiv
        title="Movies"
        buttons={buttons}
        cards={movies}
        handleScroll={() => {}}
        page={results.page}
        total_pages={results.totalPages}
        addPage={addPage}
      ></ScrollDiv>
    </div>
  );
}
