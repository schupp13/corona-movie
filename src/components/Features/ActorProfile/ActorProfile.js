import React from "react";
import "./ActorProfile.scss";

export default function ActorProfile(props) {
  let { profilePic, name, bio } = props;

  return (
<div className="actor-container">
    <div className="actor-profile" style={{backgroundImage: `url(${profilePic})`}}>
    </div>
    <h1 className="actor-name">{name}</h1>
    {/* <p className="actor-bio">{bio}</p> */}
</div>

  );
}
