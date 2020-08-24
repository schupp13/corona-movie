import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./ActorProfile.scss";

export default function ActorProfile(props) {
  let { profilePic, name, bio, birthday, deathday, place_of_birth } = props;

  const shortDescription = bio && bio.length > 100 ? bio.slice(0, 100) + "...": bio ? bio: '';
  const [showMore, setShowMore] = useState(false);

  return (
<div className="actor-container">
    <div className="actor-profile">
      <img src={profilePic} />
      <h4>{place_of_birth}</h4>
      <h4>{birthday}</h4>
      <h4>{deathday}</h4>
    </div>
    
    <div className="actor-text">
    <h1 className="actor-name">{name}</h1>
    <Button onClick={() => setShowMore(!showMore)}>Bio</Button>
    <Typography className="actor-bio" variant="body2" color="textSecondary" component="p">
    {showMore && bio}
    </Typography>
    </div>
</div>

  );
}




// style={{backgroundImage: `url(${profilePic})`}}