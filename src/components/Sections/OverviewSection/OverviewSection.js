import React from "react";
import "./OverviewSection.scss";
import AppleIcon from "@material-ui/icons/Apple";
import Chip from "@material-ui/core/Chip";
import HomeIcon from "@material-ui/icons/Home";
import MoviePoster from "../../Features/MoviePoster/MoviePoster";
import TrailerModal from "../../Features/TrailerModal/TrailerModal";
import netflixpic from "../../../img/netflix.png";
import Typography from "@material-ui/core/Typography";

export default function OverviewSection(props) {
  let {
    title,
    overview,
    companies,
    poster_path,
    vote_average,
    release_date,
    homepage,
    genres,
    id,
    type,
    status,
  } = props;

  let homepageOption =
    homepage == null || undefined || "" ? (
      ""
    ) : homepage.includes("netflix") ? (
      <img src={netflixpic} alt="netflix logo"></img>
    ) : homepage.includes("apple.com") ? (
      <AppleIcon />
    ) : (
      <HomeIcon />
    );

  let chips = genres.map((genre, index) => {
    return <Chip label={genre.name} key={index} />;
  });

  let companiesjsx = companies
    ? companies.map((company, index) => {
        return (
          <div className="company" key={index}>
            {company.logo_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w45/${company.logo_path}`}
              ></img>
            ) : (
              <Typography variant="h6" component="p" color="textSecondary">
                {company.name}
              </Typography>
            )}
          </div>
        );
      })
    : "";
  let date = release_date && new Date(release_date);
  let dateFormat = date
    ? date.getMonth() +
      1 +
      "/" +
      (date.getDate() + 1) +
      "/" +
      date.getFullYear()
    : "NA";
  return (
    <div className="movie-page-content">
      <div className="poster-div">
        {/* <img src={poster}></img> */}
        <MoviePoster
          title={title}
          poster={poster_path}
          rating={vote_average}
          releaseDate={release_date}
          type={type + "s"}
          id={id}
        />
      </div>
      <div className="movie-details">
        <div className="movie-overview">
          <Typography variant="h5" component="h2" color="primary">
            Overview
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {overview}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Release: {dateFormat}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {status && "Status: " + status}
          </Typography>
        </div>
        <div className="chips">{chips}</div>
        <div className="movie-companies">{companiesjsx}</div>

        <div className="movie-bottom">
          {homepage && (
            <div className="movie-homepage">
              <a href={homepage} target="__blank">
                {homepageOption}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
