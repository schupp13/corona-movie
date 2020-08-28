import React from "react";
import AverageRating from "../AverageRating/AverageRating";
import { Link } from "react-router-dom";
import "./MoviePoster.scss";

export default function MoviePoster(props) {
  const handleError = (e) => {
    console.log(e);
    e.target.src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png";
  };

  const imageSource =
    props.poster && `https://image.tmdb.org/t/p/w185/${props.poster}`;
  return (
    <div style={{ padding: 10 }}>
      <div className="movie-poster-container">
        <div className="movie-poster-image">
          <Link to={`/${props.type}/${props.id}`}>
            <img
              alt={props.title}
              src={imageSource}
              onError={handleError}
              width="100%"
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
    </div>
  );
}
