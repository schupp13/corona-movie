import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import QueuePlayNextIcon from "@material-ui/icons/QueuePlayNext";
import "./WatchList.scss";

export default function WatchList(props) {
  const handleSubmit = () => {
    props.handleWatchList();
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
    </div>
  );
}
