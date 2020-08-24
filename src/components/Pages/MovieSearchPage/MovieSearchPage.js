import React, { useState, useEffect } from "react";
import axios from "axios";
import MoviePoster from "../../Features/MoviePoster/MoviePoster";
import SearchKeywords from "../../Features/SearchKeywords/SearchKeywords";
import SelectMultipleGenre from "../../Features/SelectMultipleGenre/SelectMultipleGenre";
import SelectMultipleCertifications from "../../Features/SelectMultipleCertifications/SelectMultipleCertifications";
import Pagination from "../../Features/Pagination/Pagination";
import "./MovieSearchPage.scss";

export default function MovieSearchPage() {
  let [results, setResults] = useState([]);
  let [genres, setGenres] = useState([]);
  let [selectedGenres, setSelectedGenres] = useState([]);
  let [page, setPage] = useState([]);
  let [totalPages, setTotalPages] = useState([]);
  let [keywords, setKeywords] = useState([]);

  let [selectedCertifications, setSelectedCertifications] = useState([]);

  useEffect(() => {
    getPopular();
  }, [selectedGenres, selectedCertifications, keywords, page]);

  const getPopular = () => {
    let genresReady = selectedGenres ? selectedGenres.join("|") : "";
    let certsReady = selectedCertifications
      ? selectedCertifications.join("|")
      : "";

    let keywordsReady = keywords ? keywords.join("|") : "";

    axios
      .get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: "12aa3499b6032630961640574aa332a9",
          language: "en",
          certification_country: "US",
          certification: certsReady,
          sort_by: "popularity.desc",
          page: 1,
          with_genres: genresReady,
          with_keywords: keywordsReady,
        },
      })
      .then((results) => {
        console.log(results);
        setResults(results.data.results);
        setPage(results.data.page);
        setTotalPages(results.data.total_pages);
        console.log(page + totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGenreChange = (value) => {
    console.log(value);
    setSelectedGenres(value);
    console.log(selectedGenres);
  };
  const handleCertificationChange = (value) => {
    console.log(value);
    setSelectedCertifications(value);
  };
  const handleKeywords = (event, values) => {
    console.log(values);
    console.log(keywords);
    let keywordsReady = values.map((element) => {
      return element.id;
    });
    setKeywords(keywordsReady);
  };

  const paginate = () => {
    setPage(page + 1);
  };
  let movieResults = results.map((element, index) => {
    return (
      <MoviePoster
        key={index}
        title={element.title}
        poster={element.poster_path}
        rating={element.vote_average}
        releaseDate={element.release_date}
        id={element.id}
      />
    );
  });

  return (
    <div className="movie-page">
      <div className="search-options">
        <SelectMultipleGenre
          selectedOptions={selectedGenres}
          handleChange={handleGenreChange}
          title="Genre"
        ></SelectMultipleGenre>
        <SelectMultipleCertifications
          selectedOptions={selectedCertifications}
          handleChange={handleCertificationChange}
          title="Certification"
        ></SelectMultipleCertifications>
        <SearchKeywords handleClick={handleKeywords}></SearchKeywords>
      </div>
      <div className="movie-results">
        {movieResults}

        <Pagination
          page={page}
          count={totalPages}
          setPage={() => setPage(page + 1)}
        />
      </div>
    </div>
  );
}
