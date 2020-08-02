import React, { Component } from "react";
import { Link } from "react-router-dom";
import LiveTvIcon from "@material-ui/icons/LiveTv";

import "./NavBar.scss";


class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      active: '',
      liTransform: ''
    }
  }

  navSlide = () =>{
    this.setState({
      active: this.state.active === '' ? 'nav-active' : ''
    })
  }
  render() {
    return (
      <nav className="Navbar">
        <div className="logo">
          <h3>KeepItReel</h3>
          <LiveTvIcon className="tv-icon" />
        </div>
          <ul className={`${this.state.active} nav-links`}>
          <li>
            <Link to="/movies">
              Movies
            </Link>
            </li>
            <li>
            <Link to="/tvshows">
              TV Shows
            </Link>
            </li>
            <li>
            <Link to="/actors">
              Actors
            </Link>
            </li>
          </ul>

          <div className="burger" onClick={this.navSlide}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
      </nav>
    );
  }
}

export default Navbar;
