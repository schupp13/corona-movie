import React, { Component } from "react";
import axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

// import "./MoviesByGenre.scss";

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

class MoviesByGenre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      header: "Today",
    };
  }

  componentDidMount() {
    this.getMoviesByGenre();
  }

  handleClick = (e) => {
    console.log(e.target);
  };

  handleChange = (event) => {
    // setAge(event.target.value);
  };

  getMoviesByGenre = (when = "day") => {
    let header = when === "day" ? "Today" : "This Week";

    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=12aa3499b6032630961640574aa332a9&language=en-US`
      )
      .then((result) => {
        console.log(result.data);
        this.setState({
          genres: result.data.genres,
          header: header,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;
    // const classes = this.useStyles();
    console.log(this.state);
    let menuItems = this.state.genres.map((menuItem, index) => {
      return <MenuItem value={menuItem.id}>{menuItem.name}</MenuItem>;
    });

    return (
      <div className="trending">
        <h2>Genre ({this.state.header})</h2>
        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            onChange={this.handleChange}
          >
            {menuItems}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MoviesByGenre);
