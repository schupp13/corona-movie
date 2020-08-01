import React from 'react'
import AverageRating from "../AverageRating/AverageRating";
import "./MoviePoster.scss";

export default function MoviePoster(props) {
 return (
  <div className="movie-poster-container">
  <div className="movie-poster-image">

      <img src={`https://image.tmdb.org/t/p/w154/${props.poster}`} />
  </div>
      <h6>{props.title}</h6>
      <div className="average-rating">
      <AverageRating rating={props.rating * 10} />
      </div>
      </div>
 )
}


