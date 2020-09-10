import React from "react";
import NewTrailerModal from "../NewTrailerModal/NewTrailerModal";
import Favorite from "../../Forms/Favorite/Favorite";
import WatchList from "../../Forms/WatchList/WatchList";
import MultiSearch from "../../Forms/MultiSearch/MultiSearch";
import "./Banner.scss";
import SearchEverything from "../../Forms/SearchEverything/SearchEverything";
export default function Banner(props) {
  let {
    background,
    title,
    options,
    tagline,
    search,
    companies,
    id,
    type,
  } = props;

  return (
    <div className="banner" style={{ backgroundImage: `url(${background})` }}>
      <div className="banner-overlay">
        <div className="banner-content">
          <h1>{title}</h1>
          <p>{tagline}</p>
          {options}
          {/* {search && <SearchEverything />} */}
          {!search && (
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
