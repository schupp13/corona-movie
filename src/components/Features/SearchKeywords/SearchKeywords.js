import React, { useState, useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

export default function SearchKeywords(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "90%",
      "& > * + *": {
        marginTop: theme.spacing(3),
      },
    },
  }));

  const [keywords, setKeywords] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getSearch();
  }, [search]);
  const getSearch = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/keyword?api_key=12aa3499b6032630961640574aa332a9&query=batman&page=1`,
        {
          params: {
            api_key: "12aa3499b6032630961640574aa332a9",
            query: search,
          },
        }
      )
      .then((results) => {
        console.log(results);
        setKeywords(results.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleKeywords = (e) => {
    setSearch(e.target.value);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="size-small-standard"
        size="small"
        options={keywords}
        getOptionLabel={(option) => option.name}
        filterSelectedOptions
        onChange={props.handleClick}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Keywords"
            placeholder="Keywords"
            onChange={(e) => handleKeywords(e)}
          />
        )}
      />
    </div>
  );
}
