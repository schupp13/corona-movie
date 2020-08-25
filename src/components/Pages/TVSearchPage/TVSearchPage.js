import React, { useState, useEffect } from "react";
import axios from "axios";
import MoviePoster from "../../Features/MoviePoster/MoviePoster";
import Pagination from "../../Features/Pagination/Pagination";
import "./TVSearchPage.scss";
import SelectTVMultipleGenre from "../../Features/SelectTVMultipleGenre/SelectTVMultipleGenre";

export default function TVSearchPage() {
  let [results, setResults] = useState([]);
  let [genres, setGenres] = useState([]);
  let [selectedGenres, setSelectedGenres] = useState([]);
  let [selectedCertifications, setSelectedCertifications] = useState([]);
  let [page, setPage] = useState([]);
  let [totalPages, setTotalPages] = useState([]);
  let [keywords, setKeywords] = useState([]);

  let [sortby, setSortby] = useState("popularity.desc");

  useEffect(() => {
   getPopular();
  }, [sortby, selectedGenres, selectedCertifications, keywords, page]);

  const getPopular = () => {
    let genresReady = selectedGenres ? selectedGenres.join("|") : "";
    let certsReady = selectedCertifications
      ? selectedCertifications.join("|")
      : "";

    let keywordsReady = keywords ? keywords.join("|") : "";

    axios
      .get(`https://api.themoviedb.org/3/discover/tv`, {
        params: {
          api_key: "12aa3499b6032630961640574aa332a9",
          language: "en",
          certification_country: "US",
          certification: certsReady,
          page: page,
          with_genres: genresReady,
          with_keywords: keywordsReady,
          sort_by: sortby,
        },
      })
      .then((results) => {
        console.log(results);
        setResults(results.data.results);
        setPage(results.data.page);
        setTotalPages(results.data.total_pages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const paginate = (e, value) => {
    setPage(value);
  };

  const handleGenreChange = (value) => {
    console.log(value);
    setSelectedGenres(value);
    setPage(1);
  };

  let tvResults = results.map((element, index) => {
    return (
      <MoviePoster
        key={index}
        title={element.name}
        poster={element.poster_path}
        rating={element.vote_average}
        releaseDate={element.release_date}
        id={element.id}
        type="tvshows"
      />
    );
  });

  return (
    <div className="movie-page">
      <div className="search-options">
        <SelectTVMultipleGenre
          selectedOptions={selectedGenres}
          handleChange={handleGenreChange}
          title="Genre"
        ></SelectTVMultipleGenre>
      </div>
      <div className="movie-results">{tvResults}</div>
      <Pagination page={page} count={totalPages} setPage={paginate} />
    </div>
  );
=======

import Pagination from "../../Features/Pagination/Pagination";
import "./TVSearchPage.scss";

export default function TVSearchPage() {
 
>>>>>>> Stashed changes
}
