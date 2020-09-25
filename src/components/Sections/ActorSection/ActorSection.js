import React from "react";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";
import ActorCard from "../../Cards/ActorCard/ActorCard";

export default function ActorSection(props) {
  const actorsJSX = props.actors.map((actor, index) => {
    return <ActorCard actor={actor} key={index} />;
  });
  return (
    <ScrollDiv
      title={props.title}
      cards={actorsJSX}
      handleScroll={() => {}}
      page={0}
      total_pages={0}
      addPage={() => {}}
    ></ScrollDiv>
  );
}
