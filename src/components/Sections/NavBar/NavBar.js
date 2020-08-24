import React, { Component } from "react";
import { Link } from "react-router-dom";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import MultiSearch from "../../Forms/MultiSearch/MultiSearch";

import "./NavBar.scss";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "",
      liTransform: "",
      burger: "",
    };
  }

  navSlide = () => {
    this.setState({
      active: this.state.active === "" ? "nav-active" : "",
      burger: this.state.burger === "" ? "burger-close" : "",
    });
  };
  render() {
    return (
      <nav className="nav-bar">
        <div className="logo-div">
          <Link to="/">
            <h3>KeepItReel</h3>
            <LiveTvIcon className="tv-icon" />
          </Link>
        </div>
        <ul className={`${this.state.active} nav-links`}>
          <li>
            <Link to="/moviesearch" onClick={this.navSlide}>
              Movies
            </Link>
          </li>
          <li>
            <Link to="/tvshows" onClick={this.navSlide}>
              TV Shows
            </Link>
          </li>
          <li>
            <Link to="/actors" onClick={this.navSlide}>
              Actors
            </Link>
          </li>
        </ul>

        <div className={`${this.state.burger} burger`} onClick={this.navSlide}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
