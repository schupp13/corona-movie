import React from "react";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";
import PictureModal from "../../Features/PictureModal/PictureModal";
export default function PosterSection(props) {
  let moviePosters = props.images.map((element, index) => {
    let imageDisplay = `https://image.tmdb.org/t/p/w185/${element.file_path}`;
    let imageOriginal = `https://image.tmdb.org/t/p/original/${element.file_path}`;
    return (
      <PictureModal
        key={index}
        imageDisplay={imageDisplay}
        imageOriginal={imageOriginal}
        portrait={true}
        width={"185px"}
      />
    );
  });
  return (
    <ScrollDiv
      title="Posters"
      cards={moviePosters}
      handleScroll={() => {}}
      page={0}
      total_pages={0}
      addPage={() => {}}
    ></ScrollDiv>
  );
}
