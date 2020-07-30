import React from "react";
import "./MultiCard.scss";
import {Link} from 'react-router-dom';
const addDefaultSrc =(ev) =>{
  ev.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';
}
export default function MultiCard(props) {
  const { overview, date, title, image, id } = props;
  let poster = image ? `https://image.tmdb.org/t/p/w92/${image}`:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';
  let path = props.movie ? `/movies/${props.movie.id}`: '/';
 
  console.log(props);
 
  return (
    <Link to={path}>
    <div className="multicard-container">
      <div
        className="multicard-poster">
        <img alt={title} src={poster} onError={addDefaultSrc}></img>
      </div>
      <div className="multicard-content">
        <h4 className="title">{title}</h4>
        <p className="date">{date}</p>
        <p className="overview">{overview}</p>
      </div>
    </div>
    </Link>
  );
}
