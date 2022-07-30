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
import { useQuery } from "@tanstack/react-query";

const Home: NextPage = () => {
  const [categoryType, setCategoryType] = useState<Category>(Category.SHORTS);
  const [showModal, setShowModal] = useState(false);

  const { data: likes, refetch: refetchLikes } =
    useQuery<Like[]>(['likes'], getLikes)

  const { data: ideas, refetch: refetchIdeas } =
    useQuery<Idea[]>([categoryType], () => getIdeas(categoryType))

  const handleHeartClicked = () => {
    refetchLikes();
    refetchIdeas();
  }

  const handleIdeaCreated = () => {
    refetchIdeas();
  }

  const getSortedIdeas = () => {
    if (!ideas) return [];
    const sortedIdeas = [...ideas]
    sortedIdeas.sort((a, b) => {
      return b.voteCount - a.voteCount
    });
    return sortedIdeas;
  }

  return (
    <>
      <Header onNewIdeaClicked={() => setShowModal(true)} />

      <section className="mt-4 container mx-auto">

        <h3 className="font-semibold text-4xl">🤩 YouTube Video Ideas 🥳</h3>

        <CategoryTabs
          setCategoryType={(category: Category) => setCategoryType(category)}
          categoryType={categoryType}
        />

        {ideas?.length === 0 && <h1>No Ideas Found Yet</h1>}

        <section className="my-4 grid gap-4 grid-cols-4">
          {getSortedIdeas().map((idea, index) => (
            <IdeaCard
              key={index}
              idea={idea}
              onHeartClicked={handleHeartClicked}
              isLiked={(ideaId: string) =>
                likes ? !!likes.find(like => like.ideaId === ideaId) : false
              }
            />
          ))}
        </section>
      </section>
      <CreateIdeaModal
        onIdeaCreated={handleIdeaCreated}
        setShowModal={setShowModal}
        showModal={showModal} />
    </>
  );
};

export default Home;
