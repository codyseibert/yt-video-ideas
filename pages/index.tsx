import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import IdeaCard from "../components/IdeaCard";
import SearchBar from "../components/SearchBar";

type Idea = {
  title: string;
  description: string;
  authorImage: string;
  authorName: string;
  voteCount: number;
};

const Home: NextPage = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  useEffect(() => {
    fetch("/api/fetch-ideas")
      .then((data) => data.json())
      .then((data) => setIdeas(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div>
        <Header />
        <SearchBar />

        <section className="mt-4">
          <div className="content">
            <h3 className="font-semibold text-4xl">Awesome Ideas 🤩🥳</h3>

            <section className="my-4 grid gap-4 grid-cols-4">
              {ideas?.length === 0 && <h1>No Ideas Found Yet</h1>}

              {ideas?.map((idea, index) => (
                <IdeaCard key={index} idea={idea} />
              ))}
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
