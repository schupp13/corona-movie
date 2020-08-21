import React from "react";
import "./OverviewSection.scss";
import AppleIcon from "@material-ui/icons/Apple";
import Chip from "@material-ui/core/Chip";
import HomeIcon from "@material-ui/icons/Home";
import MoviePoster from "../../Features/MoviePoster/MoviePoster";
import TrailerModal from "../../Features/TrailerModal/TrailerModal";
import netflixpic from "../../../img/netflix.png";

export default function OverviewSection(props) {
  console.log(props);
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
  } = props;
  let homepageOption =
    homepage !== undefined && homepage.includes("netflix.com") ? (
      <img src={netflixpic} alt="netflix logo"></img>
    ) : homepage !== undefined && homepage.includes("apple.com") ? (
      <AppleIcon />
    ) : (
      <HomeIcon />
    );
  let chips = genres.map((genre, index) => {
    return <Chip label={genre.name} key={index} />;
  });

  let companiesjsx = companies
    ? companies.map((company) => {
        return (
          <div className="company">
            {company.logo_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w45/${company.logo_path}`}
              ></img>
            ) : (
              <h6>{company.name}</h6>
            )}
          </div>
        );
      })
    : "";

  return (
    <div className="movie-page-content">
      <div className="poster-div">
        {/* <img src={poster}></img> */}
        <MoviePoster
          title={title}
          poster={poster_path}
          rating={vote_average}
          releaseDate={release_date}
          id={id}
        />
      </div>
      <div className="movie-details">
        <div className="movie-overview">
          <h4>Overview</h4>
          <p>{overview}</p>
          <p>{release_date && release_date.substring(0, 4)}</p>
        </div>
        <div className="chips">{chips}</div>
        <div className="movie-companies">{companiesjsx}</div>

        <div className="movie-bottom">
          <div className="movie-homepage">
            <a href={homepage} target="__blank">
              {homepageOption}
            </a>
          </div>
          <div className="movie-trailer">
            <TrailerModal type={type} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
