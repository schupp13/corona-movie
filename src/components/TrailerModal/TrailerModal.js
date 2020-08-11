import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import "./TrailerModal.scss";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
import Button from '@material-ui/core/Button';
import { red } from "@material-ui/core/colors";
// import CloseIcon from '@material-ui/icons/Close';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    alignItems:"center",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  name:{
    display:"flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px"
  },
   trailerDiv:{
    backgroundImage: 'url("https://cdn.dribbble.com/users/24447/screenshots/1201310/inkling_spinner.gif")', 
    backgroundRepeat:'no-repeat', 
    backgroundSize: 'cover', 
    backgroundPosition:'center', 
    padding: '0', 
    margin: '0',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
   },
   button:{
     color: '#90cea1',
     
   }
}));

export default function TrailerModal(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [trailer, setTrailer] = useState('');
  const [loading, setLoading] = useState(false)

  const handleOpen = () => {
    setOpen(true);
    getTrailer();
  };

  const getTrailer = () => {
    // if the type is episode then it will call the endpoint for episode, else it will dynamically call the endpoint for movies and tvshows
    console.log(props);
    let {movie} = props;
    console.log(movie);
    props.type === 'episode' && movie.season_number && movie.episode_number && movie.show_id ? 
    axios.get(`https://api.themoviedb.org/3/tv/${movie.show_id}/season/${movie.season_number}/episode/${movie.episode_number}/videos?api_key=12aa3499b6032630961640574aa332a9&language=en-US`)
    .then(results =>{
      console.log(results)
        if(results.data.results[0]){
          setLoading(false);
        setTrailer(`https://www.youtube.com/embed/${results.data.results[0].key}?autoplay=1`);
        }
    })
    .catch(error =>{
      console.log(error)
    }) :
    axios
      .get(
        `https://api.themoviedb.org/3/${props.type}/${props.id}/videos?api_key=12aa3499b6032630961640574aa332a9&language=en-US`
      )
      .then((results) => {
        console.log(results.data.results)
        
        if(results.data.results[0]){
          setTrailer(`https://www.youtube.com/embed/${results.data.results[0].key}?autoplay=1`);
         let defaultTrailer =  results.data.results.filter(element =>{
            if(element.type === "Trailer" ){
            return element
          };
         });
         setLoading(false);
         defaultTrailer.length > 0 &&  setTrailer(`https://www.youtube.com/embed/${defaultTrailer[0].key}?autoplay=1`);
        }else{
          setTrailer(null)
        }
      })
      .catch();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (  
      trailer ? <iframe src={trailer}  allowFullScreen title={props.name} ></iframe> :  <div className={classes.paper}>
      <h1>Sorry... No Trailer Available</h1>
    </div>
      
  );

  return (
    <div className="trailer-div">
    
      <Tooltip title="Trailer">
      <Button onClick={handleOpen} className={classes.button} size="small">
      <PlayCircleOutlineIcon
          fontSize="medium"
          type="button"
          className="play-trailer"
          
        />
      </Button>
      </Tooltip>
      <Modal
      style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        open={open}
        onClose={handleClose}
        aria-labelledby={props.name}
        aria-describedby="simple-modal-description"
      >
        <div className={classes.trailerDiv} >
        {body}
        </div>
        
      </Modal>
    </div>
  );
}
