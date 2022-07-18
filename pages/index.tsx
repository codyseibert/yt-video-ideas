import type { NextPage } from "next";
import { useEffect } from "react";
import Header from "../components/Header";
import IdeaCard from "../components/IdeaCard";
import SearchBar from "../components/SearchBar";

const Home: NextPage = () => {
  useEffect(() => {
    fetch("/api/fetch-ideas")
      .then((data) => console.log(data))
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
              <IdeaCard />
              <IdeaCard />
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
