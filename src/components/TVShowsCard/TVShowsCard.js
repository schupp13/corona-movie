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
  console.log(props.tvshow);
  let pic = `https://image.tmdb.org/t/p/w500/${props.tvshow.poster_path}`;

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
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
      <AverageRating rating={props.tvshow.vote_average * 10} />
    </Card>
  );
}

export default TVShowsCard;
