import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

const useFetchIdeas = (props?: Props) => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    axios
      .get("/api/ideas/fetch-ideas")
      .then(({ data }) => {
        setIdeas(data);
      })
      .catch(() => {});
  }, []);

  return { ideas };
};

export default useFetchIdeas;
