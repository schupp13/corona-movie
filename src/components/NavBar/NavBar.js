import React, { Component } from "react";
import { Link } from "react-router-dom";
import LiveTvIcon from "@material-ui/icons/LiveTv";

import "./NavBar.scss";


class Navbar extends Component {
  render() {
    return (
      <nav className="Navbar">
        <div className="Navbar-logo">
          <h1>KeepItReel</h1>
          <LiveTvIcon className="tv-icon" />
        </div>
        <div className="Navbar-links">
          <ul>
            <Link to="/movies">
              <li>Movies</li>
            </Link>
            <Link to="/tvshows">
              <li>TV Shows</li>
            </Link>
            <Link to="/actors">
              <li>Actors</li>
            </Link>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
