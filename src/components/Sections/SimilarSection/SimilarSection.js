import React, { useState, useEffect } from "react";
import MovieCard from "../../Cards/MovieCard/MovieCard";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";
import axios from "axios";

export default function SimilarSection(props) {
  useEffect(() => {
    moreSimilar();
  }, []);
  let [similar, setSimilar] = useState([]);
  let [page, setPage] = useState(1);
  let [totalPages, setTotalPages] = useState(0);

  const addSimilarPage = () => {
    moreSimilar(page + 1);
  };
  const moreSimilar = (page = 1) => {
    let type =
      props.type === "movies"
        ? "movie"
        : props.type === "tv"
        ? "tvshows"
        : "episodes";
    axios
      .get(
        `https://api.themoviedb.org/3/${props.type}/${props.id}/similar?api_key=12aa3499b6032630961640574aa332a9&language=en-US&page=${page}`
      )
      .then((results) => {
        console.log(results.data.results);
        setSimilar([...similar, ...results.data.results]);
        setPage(results.data.page);
        setTotalPages(results.data.total_pages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let similarJSX = similar.map((movie, index) => {
    return (
      <MovieCard
        message={`#${index + 1} similar`}
        movie={movie}
        key={index}
        id={movie.id}
        title={movie.title}
        overview={movie.overview}
        voteAverage={movie.vote_average}
        backdropPath={movie.backdrop_path}
        type={
          props.type === "movie"
            ? "movies"
            : props.type === "tv"
            ? "tvshows"
            : "episodes"
        }
      />
    );
  });
  return (
    <ScrollDiv
      title="Similar"
      cards={similarJSX}
      handleScroll={() => {}}
      page={page}
      total_pages={totalPages}
      addPage={addSimilarPage}
    ></ScrollDiv>
  );
}
