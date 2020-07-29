import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './MovieReviewCard.scss';


const useStyles = makeStyles({
    root: {
      minWidth: 275,
      width: 275,
      maxWidth:275,
      margin: '10px',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
export default function MovieReviewCard(props) {
   
      const classes = useStyles();
    return (
        <Card className={classes.root} variant="outlined">
        <CardContent>
          
          <Typography variant="h5" component="h2">
          By: {props.review.author}
          </Typography>
        
          <Typography variant="body2" component="p">
            {props.review.content.slice(0, 200)}...
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href={props.review.url} target="__blank">Read More</Button>
        </CardActions>
      </Card>
    )
}
