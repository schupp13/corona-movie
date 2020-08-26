import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

export default function SelectMultipleSortBy(props) {
  //create ternary to determine movie or tv
  const movieOptions = [
    { name: "Popularity Asc", type: "popularity.acs" },
    { name: "Popularity Desc", type: "popularity.desc" },
    { name: "Release Date Asc", type: "release_date.acs" },
    { name: "Release Date Desc", type: "release_date.desc" },
    { name: "Revenue Asc", type: "revenue.asc" },
    { name: "Revenue Desc", type: "revenue.desc" },
    { name: "Primary Release Date Asc", type: "primary_release_date.acs" },
    { name: "Primary Release Date Desc", type: "primary_release_date.desc" },
    { name: "Original Title Asc", type: "original_title.acs" },
    { name: "Original Title Desc", type: "original_title.desc" },
    { name: "Vote Avg Asc", type: "vote_average.acs" },
    { name: "Vote Avg Desc", type: "vote_average.desc" },
    { name: "Vote Count Asc", type: "vote_count.acs" },
    { name: "Vote Count Desc", type: "vote_count.desc" },
  ];

  const tvOptions = [
    { name: "Popularity Asc", type: "popularity.acs" },
    { name: "Popularity Desc", type: "popularity.desc" },
    { name: "Vote Avg Asc", type: "vote_average.acs" },
    { name: "Vote Avg Desc", type: "vote_average.desc" },
    { name: "First Air Date Desc", type: "first_air_date.desc" },
    { name: "First Air Date Asc", type: "first_air_date.asc" }
  ];

  const options = props.type === "tv" ? tvOptions : movieOptions;

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width: 250,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const classes = useStyles();
  function getStyles(option, selectedOptions, theme) {
    return {
      fontWeight:
        selectedOptions.indexOf(option.id) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const theme = useTheme();

  const handleChange = (e) => {
    props.handleChange(e.target.value);
  };

  return (
    <>
      <FormControl className={classes.margin}>
        <InputLabel id="demo-customized-select-label">Sort By</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={props.selectedOptions}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
        >
          {options.map((option) => (
            <MenuItem
              key={option.name}
              value={option.type}
              style={getStyles(option, props.selectedOptions, theme)}
            >
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
