import React, { Component } from "react";
import { Link } from "react-router-dom";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import MultiSearch from "../../Forms/MultiSearch/MultiSearch";
import { Redirect } from "react-router-dom";

import "./NavBar.scss";
import axios from "axios";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "",
      liTransform: "",
      burger: "",
      loggedIn: false,
    };
  }
  componentDidMount() {
    this.getSession();
  }

  logout = () => {
    axios
      .get("api/logout")
      .then((result) => {
        console.log(result);
        this.setState({ loggedIn: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getSession = () => {
    axios
      .get("api/session")
      .then((data) => this.setState({ loggedIn: true }))
      .catch((error) => this.logout());
  };

  navSlide = () => {
    this.setState({
      active: this.state.active === "" ? "nav-active" : "",
      burger: this.state.burger === "" ? "burger-close" : "",
    });
  };

  render() {
    // if(this.state.loggedIn && <Redirect to={"/"} />;
    return (
      <nav className="nav-bar">
        <div className="logo-div">
          <Link to="/welcome">
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
          {/* <li>
            <Link to="/api/logout" onClick={this.navSlide}>
              MyAccount
            </Link>
          </li>
          <li>
            <Link to="/api/logout" onClick={this.logout}>
              Logout
            </Link>
          </li> */}
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
