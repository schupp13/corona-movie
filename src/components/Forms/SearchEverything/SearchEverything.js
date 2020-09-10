/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { findByLabelText } from "@testing-library/react";
import "./SearchEverything.scss";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchEverything(props) {
  let [results, setResults] = useState([]);
  let [search, setSearch] = useState("");

  const getSearch = (search) => {
    axios
      .get(`https://api.themoviedb.org/3/search/multi/`, {
        params: {
          api_key: "12aa3499b6032630961640574aa332a9",
          language: "en-US",
          query: search,
          include_adult: false,
        },
      })
      .then((results) => {
        console.log(results.data.results);
        setResults(results.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const history = useHistory();
  const submitForm = (e) => {
    history.push(`/search/${search}`);
  };

  const handleChange = (search) => {
    getSearch(search);
    setSearch(search);
  };

  return (
    <form
      onSubmit={submitForm}
      style={{
        maxWidth: "1200px",
      }}
    >
      <Autocomplete
        freeSolo
        id=""
        disableClearable
        options={results.map((option) => {
          //   let name = makeLink(option);
          let name = option.name ? option.name : option.title;
          return name;
        })}
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ backgroundColor: "white" }}
            label="Tv Show, Movie, Actors"
            margin="normal"
            variant="outlined"
            onSelect={(ev) => {
              if (ev.target.value !== "" || ev.target.value !== null) {
                handleChange(ev.target.value);
              }
            }}
            onChange={(ev) => {
              // dont fire API if the user delete or not entered anything
              if (ev.target.value !== "" || ev.target.value !== null) {
                handleChange(ev.target.value);
              }
            }}
            InputProps={{
              ...params.InputProps,
              //   type: "search",
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={submitForm}>
                    <SearchIcon className="search-icon" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </form>
  );

  function makeLink(option) {
    let link =
      option.media_type === "movie"
        ? `/movies/${option.id}`
        : option.media_type === "tv"
        ? `/tvshows/${option.id}`
        : option.media_type === "person"
        ? `/actors/${option.id}`
        : "";
    let name = (
      <Link to={link}>{option.name ? option.name : option.title}</Link>
    );
    return name;
  }
}
