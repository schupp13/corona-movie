import React from "react";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";
import PictureModal from "../../Features/PictureModal/PictureModal";
export default function ImageSection(props) {
  let movieBackdrops = props.images.map((element, index) => {
    let imageDisplay = `https://image.tmdb.org/t/p/w300/${element.file_path}`;
    let imageOriginal = `https://image.tmdb.org/t/p/original/${element.file_path}`;
    return (
      <PictureModal
        key={index}
        imageDisplay={imageDisplay}
        imageOriginal={imageOriginal}
        portrait={false}
        width={"300px"}
      />
    );
  });
  return (
    <ScrollDiv
      title="Backdrops"
      cards={movieBackdrops}
      handleScroll={() => {}}
      page={0}
      total_pages={0}
      addPage={() => {}}
    ></ScrollDiv>
  );
}
