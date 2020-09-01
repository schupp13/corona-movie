import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ActorCard from "../../Cards/ActorCard/ActorCard";
import ScrollDiv from "../../Features/ScrollDiv/ScrollDiv";

export default function PopularActorsHooks(props) {
  const mountedRef = useRef(true);

  let [results, setResults] = useState({
    popActors: [],
    page: 1,
    totalPages: 0,
  });

  useEffect(() => {
    getPopularActors(results.page);
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleScroll = () => {};

  const addPage = () => {
    getPopularActors(results.page + 1);
  };

  const getPopularActors = (page = 1) => {
    axios
      .get(`https://api.themoviedb.org/3/person/popular`, {
        params: {
          language: "en-US",
          api_key: "12aa3499b6032630961640574aa332a9",
          page: page,
        },
      })
      .then((result) => {
        if (!mountedRef.current) return null;

        let data =
          page > 1
            ? [...results.popActors, ...result.data.results]
            : [...result.data.results];

        setResults({
          popActors: data,
          page: result.data.page,
          totalPages: result.data.total_pages,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let actors = results.popActors.map((actor, index) => {
    return <ActorCard actor={actor} key={index} />;
  });

  return (
    <div className="trending">
      <ScrollDiv
        title="Popular Actors"
        cards={actors}
        handleScroll={handleScroll}
        page={results.page}
        total_pages={results.totalPages}
        addPage={addPage}
      ></ScrollDiv>
    </div>
  );
}
