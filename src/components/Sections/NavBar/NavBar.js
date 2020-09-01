import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from "../../SessionContext/SessionContext";
import { Redirect, Link } from "react-router-dom";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import "./NavBar.scss";
import axios from "axios";

export default function SomethingElse() {
  let [active, setActive] = useState("");
  let [liTransform, setLiTransform] = useState("");
  let [burger, setBurger] = useState("");
  let [session, setSession, logoutSession, getSession, loggedIn] = useContext(
    SessionContext
  );

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = () => {
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
        <li>
          <Link to="/actors" onClick={navSlide}>
            Actors
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
      </ul>
      <div className={`${burger} burger`} onClick={navSlide}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}
