import React, { Component } from "react";
import axios from "axios";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";
import ActorCard from "../../Cards/ActorCard/ActorCard";
import MovieReviewCard from "../../Cards/MovieReviewCard/MovieReviewCard";
import MovieCard from "../../Cards/MovieCard/MovieCard";
import Chip from "@material-ui/core/Chip";
import MovieVideo from "../../Features/MovieVideo/MovieVideo";
import SeasonsCard from "../../Cards/SeasonsCard/SeasonsCard";
import Banner from "../../Features/Banner/Banner";
import OverviewSection from "../../Sections/OverviewSection/OverviewSection";
import "./TVShowPage.scss";

class TVShowPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tvshowID: "",
      tvshow: {},
      cast: [],
      crew: [],
      reviews: [],
      similarTvShows: [],
      genres: [],
      homepage: "",
      videos: [],
      runtime:[],
      firstAirDate:'',
      seasons: [],
      status: '',
      episodes: '',
      networks: []
    };
  }

  componentDidMount() {
    this.getTVShow();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getTVShow();
    }
  }

  handleScroll = () =>{

  }

  getTVShow = () => {
    let tvshowID = this.props.match.params.id;
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${tvshowID}?api_key=12aa3499b6032630961640574aa332a9&append_to_response=credits,images,videos,reviews,similar`

      )
      .then((results) => {
        console.log(results);
        this.setState({
          tvshow: results.data,
          cast: results.data.credits.cast,
          crew: results.data.credits.crew,
          homepage: results.data.homepage,
          genres: results.data.genres,
          runtime: results.data.episode_run_time,
          firstAirDate: results.data.first_air_date,
          seasons: results.data.seasons,
          status: results.data.status,
          episodes: results.data.number_of_episodes,
          networks: results.data.networks,
          similarTvShows: results.data.similar.results,
          similar_page: results.data.similar.page,
          similar_total_pages: results.data.similar.total_pages,
          reviews: results.data.reviews.results,
          videos: results.data.videos.results

        });
      })
      .catch(error=>console.log(error));
  };

  moreSimilar = () =>{
    let movieID = this.props.match.params.id;
    let {similar_page} = this.state;
    axios.get(`https://api.themoviedb.org/3/tv/${movieID}/similar?api_key=12aa3499b6032630961640574aa332a9&language=en-US&page=${similar_page}`)
    .then(results =>{
      this.setState({
        similarTvShows: [... this.state.similarTvShows, ...results.data.results],
        similar_page: results.data.page,
      });
    })
    .catch(error =>{
      console.log(error)
    })
  }

  addSimilarPage = () => {
    this.setState({similar_page : this.state.similar_page + 1}, this.moreSimilar)
  }

  render() {
    const {
      tvshow,
      cast,
      crew,
      reviews,
      similarTvShows,
      genres,
      homepage,
      videos,
      seasons,
      status,
      firstAirDate,
      runtime,
      episodes,
      networks,
      similar_page,
      similar_total_pages
    } = this.state;

    let runtimejsx = runtime && runtime.join(', ') + 'min';

    let Background = `https://image.tmdb.org/t/p/original/${tvshow.backdrop_path}`;

    let actorsjsx = cast.map((actor) => {
      return <ActorCard actor={actor} />;
    });
    let crewjsx = crew.map((crew) => {
      return <ActorCard actor={crew} />;
    });

    let reviewsjsx = reviews.map((review) => {
      return <MovieReviewCard review={review} />;
    });

    let similarTvShowsjsx = similarTvShows.map((tvshow, index) => {
      return <MovieCard message={`Similar ${index + 1}`} tvshow={tvshow} key={index} id={tvshow.id} title={tvshow.name} overview={tvshow.overview} voteAverage={tvshow.vote_average} backdropPath={tvshow.backdrop_path} type="tvshows"/>;
    });

    let seasonsjsx =  seasons.map(season =>{
      return <SeasonsCard season={season} tvshowID={tvshow.id} />
    });

    

    let chips = genres.map((genre) => {
      return <Chip label={genre.name} />;
    });

    let videosjsx = videos.map((video) => {
      return <MovieVideo movie={video} />;
    });

    let networksjsx = networks.map((network) =>{
      return <img alt={network.name + " logo"} src={`https://image.tmdb.org/t/p/w92/${network.logo_path}`} />;
    });

    return (
      <>
          <Banner background={Background} title={tvshow.name} tagline={tvshow.tagline} search={false} companies={networks}/>
          <OverviewSection type="tv" title={tvshow.name} poster_path={tvshow.poster_path} vote_average={tvshow.vote_average} release_date={firstAirDate} homepage={homepage} genres={genres} id={tvshow.id} overview={tvshow.overview} ></OverviewSection>
          <div className="parallax" style={{ backgroundImage: `url(${Background})` }}>
            <ScrollDiv title="Cast" cards={actorsjsx} handleScroll={this.handleScroll} page={0} total_pages={0} addPage={this.addSimilarPage}></ScrollDiv>
          </div> 
          <ScrollDiv title="Season" cards={seasonsjsx} handleScroll={this.handleScroll} page={0} total_pages={0} addPage={this.addSimilarPage}></ScrollDiv>  
          <ScrollDiv title="Reviews" cards={reviewsjsx} handleScroll={this.handleScroll} page={0} total_pages={0} addPage={this.addSimilarPage}></ScrollDiv>
          <div
            className="parallax"
           style={{ backgroundImage: `url(${Background})` }}
          >
            <ScrollDiv title="Crew" cards={crewjsx} handleScroll={this.handleScroll} page={0} total_pages={0} addPage={this.addSimilarPage}></ScrollDiv>
          </div>
          
          <ScrollDiv title="TV Show Trailers" cards={videosjsx} handleScroll={this.handleScroll} page={0} total_pages={0} addPage={this.addSimilarPage}></ScrollDiv>
          <ScrollDiv title="Similar TV Shows" cards={similarTvShowsjsx} handleScroll={this.handleScroll} page={similar_page} total_pages={similar_total_pages} addPage={this.addSimilarPage}></ScrollDiv>
      </>
    );
  }
}

export default TVShowPage;
