import axios from "axios";
import React, { useState } from "react";

type Props = {};

const useFetchIdeas = (props?: Props) => {
  const [ideas, setIdeas] = useState([]);

  const ApiReq = async () => {
    const { data } = await axios.get("/api/ideas/fetch-ideas");
    setIdeas(data);
  };
  ApiReq();

  return {
    ideas,
  };
};

export default useFetchIdeas;
