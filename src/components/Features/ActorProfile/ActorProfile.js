import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Favorite from "../../Forms/Favorite/Favorite";
import TextModal from "../TextModal/TextModal";
import { useWindowDimensions } from "../WindowHook/getWindowDimensions";

import "./ActorProfile.scss";

export default function ActorProfile(props) {
  let { profilePic, name, bio, birthday, deathday, place_of_birth } = props;
  const {
    height,
    width,
    mobileSize,
    tabletSize,
    desktopSize,
  } = useWindowDimensions();
  // const shortDescription =
  //   bio && bio.length > 100 ? bio.slice(0, 100) + "..." : bio ? bio : "";
  const [showMore, setShowMore] = useState(false);
  console.log(props.liked);
  return (
    <div className="actor-container">
      <div className="banner-overlay">
        <div
          className="actor-profile"
          style={{ backgroundImage: `url(${profilePic})` }}
        >
          {/* <img src={profilePic} alt={name} /> */}
          {/* <Typography variant="h5" component="h5">
            {name}
          </Typography>
          <Typography variant="body2" component="p">
            {place_of_birth}
          </Typography>
          <Typography variant="body2" component="p">
            {birthday}
          </Typography>
          <Typography variant="body2" component="p">
            {deathday}
          </Typography> */}
        </div>

        <div className="actor-text">
          <Typography variant="h4" component="h4">
            {name}
          </Typography>
          <Favorite
            type=""
            id=""
            liked={props.liked}
            handleLike={props.handleLike}
          />
          <Typography variant="body2" component="p">
            {place_of_birth}
          </Typography>
          <Typography variant="body2" component="p">
            {birthday}
          </Typography>
          <Typography variant="body2" component="p">
            {deathday}
          </Typography>
          {mobileSize ? (
            <>
              <TextModal text={bio} header={name} buttonName="Bio" />
            </>
          ) : (
            <>
              <Typography variant="h5" component="h5">
                Biography
              </Typography>

              <Typography
                className="actor-bio"
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {bio}
              </Typography>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// style={{backgroundImage: `url(${profilePic})`}}
