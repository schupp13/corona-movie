import React from "react";
import AverageRating from "../AverageRating/AverageRating";
import { Link } from "react-router-dom";
import "./MoviePoster.scss";

export default function MoviePoster(props) {
  return (
    <div className="movie-poster-container">
      <div className="movie-poster-image">
        <Link to={`/movies/${props.id}`}>
          <img
            alt={props.title}
            src={`https://image.tmdb.org/t/p/w185/${props.poster}`}
          />
        </Link>
        <div className="average-rating">
          <AverageRating rating={props.rating * 10} />
        </div>
      </div>
      <p className="title">{props.title}</p>
      <p className="date">
        {props.releaseDate ? props.releaseDate.substring(0, 4) : ""}
      </p>
    </div>
  );
}
