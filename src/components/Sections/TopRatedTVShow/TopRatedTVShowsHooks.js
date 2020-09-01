import React, {useState, useEffect} from "react";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";
import axios from "axios";


export default function TopRatedTVShowsHooks(props) {
 let [results, setResults] = useState([]);
 let [page, setPage] = useState(0);
 let [totalPages, setTotalPages] = useState(0);
 let [type, setType] = useState({});

 useEffect(() => {
  getTVShows(page);
 }, []);

 const changeType = (type) => {
  setType(type);
   getTVShows();
 };

 const getTVShows = (type) => {
  axios
   .get(
    `https://api.themoviedb.org/3/tv/${type}?api_key=12aa3499b6032630961640574aa332a9&language=en-US&page=1`
   )
   .then((res) => {
    let data = page > 1 ? [...results, ...results.data.results] : [...results.data.results];
    setResults(data)
     setPage({page: res.data.page})
     setTotalPages({totalPages: res.data.total_pages})
    })
   .catch((err) => {
    console.log(err);
   });
 };

 const addPage = () => {
  setPage(page + 1);
 };

 const createMessage = (type) => {
  return type === "top_rated"
   ? "Top Rated"
   : type === "popular"
    ? "Most Popular"
    : type === "on_the_air"
     ? "On Air"
     : "Playing Today";
 }

 const handleScroll = () => {};

 let buttons = [
  { name: "Top Rated", function: () => changeType("top_rated") },
  { name: "Most Popular", function: () => changeType("popular") },
  { name: "On Air", function: () => changeType("on_the_air") },
  { name: "On Air Today", function: () => changeType("airing_today") },
 ];
 let message = createMessage(type);

 return (

 // let { page, total_pages, type } = state;
 let tvshows = results.map((tvshow, index) => {
  return (
   <MovieCard
    message={`#${index + 1} ${message}`}
    tvshow={tvshow}
    key={index}
    id={tvshow.id}
    title={tvshow.name}
    overview={tvshow.overview}
    voteAverage={tvshow.vote_average}
    backdropPath={tvshow.backdrop_path}
    type="tvshows"
   />
  );
 });
 <div className="trending">
  <ScrollDiv
   buttons={buttons}
   title={`TV - ${message}`}
   cards={tvshows}
   handleScroll={handleScroll}
   page={page}
   totalPages={total_pages}
   addPage={addPage}
  ></ScrollDiv>
 </div>
    );
}

