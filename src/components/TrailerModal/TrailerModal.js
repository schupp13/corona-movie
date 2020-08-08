import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import "./TrailerModal.scss";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
// import Button from '@material-ui/core/Button';
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
  }
}));

export default function TrailerModal(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [trailer, setTrailer] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
    getTrailer();
  };

  const getTrailer = () => {
    console.log(props);
    let {movie} = props;
    console.log(movie);
    props.type === 'episode' && movie.season_number && movie.episode_number && movie.show_id ? 
    axios.get(`https://api.themoviedb.org/3/tv/${movie.show_id}/season/${movie.season_number}/episode/${movie.episode_number}/videos?api_key=12aa3499b6032630961640574aa332a9&language=en-US`)
    .then(results =>{
      console.log(results)
        if(results.data.results[0]){
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
        console.log(results)
        if(results.data.results[0]){
          setTrailer(`https://www.youtube.com/embed/${results.data.results[0].key}?autoplay=1`);
        }
      })
      .catch();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (  
      trailer ? <iframe src={trailer} frameBorder="1" allowFullScreen title={props.name} ></iframe> :  <div className={classes.paper}>
      <h1>Sorry... No Trailer Available</h1>
    </div>
      
  );

  return (
    <div className="trailer-div">
      <Tooltip title="Trailer">
        <PlayCircleOutlineIcon
          fontSize="large"
          type="button"
          className="play-trailer"
          onClick={handleOpen}
        />
      </Tooltip>
      <Modal
      style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        open={open}
        onClose={handleClose}
        aria-labelledby={props.name}
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
