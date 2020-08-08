import React from "react";
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


export default function MovieCard(props) {
  const description = props.overview ? props.overview.slice(0, 120) + "...": '';
  let pic = `https://image.tmdb.org/t/p/w500/${props.backdropPath}`;
  let link = `/${props.type}/${props.id}`;
  let trailerLink = props.type === 'movies' ? 'movie':props.type === 'episode'? 'episode':  'tv';
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
           {props.title}
           </Typography >
            <div className="rating-div" >
              <AverageRating rating={Math.round(props.voteAverage * 10)} />
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
        <TrailerModal type={trailerLink} id={props.id} movie={props.movie}/>

      </CardActions>
    
    </Card>
  );
}
