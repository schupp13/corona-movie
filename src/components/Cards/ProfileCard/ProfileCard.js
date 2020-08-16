import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import Button from "@material-ui/core/Button";
import "./ProfileCard.scss";

export default function ProfileCard(props) {
  const [isFlipped, setIsFlipped] = useState(true);
  const Background = `https://image.tmdb.org/t/p/original/${props.actor.profile_path}`;
  const aka = props.actor.also_known_as ? props.actor.also_known_as.join(', '): '';
  return (
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        infinite="true"
        containerStyle = {{height: "100%", width: "100%"}}
      >
        {/* front of card */}
        <div className="profile-container-front card">
          <div className="profile-pic" style={{ backgroundImage: `url(${Background})` }}></div>
       
          <h3>{props.actor.name}</h3>
        
            <Button size="small" onClick={() => setIsFlipped(!isFlipped)}>
              See More
            </Button>{" "}

        </div>
        <div className="profile-container-back card">
          <p>Birthday: {props.actor.birthday}</p>
          <p>Place of Birth: {props.actor.place_of_birth}</p>
          <p>Also known as: {aka}</p>

          <div>
            <Button size="small" onClick={() => setIsFlipped(!isFlipped)}>
              See Photo
            </Button>{" "}
          </div>
        </div>
      </ReactCardFlip>
  );
}
