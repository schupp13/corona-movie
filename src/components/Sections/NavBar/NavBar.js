import React, { Component } from "react";
import { Link } from "react-router-dom";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import MultiSearch from "../../Forms/MultiSearch/MultiSearch";
import { Redirect } from "react-router-dom";
import { SessionContext } from "../../SessionContext/SessionContext";
import "./NavBar.scss";
import axios from "axios";

class Navbar extends Component {
  static contextType = SessionContext;
  constructor(props) {
    super(props);
    this.state = {
      active: "",
      liTransform: "",
      burger: "",
      loggedIn: true,
    };
  }
  componentDidMount() {
    // this.getSession();
    console.log(localStorage);
    this.setState({
      loggedIn: localStorage.getItem("user"),
    });
  }

  logout = () => {
    axios
      .get("api/logout")
      .then((result) => {
        localStorage.removeItem("user");
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
    if (!this.state.loggedIn) {
      return <Redirect to="/" />;
    }
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
            <Link to="/tvsearch" onClick={this.navSlide}>
              TV Shows
            </Link>
          </li>
          <li>
            <Link to="/actors" onClick={this.navSlide}>
              Actors
            </Link>
          </li>
          {localStorage.getItem("user") && (
            <li onClick={(this.navSlide, this.logout)}>
              <a onClick={(this.navSlide, this.logout)}>Logout</a>
            </li>
          )}
          <li>
            <Link to="/" onClick={this.logout}>
              {localStorage.getItem("user").username}
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
