import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 325,
    margin: '15px',
  },
  media: {   
      height: 250,        // this is the`className` passed to `CardMedia` later
  objectFit: 'cover',      // as an example I am modifying width and height
    
  },
});
const handleError = (e) =>{
  console.log(e);
  e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';

}
export default function SeasonCard(props) {
  const classes = useStyles();
  const description = props.overview ? props.overview.slice(0, 120) + "...": '';
  let pic = `https://image.tmdb.org/t/p/original/${props.season.poster_path}`;
 

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
        className={classes.media}
          component="img"
          alt={props.season.name}
          image={pic}
          title={props.season.name}
          onError={handleError}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.season.name} ({props.season.episode_count} ep.)
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
        <Button size="small" color="primary" component={Link} to={`/tvshows/${props.tvshowID}/seasons/${props.season.season_number}`} style={{width: '100px'}}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}