import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';
import SeasonsCard from "../SeasonsCard/SeasonsCard";
import './SeasonPage.scss';

export default function SeasonPage(props) {

    const [season, setSeason] = useState({});
    const [episodes, setEpisodes] = useState([]);
    const [show, setShow] = useState({});
    const [otherSeasons, setOtherSeasons] = useState([]);

     // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
     getShow();
     getSeasons();
     console.log(props);
     
  },[props.match.params]);

  const getShow = () =>{
      const {id} = props.match.params;
      axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=12aa3499b6032630961640574aa332a9&language=en-US`)
      .then(results => {
          setShow(results.data)
          setOtherSeasons(results.data.seasons)
      })
      .catch(error =>{
          console.log(error)
      });
  }

const getSeasons = () =>{
    const {seasonid} = props.match.params;
      const {id} = props.match.params;
    axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonid}?api_key=12aa3499b6032630961640574aa332a9&language=en-US`)
    .then(results =>{
        console.log(results);
        setSeason(results.data);
        setEpisodes(results.data.episodes)
    })
    .catch(error =>{
        console.log(error);
        
    });

};

const handleError = (e) =>{
    console.log(e);
    e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';

}

let episodesjsx = episodes.map((ep, i) =>{
    return <MovieCard movie={ep} key={i} id={ep.id} title={ep.name} overview={ep.overview} voteAverage={ep.vote_average} backdropPath={ep.still_path} type="episode"/>;
});

let otherSeasonsjsx = otherSeasons.map(seasonx => {
    return seasonx.season_number !== parseInt(props.match.params.seasonid )&&  <SeasonsCard season={seasonx} tvshowID={show.id} />
});

    return (
        <div className="season-page">
            <div className="container">
                <div className="banner" style={{backgroundImage:`url("https://image.tmdb.org/t/p/original/${show.backdrop_path}")`}}>
                    <div className="banner-overlay">
                        <div className="banner-content">
                            <div className="banner-content-poster-div">
                            <img src={`https://image.tmdb.org/t/p/w342/${season.poster_path}`}></img>
                            </div>
                            <div className="banner-content-details">
                                <h1>{show.name}</h1>
                                <h3>{season.name}</h3>
                                <p>{season.air_date}</p>
                                <div className="overview">

                                <p>{season.overview}</p>
                                </div>
                            </div>
                        </div>
                        </div>
                </div>
       
                <div className="scroll-container-div">
                    <h2>{season.name} Episodes</h2>
                    <div className="scroll-div">
                        {episodesjsx}
                    </div>
                </div>
                <div className="scroll-container-div">
                    <h2>Other Seasons</h2>
                    <div className="scroll-div">
                        {otherSeasonsjsx}
                    </div>
                </div>
           
            </div>
        </div>
    )
}


