import React, { useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import StarsIcon from "@material-ui/icons/Stars";
import { SessionContext } from "../../SessionContext/SessionContext";
import "./Favorite.scss";

export default function Favorite(props) {
  let [session, setSession, logoutSession, getSession, loggedIn] = useContext(
    SessionContext
  );

  useEffect(() => {}, []);

  const handleSubmit = () => {
    props.handleLike();
  };
  console.log(props);
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
    </div>
  );
}
