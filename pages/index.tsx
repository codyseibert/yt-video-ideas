import { Idea, Like } from "@prisma/client";
import type { NextPage } from "next";
import { useMemo, useState } from "react";
import { getIdeas } from "../api/getIdeas";
import { getLikes } from "../api/getLikes";
import Header from "../components/Header";
import IdeaCard from "../components/IdeaCard";
import CategoryTabs from "../components/CategoryTabs";
import { Category } from "../data/ideaCategory";
import { CreateIdeaModal } from "../components/CreateIdeaModal";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "../components/SearchBar";

const filterIdeasBySearchBar = (ideasToFilter: Idea[], search: string) => {
  if (!search) return ideasToFilter;
  return ideasToFilter.filter(
    (idea) =>
      idea.title.toLowerCase().includes(search.toLowerCase()) ||
      idea.description.toLowerCase().includes(search.toLowerCase())
  );
};

const getSortedIdeas = (ideasToSort: Idea[]) => {
  if (!ideasToSort) return [];
  const sortedIdeas = [...ideasToSort];
  sortedIdeas.sort((a, b) => {
    return b.voteCount - a.voteCount;
  });
  return sortedIdeas;
};

const Home: NextPage = () => {
  const [categoryType, setCategoryType] = useState<Category>(Category.SHORTS);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const { data: likes, refetch: refetchLikes } = useQuery<Like[]>(
    ["likes"],
    getLikes
  );

  const { data: ideas, refetch: refetchIdeas } = useQuery<Idea[]>(
    [categoryType],
    () => getIdeas(categoryType)
  );

  const handleHeartClicked = () => {
    refetchLikes();
    refetchIdeas();
  };

  const handleIdeaCreated = () => {
    refetchIdeas();
  };

  const ideasToDisplay = useMemo(
    () => getSortedIdeas(filterIdeasBySearchBar(ideas ?? [], search)),
    [search, ideas]
  );

  return (
    <>
      <Header onNewIdeaClicked={() => setShowModal(true)} />

      <section className="mt-4 container mx-auto">
        <h3 className="font-semibold text-4xl">🤩 YouTube Video Ideas 🥳</h3>

        <CategoryTabs
          setCategoryType={(category: Category) => setCategoryType(category)}
          categoryType={categoryType}
        />

        <SearchBar setSearch={setSearch} search={search} />

        {ideas?.length === 0 && <h1>No Ideas Found Yet</h1>}

        <section className="my-4 grid gap-4 grid-cols-4">
          {ideasToDisplay?.map((idea, index) => (
            <IdeaCard
              key={index}
              idea={idea}
              onHeartClicked={handleHeartClicked}
              isLiked={(ideaId: string) =>
                likes ? !!likes.find((like) => like.ideaId === ideaId) : false
              }
            />
          ))}
        </section>
      </section>
      <CreateIdeaModal
        onIdeaCreated={handleIdeaCreated}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </>
  );
};

export default Home;
