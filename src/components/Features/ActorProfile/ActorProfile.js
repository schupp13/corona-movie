import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Favorite from "../../Forms/Favorite/Favorite";

import "./ActorProfile.scss";

export default function ActorProfile(props) {
  let { profilePic, name, bio, birthday, deathday, place_of_birth } = props;

  // const shortDescription =
  //   bio && bio.length > 100 ? bio.slice(0, 100) + "..." : bio ? bio : "";
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="actor-container">
      <div className="actor-profile">
        <img src={profilePic} alt={name} />

        <Typography variant="body2" component="p">
          {place_of_birth}
        </Typography>
        <Typography variant="body2" component="p">
          {birthday}
        </Typography>
        <Typography variant="body2" component="p">
          {deathday}
        </Typography>
      </div>

      <div className="actor-text">
        <Typography variant="h3" component="h2">
          {name}
        </Typography>
        <Favorite
          type={""}
          id={""}
          liked={props.liked}
          handleLike={props.handleLike}
        />
        <Button onClick={() => setShowMore(!showMore)}>Bio</Button>
        <Typography
          className="actor-bio"
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {showMore && bio}
        </Typography>
      </div>
    </div>
  );
}

// style={{backgroundImage: `url(${profilePic})`}}
