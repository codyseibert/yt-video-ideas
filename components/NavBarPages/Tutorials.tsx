import React, { useEffect, useState } from "react";
import IdeaCard from "../IdeaCard";

type Props = {};

type Idea = {
  title: string;
  description: string;
  authorImage: string;
  authorName: string;
  voteCount: number;
};

const Tutorials = (props: Props) => {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    fetch("/api/ideas/tutorial")
      .then((data) => data.json())
      .then((data) => setIdeas(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      {ideas?.length === 0 && <h1>No Ideas Found Yet</h1>}
      {ideas?.map((idea, index) => (
        <IdeaCard key={index} idea={idea} />
      ))}
    </div>
  );
};

export default Tutorials;
