/* eslint-disable @next/next/no-img-element */
import React from "react";

import IdeaCard from "../../components/IdeaCard";
import useFetchIdeas from "./hooks/useFetchIdeas";

const Ideas = () => {
  const { ideas } = useFetchIdeas();

  return (
    <div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {ideas?.map((idea: any, index: number) => (
          <IdeaCard key={index} idea={idea} />
        ))}
      </section>
    </div>
  );
};

export default Ideas;
function fetch(arg0: string) {
  throw new Error("Function not implemented.");
}
