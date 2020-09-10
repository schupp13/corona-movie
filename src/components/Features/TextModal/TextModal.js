import React from "react";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: `   background: rgb(2, 0, 36);
    background: linear-gradient(
      to bottom,
      rgba(13, 37, 63, .7),
      rgba(13, 37, 63, 0.6)
    )`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: "50vh",
    width: "90%",
    overflowY: "scroll",
    color: "white",
  },
}));

export default function TextModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button type="button" onClick={handleOpen}>
        {props.buttonName}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{props.header}</h2>
            <Typography className="actor-bio" variant="body2" component="p">
              {props.text}
            </Typography>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
