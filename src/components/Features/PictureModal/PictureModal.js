import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
export default function PictureModal(props) {
  let [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleError = (e) => {
    console.log(e);
    e.target.src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png";
  };

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
    pictureDivPortrait: {
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: "0",
      margin: "0",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "flex-start",
    },
    pictureDiv: {
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: "0",
      margin: "0",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "flex-start",
    },
    button: {
      color: "#90cea1",
    },

    padding: {
      padding: "15px",
    },
    picturePortrait: {
      height: "60vh",
    },
    pictureLandScape: {
      width: "70vw",
    },
    closeButton: {
      position: "absolute",
      color: "white !important",
      zIndex: 100,
      cursor: "pointer",
      fontSize: "3rem",
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.padding}>
      <div style={{ minWidth: props.width }}>
        <img
          src={props.imageDisplay}
          onError={handleError}
          onClick={handleOpen}
          alt={props.name}
        />
      </div>

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
        <div
          className={
            props.portrait ? classes.pictureDivPortrait : classes.pictureDiv
          }
        >
          <img
            onError={handleError}
            alt={props.name}
            src={props.imageOriginal}
            className={
              props.portrait
                ? classes.picturePortrait
                : classes.pictureLandScape
            }
          ></img>
          <CloseIcon
            size="large"
            onClick={handleClose}
            className={classes.closeButton}
          ></CloseIcon>
        </div>
      </Modal>
    </div>
  );
}
