import React, { Component } from "react";
import axios from "axios";
import "./MoviePage.scss";
import ActorCard from "../../Cards/ActorCard/ActorCard";
import MovieReviewCard from "../../Cards/MovieReviewCard/MovieReviewCard";
import MovieCard from "../../Cards/MovieCard/MovieCard";
import MovieVideo from "../../Features/MovieVideo/MovieVideo";
import Banner from "../../Features/Banner/Banner";
import OverviewSection from "../../Sections/OverviewSection/OverviewSection";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";
import PictureModal from "../../Features/PictureModal/PictureModal";
export default class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieID: "",
      movie: {},
      genres: [],
      homepage: "false",
      trailer: {},
      actors: [],
      crew: [],
      director: [],
      writer: [],
      reviews: [],
      review_page: 0,
      review_total_pages: 0,
      similar: [],
      similar_total_pages: 0,
      similar_page: 0,
      videos: [],
      companies: [],
      movie_posters: [],
      movie_backdrops: [],
      userLiked: false,
      userWatchList: false,
    };
  }

  componentDidMount() {
    this.getMovie();
    this.checkUserState();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getMovie();
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  }
  checkUserState = () => {
    let item_id = parseInt(this.props.match.params.id);
    let user_id = parseInt(JSON.parse(localStorage.getItem("user")).id);
    let media_id = 1; // 1 is for movies
    axios
      .post(`/api/user/state`, { user_id, item_id, media_id })
      .then((result) => {
        console.log(result);
        if (result.data.length > 0) {
          result.data.map((feat) => {
            if (feat["?column?"] === "userWatchlist") {
              this.setState({ userWatchList: true });
            } else if (feat["?column?"] === "userLiked") {
              this.setState({ userLiked: true });
            }
          });
        } else {
          this.setState({ userLiked: false, userWatchList: false });
        }
      })
      .catch((error) => {
        this.setState({ userLiked: false, userWatchList: false });
      });
  };

  handleLike = (e) => {
    let user_id = parseInt(JSON.parse(localStorage.getItem("user")).id);
    let media_id = 1; // 1 is for movies
    let item_id = parseInt(this.props.match.params.id);
    axios
      .post(`/api/favorites`, { item_id, user_id, media_id })
      .then((data) => this.setState({ userLiked: data.data[0] ? true : false }))
      .catch((error) => {
        console.log(error);
      });
  };

  handleWatchList = (e) => {
    let user_id = parseInt(JSON.parse(localStorage.getItem("user")).id);
    let media_id = 1; // 1 is for movies
    let item_id = parseInt(this.props.match.params.id);
    axios
      .post(`/api/watchlist`, { item_id, user_id, media_id })
      .then((data) => {
        console.log(data);
        this.setState({ userWatchList: data.data[0] ? true : false });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getMovie = () => {
    let movieID = this.props.match.params.id;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=12aa3499b6032630961640574aa332a9&append_to_response=credits,images,videos,reviews,similar`
      )
      .then((results) => {
        this.setState({
          movie: results.data,
          actors: results.data.credits.cast,
          crew: results.data.credits.crew,
          movie_posters: results.data.images.posters,
          movie_backdrops: results.data.images.backdrops,
          reviews: results.data.reviews.results,
          review_page: results.data.reviews.page,
          review_total_pages: results.data.reviews.total_pages,
          videos: results.data.videos.results,
          similar: results.data.similar.results,
          similar_total_pages: results.data.similar.total_pages,
          similar_page: results.data.similar.page,
          genres: results.data.genres,
          companies: results.data.production_companies,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleScroll = () => {};

  /**
   * this funciton will add more reviews to the list if they are available... going to be passed down to ScrollDIv
   */
  moreReviews = () => {
    let movieID = this.props.match.params.id;
    let { review_page } = this.state;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=12aa3499b6032630961640574aa332a9&language=en-US&page=${review_page}`
      )
      .then((results) => {
        this.setState({
          similar: [...this.state.similar, ...results.data.results],
          similar_page: results.data.page,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  moreSimilar = () => {
    let movieID = this.props.match.params.id;
    let { similar_page } = this.state;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=12aa3499b6032630961640574aa332a9&language=en-US&page=${similar_page}`
      )
      .then((results) => {
        this.setState({
          similar: [...this.state.similar, ...results.data.results],
          similar_page: results.data.page,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addSimilarPage = () => {
    this.setState(
      { similar_page: this.state.similar_page + 1 },
      this.moreSimilar
    );
  };
  addReviewPage = () => {
    this.setState(
      { review_page: this.state.review_page + 1 },
      this.moreReviews
    );
  };
  handleError = (e) => {
    e.target.src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png";
  };

  render() {
    let {
      movie,
      genres,
      companies,
      similar_page,
      similar_total_pages,
      actors,
      reviews,
      review_page,
      review_total_pages,
      similar,
      videos,
      movie_posters,
      movie_backdrops,
      crew,
      userLiked,
      userWatchList,
    } = this.state;

    let Background =
      movie.backdrop_path &&
      `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;

    let moviePosters = movie_posters.map((element, index) => {
      let imageDisplay = `https://image.tmdb.org/t/p/w185/${element.file_path}`;
      let imageOriginal = `https://image.tmdb.org/t/p/original/${element.file_path}`;
      return (
        <PictureModal
          key={index}
          imageDisplay={imageDisplay}
          imageOriginal={imageOriginal}
          portrait={true}
          width={"185px"}
        />
      );
    });

    let movieBackdrops = movie_backdrops.map((element, index) => {
      let imageDisplay = `https://image.tmdb.org/t/p/w300/${element.file_path}`;
      let imageOriginal = `https://image.tmdb.org/t/p/original/${element.file_path}`;
      return (
        <PictureModal
          key={index}
          imageDisplay={imageDisplay}
          imageOriginal={imageOriginal}
          portrait={false}
          width={"300px"}
        />
      );
    });

    let actorsJSX = actors.map((actor, index) => {
      return <ActorCard actor={actor} key={index} />;
    });

    let crewJSX = crew.map((actor, index) => {
      return <ActorCard actor={actor} key={index} />;
    });

    let reviewsJSX = reviews.map((review, index) => {
      return <MovieReviewCard review={review} key={index} />;
    });

    let similarJSX = similar.map((movie, index) => {
      return (
        <MovieCard
          message={`#${index + 1} similar`}
          movie={movie}
          key={index}
          id={movie.id}
          title={movie.title}
          overview={movie.overview}
          voteAverage={movie.vote_average}
          backdropPath={movie.backdrop_path}
          type="movies"
        />
      );
    });

    let videosJSX = videos.map((movie, index) => {
      return <MovieVideo movie={movie} key={index} />;
    });
    let trailer = videos.filter((movie, index) => {
      return movie.type === "Trailer";
    });

    return (
      <>
        <Banner
          background={Background}
          title={movie.title}
          tagline={movie.tagline}
          search={false}
          liked={userLiked}
          type="movie"
          id={movie.id}
          handleLike={this.handleLike}
          watchList={userWatchList}
          handleWatchList={this.handleWatchList}
          trailer={trailer}
        />
        <OverviewSection
          type="movie"
          title={movie.title}
          poster_path={movie.poster_path}
          vote_average={movie.vote_average}
          release_date={movie.release_date}
          homepage={movie.homepage}
          genres={genres}
          id={movie.id}
          overview={movie.overview}
          companies={companies}
          liked={userLiked}
          handleLike={this.handleLike}
          watchList={userWatchList}
          handleWatchList={this.handleWatchList}
        ></OverviewSection>

        <div
          className="scroll-container-div parallax"
          style={{ backgroundImage: `url(${Background})` }}
        >
          <ScrollDiv
            title="Cast"
            cards={actorsJSX}
            handleScroll={this.handleScroll}
            page={0}
            total_pages={0}
            addPage={() => {}}
          ></ScrollDiv>
        </div>

        <ScrollDiv
          title="Reviews"
          cards={reviewsJSX}
          handleScroll={this.handleScroll}
          page={review_page}
          total_pages={review_total_pages}
          addPage={this.addReviewPage}
        ></ScrollDiv>
        <ScrollDiv
          title="Crew"
          cards={crewJSX}
          handleScroll={this.handleScroll}
          page={0}
          total_pages={0}
          addPage={() => {}}
        ></ScrollDiv>
        <ScrollDiv
          title="Posters"
          cards={moviePosters}
          handleScroll={this.handleScroll}
          page={0}
          total_pages={0}
          addPage={() => {}}
        ></ScrollDiv>
        <ScrollDiv
          title="Backdrops"
          cards={movieBackdrops}
          handleScroll={this.handleScroll}
          page={0}
          total_pages={0}
          addPage={() => {}}
        ></ScrollDiv>

        <div
          className="scroll-container-div parallax"
          style={{ backgroundImage: `url(${Background})` }}
        >
          <ScrollDiv
            title="Videos"
            cards={videosJSX}
            handleScroll={this.handleScroll}
            page={0}
            total_pages={0}
            addPage={() => {}}
          ></ScrollDiv>
        </div>

        <ScrollDiv
          title="Similar"
          cards={similarJSX}
          handleScroll={this.handleScroll}
          page={parseInt(similar_page)}
          total_pages={parseInt(similar_total_pages)}
          addPage={this.addSimilarPage}
        ></ScrollDiv>
      </>
    );
  }
}
