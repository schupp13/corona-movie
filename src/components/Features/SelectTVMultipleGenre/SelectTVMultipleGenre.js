import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

export default function SelectTVMultipleGenre(props) {
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
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    getGenres();
  }, []);

  const getGenres = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=12aa3499b6032630961640574aa332a9&language=en-US`
      )
      .then((results) => {
        setGenres(results.data.genres);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
      <FormControl className={classes.formControl}>
        <InputLabel>{props.title}</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={props.selectedOptions}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selectedOptions) => (
            <div className={classes.chips}>
              {selectedOptions.map((value) =>
                genres.map((value2) => {
                  return (
                    value === value2.id && (
                      <Chip
                        key={value}
                        label={value2.name}
                        className={classes.chip}
                      />
                    )
                  );
                })
              )}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {genres.map((genre) => (
            <MenuItem
              key={genre.name}
              value={genre.id}
              style={getStyles(genre, props.selectedOptions, theme)}
            >
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}