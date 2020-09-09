import React, { useEffect, useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import StarsIcon from "@material-ui/icons/Stars";
import SnackBar from "../../Features/SnackBar/SnackBar";
import "./Favorite.scss";

export default function Favorite(props) {
  useEffect(() => {}, []);
  let [open, setOpen] = useState(false);

  const handleSubmit = () => {
    props.handleLike();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="fav-div">
      <Tooltip
        title={props.liked ? "Remove from favorites." : "Add to Favorites"}
      >
        <Button
          size="small"
          onClick={handleSubmit}
          className={props.liked ? "fav liked" : "fav not-liked"}
        >
          <StarsIcon fontSize="large"></StarsIcon>
        </Button>
      </Tooltip>

      <SnackBar
        message={
          props.liked ? "Added to your favorites" : "Removed from Favorites"
        }
        open={open}
        handleClose={handleClose}
      ></SnackBar>
    </div>
  );
}
