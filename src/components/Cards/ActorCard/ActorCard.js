import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  rootActor: {
    minWidth: 175,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: "0px",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  },

  title: {
    fontSize: 14,
    textAlign: "center",
  },
  pos: {
    marginBottom: 12,
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: "auto",
  },
}));

export default function ActorCard(props) {
  const classes = useStyles();
  let profile =
    props.actor.profile_path &&
    `https://image.tmdb.org/t/p/w185/${props.actor.profile_path}`;
  let link = props.actor.id && `/actors/${props.actor.id}`;

  let description = props.actor.job ? (
    props.actor.job
  ) : props.actor.character ? (
    "as " + props.actor.character
  ) : (
    <StarIcon fontSize="large" style={{ color: "#ffb400" }}></StarIcon>
  );

  return (
    <div style={{ padding: 10 }}>
      <Card className={classes.rootActor}>
        <CardContent style={{ margin: "0px", paddingBottom: "0px" }}>
          <Avatar
            alt={props.actor.name}
            src={profile}
            className={classes.large}
          />
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {props.actor.name}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            style={{ margin: "auto", fontSize: "12px", textAlign: "center" }}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button to={link} component={Link} size="small" color="primary">
            Bio
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
