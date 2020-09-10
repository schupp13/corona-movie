import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from "../../SessionContext/SessionContext";
import { Redirect, Link } from "react-router-dom";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import "./NavBar.scss";
import Button from "@material-ui/core/Button";

import axios from "axios";
import SearchEverything from "../../Forms/SearchEverything/SearchEverything";

export default function SomethingElse() {
  let [active, setActive] = useState("");
  let [liTransform, setLiTransform] = useState("");
  let [burger, setBurger] = useState("");
  let [session, setSession, logoutSession, getSession, loggedIn] = useContext(
    SessionContext
  );
  let [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = () => {
    // get session is context from sessionContext
    getSession();
  };

  const redirect = () => {
    return loggedIn ? "" : <Redirect to="/" />;
  };

  const navSlide = () => {
    setActive(active === "" ? "nav-active" : "");
    setBurger(burger === "" ? "burger-close" : "");
  };

  const logout = () => {
    logoutSession();
    navSlide();
  };

  const searchSwitch = () => {
    const opp = !showSearch;
    setShowSearch(opp);
    navSlide();
  };

  return (
    <nav className="nav-bar">
      <div className="logo-div">
        <Link to="/welcome">
          <h3>KeepItReel</h3>
          <LiveTvIcon className="tv-icon" />
        </Link>
      </div>
      <ul className={`${active} nav-links`}>
        <li>
          <Link to="/moviesearch" onClick={navSlide}>
            Movies
          </Link>
        </li>
        <li>
          <Link to="/tvsearch" onClick={navSlide}>
            TV
          </Link>
        </li>

        {session && (
          <>
            <li>
              <Link to={`profile/${session.id}`}>{session.username}</Link>
            </li>
            <li onClick={logout}>
              <p className="logout" onClick={logout}>
                Logout
              </p>
            </li>
          </>
        )}

        {!showSearch ? (
          <Button onClick={searchSwitch} className="search-button">
            <SearchIcon />
          </Button>
        ) : (
          <Button onClick={searchSwitch} className="close-search-button">
            <CloseIcon />
          </Button>
        )}
      </ul>

      <div
        className={showSearch ? `search-everything-div ` : `close-search`}
        style={{
          width: "100vw",
          position: "fixed",
          top: "56px",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <SearchEverything />
      </div>

      <div className={`${burger} burger`} onClick={navSlide}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}
