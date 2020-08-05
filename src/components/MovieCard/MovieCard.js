import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AverageRating from "../AverageRating/AverageRating";
import { Link } from "react-router-dom";
import "./MovieCard.scss";
import TrailerModal from "../TrailerModal/TrailerModal";

// const useStyles = makeStyles({
//   root: {
//     minWidth: 245,
//     margin: 15,
//     maxWidth: 245,
//   },
//   media: {
//     height: 140,
//     backgroundSize: "cover",
//     backgroundPosition: "top",
//   },
// });

export default function MovieCard(props) {
  const description = props.movie.overview.slice(0, 120) + "...";
  let pic = `https://image.tmdb.org/t/p/w500/${props.movie.backdrop_path}`;
  let link = `/movies/${props.movie.id}`;

  return (
    <Card className="movie-card">
      <CardActionArea>
        <CardMedia
          className="movie-card-media"
          image={pic}
          title="Contemplative Reptile"
        />
        <CardContent>
        <div className="title-div">
          <Typography component="h2" variant="body2">
           <h2>{props.movie.title}</h2> 
           </Typography >
            <div className="rating-div" >
              <AverageRating rating={props.movie.vote_average * 10} />
            </div>
          </div>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="card-actions">
        <Button  component={Link} to={link} size="small" color="primary">
          More Info
        </Button>
        <TrailerModal type="movie" id={props.movie.id} />

      </CardActions>
    
    </Card>
  );
}
