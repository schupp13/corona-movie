import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function DirectionSnackbar(props) {
  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);

  const handleClose = () => {
    props.handleClose();
  };

  return (
    <div>
      <Snackbar
        open={props.open}
        TransitionComponent={TransitionUp}
        onClose={handleClose}
        autoHideDuration={6000}
        message={<span id="success-message">{props.message}</span>}
        key={transition ? transition.name : ""}
      />
    </div>
  );
}
