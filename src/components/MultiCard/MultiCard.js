import React from "react";
import "./MultiCard.scss";

export default function MultiCard(props) {
  const { overview, date, title, image } = props;
  let poster = `https://image.tmdb.org/t/p/original/${image}`;

  return (
    <div className="multicard-container">
      <div
        className="multicard-poster"
        style={{ backgroundImage: `url(${poster})` }}
      ></div>
      <div className="multicard-content">
        <h3>{title}</h3>
        <h4>{date}</h4>
        <p>{overview}</p>
      </div>
    </div>
  );
}
