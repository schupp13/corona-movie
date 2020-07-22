import React, { Component } from "react";
import Navbar from "../NavBar/NavBar";
import './HomePage.scss';
import Banner from "../Banner/Banner";

export default class HomePage extends Component {
  render() {
    return (
      <div className="homepage">
        {/* Make Navbar */}
        <div className="navbar">
        <Navbar />
        </div>
        {/* Make Banner */}
        <div className="banner">
            <Banner />
        </div>
        {/* Search  */}
        <div className="search-results"></div>
      </div>
    );
  }
}
