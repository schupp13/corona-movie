import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import Button from "@material-ui/core/Button";
import "./ProfileCard.scss";

export default function ProfileCard(props) {
  const [isFlipped, setIsFlipped] = useState(true);
  return (
    <div className="profile-container">
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        infinite="true"
      >
        {/* front of card */}
        <div className="profile-container-front">
          <div className="profile-pic">
            <img
              // className="profile-pic"
              alt="profile pic"
              src={`https://image.tmdb.org/t/p/w185/${props.actor.profile_path}`}
            />
            <p>{props.actor.name}</p>
          </div>
          <div>
            <Button size="small" onClick={() => setIsFlipped(!isFlipped)}>
              See More
            </Button>{" "}
          </div>
        </div>
        <div className="profile-container-back">
          <div>
            <Button size="small" onClick={() => setIsFlipped(!isFlipped)}>
              See Photo
            </Button>{" "}
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
}
