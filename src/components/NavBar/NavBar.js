import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";

class Navbar extends Component {
  render() {
    return (
      <nav className="Navbar">
        <h1 className="Navbar-logo">KeepItReel</h1>
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
