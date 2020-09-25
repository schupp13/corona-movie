import React from "react";
import MovieVideo from "../../Features/MovieVideo/MovieVideo";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";

export default function VideoSection(props) {
  let videosJSX = props.videos.map((movie, index) => {
    return <MovieVideo movie={movie} key={index} />;
  });
  return (
    <ScrollDiv
      title="Videos"
      cards={videosJSX}
      handleScroll={() => {}}
      page={0}
      total_pages={0}
      addPage={() => {}}
    ></ScrollDiv>
  );
}
