/* eslint-disable @next/next/no-img-element */
import React from "react";

import IdeaCard from "../IdeaCard";
import useFetchIdeas from "./hooks/useFetchIdeas";

const Ideas = () => {
  const { ideas } = useFetchIdeas();

  return (
    <div>
      <section className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {ideas?.map((idea: any, index: number) => (
          <IdeaCard key={index} idea={idea} />
        ))}
      </section>
    </div>
  );
};

export default Ideas;
