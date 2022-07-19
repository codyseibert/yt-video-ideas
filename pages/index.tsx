import type { NextPage } from "next";
import { useState } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Opinions from "../components/NavBarPages/Opinions";
import ProjectIdeas from "../components/NavBarPages/ProjectIdeas";
import Tutorials from "../components/NavBarPages/Tutorials";
import YoutubeShorts from "../components/NavBarPages/YoutubeShorts";

type ICategory = string;

const Home: NextPage = () => {
  const [categoryType, setCategoryType] = useState<ICategory>("youtube_shorts");

  return (
    <div>
      <div>
        <Header />
        <NavBar setCategoryType={setCategoryType} categoryType={categoryType} />
        <section className="mt-4">
          <div className="content">
            <h3 className="font-semibold text-4xl">Awesome Ideas 🤩🥳</h3>

            <section className="my-4 grid gap-4 grid-cols-4">
              {categoryType === "youtube_shorts" && <YoutubeShorts />}
              {categoryType === "opinions_on" && <Opinions />}
              {categoryType === "project_idea" && <ProjectIdeas />}
              {categoryType === "tutorial" && <Tutorials />}
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
