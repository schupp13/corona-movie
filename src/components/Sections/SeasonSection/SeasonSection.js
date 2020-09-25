import React from "react";
import SeasonsCard from "../../Cards/SeasonsCard/SeasonsCard";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";

export default function SeasonSection(props) {
  let seasonsjsx = props.seasons.map((season, index) => {
    return (
      <SeasonsCard season={season} tvshowID={props.tvshow.id} key={index} />
    );
  });
  return (
    <ScrollDiv
      title="Season"
      cards={seasonsjsx}
      handleScroll={() => {}}
      page={0}
      total_pages={0}
      addPage={() => {}}
    ></ScrollDiv>
  );
}
