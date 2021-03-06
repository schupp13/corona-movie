import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AverageRating from "../../Features/AverageRating/AverageRating";
import { Link } from "react-router-dom";
import TrailerModal from "../../Features/TrailerModal/TrailerModal";

const useStyles = makeStyles({
  root: {
    minWidth: 345,
    margin: 15,
    maxWidth: 345,
  },
  media: {
    height: 140,
    backgroundSize: "cover",
    backgroundPosition: "top",
  },
});

function TVShowsCard(props) {
  const classes = useStyles();

  const description = props.tvshow.overview.slice(0, 120) + "...";
  let pic = `https://image.tmdb.org/t/p/w500/${props.tvshow.poster_path}`;
  let link = `/tvshows/${props.tvshow.id}`;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={pic}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.tvshow.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button to={link} component={Link} size="small" color="primary">
          Learn More
        </Button>
        <TrailerModal type="tv" id={props.tvshow.id}/>
      </CardActions>
      <div className="rating-div">
        <AverageRating rating={props.tvshow.vote_average * 10} />
      </div>
    </Card>
  );
}

export default TVShowsCard;
