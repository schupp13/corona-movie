import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

export default function SelectMultipleCertifications(props) {
  const [certs, setCerts] = useState([]);
  const [selectedCerts, setSelectedCerts] = useState([]);

  useEffect(() => {
    getCertifications();
  }, []);
  const getCertifications = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/certification/${props.type}/list?api_key=12aa3499b6032630961640574aa332a9
          `
      )
      .then((results) => {
        setCerts(results.data.certifications.US);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function getStyles(option, selectedOptions, theme) {
    return {
      fontWeight:
        selectedOptions.indexOf(option.id) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (e) => {
    props.handleChange(e.target.value);
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
  const theme = useTheme();
  const classes = useStyles();
  let certsJsx = certs.map((option) => {
    return (
      <MenuItem
        key={option.certification}
        value={option.certification}
        style={getStyles(option, selectedCerts, theme)}
      >
        {option.certification}
      </MenuItem>
    );
  });
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
          renderValue={(selectedCerts) => (
            <div className={classes.chips}>
              {selectedCerts.map((cert) => (
                <Chip key={cert} label={cert} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {certsJsx}
        </Select>
      </FormControl>
    </>
  );
}
