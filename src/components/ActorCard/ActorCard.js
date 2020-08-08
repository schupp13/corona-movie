import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 175,
    display:'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center',
    margin: '15px'
  },
  
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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

  let description = props.actor.job ?  props.actor.job: props.actor.character ? 'as ' + props.actor.character: <StarIcon fontSize="large" style={{color:'#ffb400'}}></StarIcon>;

  return (
    <Card className={classes.root}>
    <CardContent style={{margin: '0px'}}>    
      
       <Avatar alt={props.actor.name} src={profile} className={classes.large} />

    <Typography className={classes.title} color="textSecondary" gutterBottom>
     {props.actor.name}
    </Typography>
    
    <Typography variant="body2" component="p" style={{margin: '0px', fontSize:'18px', display:'flex', justifyContent:'center'}}>
      {description}
    </Typography>
  </CardContent>
  <CardActions>
  <Button to={link} component={Link} size="small" color="primary">
          Bio     </Button>
  </CardActions>
    </Card>
  );
}
