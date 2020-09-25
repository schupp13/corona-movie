import React from "react";
import NewTrailerModal from "../NewTrailerModal/NewTrailerModal";
import Favorite from "../../Forms/Favorite/Favorite";
import WatchList from "../../Forms/WatchList/WatchList";
import MultiSearch from "../../Forms/MultiSearch/MultiSearch";
import "./Banner.scss";
import SearchEverything from "../../Forms/SearchEverything/SearchEverything";
export default function Banner(props) {
  let { background, title, options, tagline, id, type, userOptions } = props;
  let onError = () => {
    if (!this.state.errored) {
      this.setState({
        src: this.props.fallbackSrc,
        errored: true,
      });
    }
  };
  let BackgroundSRC = background
    ? background
    : "https://c.pxhere.com/photos/c5/b1/popcorn_cinema_ticket_film_entertainment_food_corn_bucket-611912.jpg!d";
  return (
    <div
      className="banner"
      style={{ backgroundImage: `url(${BackgroundSRC})` }}
    >
      <div className="banner-overlay">
        <div className="banner-content">
          <h1>{title}</h1>
          <p>{tagline}</p>
          {options}
          {/* {search && <SearchEverything />} */}
          {userOptions && (
            <div className="user-options">
              <Favorite
                type={type}
                id={id}
                liked={props.liked}
                handleLike={props.handleLike}
              />

              <WatchList
                type={type}
                id={id}
                watchList={props.watchList}
                handleWatchList={props.handleWatchList}
              />

              {props.trailer && <NewTrailerModal trailer={props.trailer} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
