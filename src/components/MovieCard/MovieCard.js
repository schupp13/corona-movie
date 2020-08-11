import React, {useState} from "react";
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
import Chip from "@material-ui/core/Chip";


export default function MovieCard(props) {
  const shortTitle = props.title && props.title.length > 20 ? props.title.slice(0,20) + "...": props.title ? props.title: '';
  const shortDescription = props.overview && props.overview.length > 100 ? props.overview.slice(0, 100) + "...": props.overview ? props.overview: '';
  let pic = `https://image.tmdb.org/t/p/w500/${props.backdropPath}`;
  const [showMore, setShowMore] = useState(false);
  let link = `/${props.type}/${props.id}`;
  let trailerLink = props.type === 'movies' ? 'movie':props.type === 'episode'? 'episode':  'tv';
   const handleError = (e) =>{
    console.log(e);
    e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';

}
  return (
   
    <Card className="movie-card">
     
          <CardActionArea onClick={()=>{setShowMore(!showMore)}}>
          
                <CardMedia
                  className="movie-card-media"
                  image={pic}
                  title="Contemplative Reptile"
                  onError={handleError}
                />
               
           
                <CardContent >
                <div className="title-div">
              
                <Typography variant="h5" component="h2">
              
                {showMore ? props.title: shortTitle}
                </Typography>
                    <div className="rating-div" >
                      <AverageRating rating={Math.round(props.voteAverage * 10)} />
                    </div>
                  
                        <Chip className='movie-badge' label={props.message}  />;
                  </div>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {showMore ? props.overview : shortDescription  }
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
