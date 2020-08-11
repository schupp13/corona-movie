import React from 'react';
import './MovieVideo.scss';

export default function MovieVideo(props) {
    const source = `https://www.youtube.com/embed/${props.movie.key}`;

    return (
        <div className="movie-video-card">
             <iframe src={source} allowFullScreen={true} title={props.movie.name}></iframe>
        </div>
    )
}
