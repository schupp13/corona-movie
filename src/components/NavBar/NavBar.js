import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const styles = {
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: "red",
  },
};

function NavBar(props) {
  const classes = props;
  return (
    <header class="Navbar">
      <div class="logo">{/* <Link to="/">KeepItReel</Link> */}</div>
      <div class="Navbar-links">
        <ul>
          <li>Movies</li>
          <li>TV Shows</li>
          <li>Actors</li>
        </ul>
      </div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    </header>
  );
}

export default withStyles(styles)(NavBar);
