import React from "react";
import "./MultiCard.scss";
import {Link} from 'react-router-dom';
const addDefaultSrc =(ev) =>{
  ev.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';
}
export default function MultiCard(props) {
  const { overview, date, title, image } = props;
  let poster = `https://image.tmdb.org/t/p/w92/${image}`;
  let overviewjsx = overview.length > 150 ? overview.slice(0,150) + "...": overview;

 
  return (
    <Link>
    <div className="multicard-container">
      <div
        className="multicard-poster">
        <img src={poster} onError={addDefaultSrc}></img>
      </div>
      <div className="multicard-content">
        <h4 className="title">{title}</h4>
        <p className="date">{date}</p>
        <p className="overview">{overviewjsx}</p>
      </div>
    </div>
    </Link>
  );
}
