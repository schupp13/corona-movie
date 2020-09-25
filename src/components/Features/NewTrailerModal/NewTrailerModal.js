import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import "./NewTrailerModal.scss";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Progress from "../Porgress/Progress";

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
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  name: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
  },
  trailerDiv: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "0",
    margin: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    color: "rgb(151, 151, 151)",

    "&:hover": {
      backgroundColor: "#90cea1",
      color: "rgba(13, 37, 63, 1)",
    },
  },
}));

export default function NewTrailerModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = props.trailer[0] ? (
    <iframe
      src={`https://www.youtube.com/embed/${props.trailer[0].key}?autoplay=1`}
      allowFullScreen
      title={props.name}
    ></iframe>
  ) : (
    <Progress />
  );

  return (
    <div className="trailer-div">
      <Tooltip title="Trailer">
        <Button
          onClick={handleOpen}
          className={classes.button}
          color="primary"
          size="small"
          disabled={!props.trailer[0] ? true : false}
        >
          <PlayCircleOutlineIcon
            fontSize="large"
            type="button"
            className="play-trailer"
          />
        </Button>
      </Tooltip>
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby={props.name}
        aria-describedby="simple-modal-description"
      >
        <div className={classes.trailerDiv}>{body}</div>
      </Modal>
    </div>
  );
}
