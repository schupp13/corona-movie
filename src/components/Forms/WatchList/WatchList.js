import React, { useState } from "react";
import SnackBar from "../../Features/SnackBar/SnackBar";

import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import QueuePlayNextIcon from "@material-ui/icons/QueuePlayNext";
import "./WatchList.scss";

export default function WatchList(props) {
  let [open, setOpen] = useState(false);
  const handleSubmit = () => {
    props.handleWatchList();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="watch-div">
      <Tooltip
        title={
          props.watchList ? "Currently On Watch List." : "Add To Watch List"
        }
      >
        <Button
          size="small"
          onClick={handleSubmit}
          className={props.watchList ? "fav booked" : "fav not-booked"}
        >
          <QueuePlayNextIcon fontSize="large"></QueuePlayNextIcon>
        </Button>
      </Tooltip>
      <SnackBar
        message={
          props.watchList
            ? "Added To Your Watch List"
            : "Removed From Your Watch List"
        }
        open={open}
        handleClose={handleClose}
      ></SnackBar>
    </div>
  );
}
