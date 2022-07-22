import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState, createContext } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Opinions from "../components/NavBarPages/Opinions";
import ProjectIdeas from "../components/NavBarPages/ProjectIdeas";
import Tutorials from "../components/NavBarPages/Tutorials";
import YoutubeShorts from "../components/NavBarPages/YoutubeShorts";

type ICategory = string;

interface LikesContextInterface {
  // likes: any[],
  isLiked: (ideaId: string) => boolean;
  fetchLikes: () => void;
}

export const LikesContext = createContext<LikesContextInterface | null>(null)

const Home: NextPage = () => {
  const [categoryType, setCategoryType] = useState<ICategory>("youtube_shorts");
  const [likes, setLikes] = useState<any[]>([]);

  const fetchLikes = async () => {
    const { data: likesFromApi } = await axios.get("/api/likes");
    setLikes(likesFromApi);
  }

  const contextValue: LikesContextInterface = {
    fetchLikes,
    isLiked: (ideaId) => likes.some(like => like.ideaId === ideaId)
  }

  useEffect(() => {
    fetchLikes();
  }, [])

  return (
    <div>
      <div>
        <Header />
        <NavBar setCategoryType={setCategoryType} categoryType={categoryType} />
        <LikesContext.Provider value={contextValue} >
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
        </LikesContext.Provider>
      </div>
    </div>
  );
};

export default Home;
