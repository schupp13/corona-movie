import React, { useState, useEffect } from "react";
import axios from "axios";
import MoviePoster from "../../Features/MoviePoster/MoviePoster";
import Pagination from "../../Features/Pagination/Pagination";
import SearchKeywords from "../../Features/SearchKeywords/SearchKeywords";
import SelectMultipleGenre from "../../Features/SelectMultipleGenre/SelectMultipleGenre";
import "./TVSearchPage.scss";
// import SelectMultipleCertifications from "../../Features/SelectMultipleCertifications/SelectMultipleCertifications";
import SelectMultipleSortBy from "../../Features/SelectMultipleSortBy/SelectMultipleSortBy";


export default function TVSearchPage() {
  let [results, setResults] = useState([]);
  let [genres, setGenres] = useState([]);
  let [selectedGenres, setSelectedGenres] = useState([]);
  // let [selectedCertifications, setSelectedCertifications] = useState([]);
  let [page, setPage] = useState([]);
  let [totalPages, setTotalPages] = useState([]);
  let [keywords, setKeywords] = useState([]);

  let [sortby, setSortby] = useState("popularity.desc");

  useEffect(() => {
    getPopular();
  }, [sortby, selectedGenres, keywords, page]);

  const getPopular = () => {
    let genresReady = selectedGenres ? selectedGenres.join("|") : "";
    // let certsReady = selectedCertifications
    //   ? selectedCertifications.join("|")
    //   : "";

    let keywordsReady = keywords ? keywords.join("|") : "";

    axios
      .get(`https://api.themoviedb.org/3/discover/tv`, {
        params: {
          api_key: "12aa3499b6032630961640574aa332a9",
          language: "en",
          // certification_country: "US",
          // certification: certsReady,
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

  const handleSortby = (value) => {
    console.log(value);
    setSortby(value);
    setPage(1);
  };
  // const handleCertificationChange = (value) => {
  //   console.log([value]);
  //   setPage(1);
  //   setSelectedCertifications(value);
  // };
  const handleKeywords = (event, values) => {
    let keywordsReady = values.map((element) => {
      return element.id;
    });
    setKeywords(keywordsReady);
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
        <SelectMultipleGenre
          selectedOptions={selectedGenres}
          handleChange={handleGenreChange}
          title="Genre"
          type="tv"
        ></SelectMultipleGenre>
        {/* <SelectMultipleCertifications
          selectedOptions={selectedCertifications}
          handleChange={handleCertificationChange}
          title="Certifications"
          type="tv"
        ></SelectMultipleCertifications> */}
        <SelectMultipleSortBy
          selectedOptions={sortby}
          handleChange={handleSortby}
          title="Sort By"
          type="tv"
        ></SelectMultipleSortBy>
        <SearchKeywords handleClick={handleKeywords}></SearchKeywords>
      </div>
      <div className="movie-results">{tvResults}</div>
      <Pagination
        // page={page} 
        // count={totalPages} 
        // setPage={paginate} 
        page={parseInt(page)}
        count={parseInt(totalPages)}
        setPage={paginate} />
    </div>
  )
}