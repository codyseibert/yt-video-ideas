import { Idea, Like } from "@prisma/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { getIdeas } from "../api/getIdeas";
import { getLikes } from "../api/getLikes";
import Header from "../components/Header";
import IdeaCard from "../components/IdeaCard";
import CategoryTabs from "../components/CategoryTabs";
import { Category } from "../data/ideaCategory";
import { CreateIdeaModal } from "../components/CreateIdeaModal";

const Home: NextPage = () => {
  const [categoryType, setCategoryType] = useState<string>(Category.SHORTS);
  const [likes, setLikes] = useState<Like[]>([]);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [showModal, setShowModal] = useState(false);

  // TODO: refactor more maybe
  useEffect(() => {
    getLikes().then(setLikes);
    getIdeas(categoryType).then(setIdeas);
  }, [categoryType])

  const handleHeartClicked = (ideaId: string) => {
    getLikes().then(setLikes);
    getIdeas(categoryType).then(setIdeas);
  }

  const handleIdeaCreated = () => {
    getIdeas(categoryType).then(setIdeas);
  }

  return (
    <>
      <Header onNewIdeaClicked={() => setShowModal(true)} />
      <CategoryTabs
        setCategoryType={(category) => setCategoryType(category)}
        categoryType={categoryType}
      />
      <section className="mt-4">
        <div className="content">
          <h3 className="font-semibold text-4xl">Awesome Ideas 🤩🥳</h3>

          {ideas?.length === 0 && <h1>No Ideas Found Yet</h1>}

          <section className="my-4 grid gap-4 grid-cols-4">
            {ideas?.map((idea, index) => (
              <IdeaCard
                key={index}
                idea={idea}
                onHeartClicked={handleHeartClicked}
                isLiked={(ideaId: string) =>
                  !!likes.find(like => like.ideaId === ideaId)
                }
              />
            ))}
          </section>
        </div>
      </section>
      <CreateIdeaModal
        onIdeaCreated={handleIdeaCreated}
        setShowModal={setShowModal}
        showModal={showModal} />
    </>
  );
};

export default Home;
