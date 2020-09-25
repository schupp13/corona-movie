import React, { useEffect, useState } from "react";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";
import MovieReviewCard from "../../Cards/MovieReviewCard/MovieReviewCard";
import axios from "axios";
export default function ReviewSection(props) {
  useEffect(() => {
    moreReviews();
  }, []);
  let [reviews, setReviews] = useState([]);
  let [page, setPage] = useState(1);
  let [totalPages, setTotalPages] = useState(0);

  const addReviewPage = () => {
    moreReviews(page + 1);
  };
  const moreReviews = (page = 1) => {
    axios
      .get(
        `https://api.themoviedb.org/3/${props.type}/${props.id}/reviews?api_key=12aa3499b6032630961640574aa332a9&language=en-US&page=${page}`
      )
      .then((results) => {
        console.log(results.data.results);
        setReviews(results.data.results);
        setPage(results.data.page);
        setTotalPages(results.data.total_pages);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let reviewsJSX = reviews.map((review, index) => {
    return <MovieReviewCard review={review} key={`Reviews -${index}`} />;
  });
  return (
    <>
      <ScrollDiv
        title="Reviews"
        cards={reviewsJSX}
        handleScroll={() => {}}
        page={page}
        total_pages={totalPages}
        addPage={addReviewPage}
      ></ScrollDiv>
    </>
  );
}
