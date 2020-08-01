import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    // width: "200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "15px",
    padding: "5px",
    backgroundColor: "#222",
    borderRadius: "5px",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

export default function ActorCard(props) {
  const classes = useStyles();
  let profile = `https://image.tmdb.org/t/p/original/${props.actor.profile_path}`;
  let link = `/actors/${props.actor.id}`;

  return (
    <div className={classes.root}>
      <Avatar alt={props.actor.name} src={profile} className={classes.large} />
      <h5>{props.actor.name}</h5>
      <h6>{props.actor.character && "as " + props.actor.character}</h6>
      <CardActions>
        <Button to={link} component={Link} size="small" color="primary">
          Bio
        </Button>
      </CardActions>
    </div>
  );
}
