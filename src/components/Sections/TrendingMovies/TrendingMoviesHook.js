import React, { useEffect, useState } from "react";
import MovieCard from "../../Cards/MovieCard/MovieCard";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";
import axios from "axios";

export default function TrendingMoviesHook(props) {
  let [results, setResults] = useState([]);
  let [header, setHeader] = useState("Today");
  let [page, setPage] = useState(1);
  let [totalPages, setTotalPages] = useState(0);
  let [when, setWhen] = useState("day");

  useEffect(() => {
    getTrendingMovies(when, page);
  }, []);

  const addPage = () => {
    getTrendingMovies(when, page + 1);
  };

  const getTrendingMovies = (when = "day", page = "1") => {
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
        let data =
          page > 1
            ? [...results, ...result.data.results]
            : [...result.data.results];

        console.log(data);
        setResults(data);

        setWhen(when);
        setHeader(header);
        setTotalPages(result.data.total_pages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let movies = results.map((movie, index) => {
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
        buttons={buttons}
        title={`Movies - Trending ${header}`}
        cards={movies}
        handleScroll={() => {}}
        page={page}
        total_pages={totalPages}
        addPage={addPage}
      ></ScrollDiv>
    </div>
  );
}
