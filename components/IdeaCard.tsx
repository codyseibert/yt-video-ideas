/* eslint-disable @next/next/no-img-element */
import { useSession, signIn } from "next-auth/react";
import React, { useContext, useState } from "react";
import { HeartIcon as VotedHeart } from "@heroicons/react/solid";
import { HeartIcon as NotVotedHeart } from "@heroicons/react/outline";
import logo from "../assets/logo.jpeg";
import axios from "axios";
import { HeartSpinner } from "react-spinners-kit";
import { LikesContext } from "../pages";
import { Idea } from "@prisma/client";

type Props = {
  idea: {
    title: string;
    description: string;
    authorImage: string;
    authorName: string;
    voteCount: number;
    id: string;
  };
  setIdeas: React.Dispatch<React.SetStateAction<any[]>>
};

const IdeaCard = ({ idea, setIdeas }: Props) => {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const { isLiked, fetchLikes } = useContext(LikesContext)!;

  const toggleHeart = async () => {
    if (status === "unauthenticated") {
      return signIn();
    }

    setLoading(true);
    const { data: like } = await axios.post("/api/ideas/heart-idea", {
      ideaId: idea?.id,
    });
    setLoading(false);
    // optimistic client-side updating
    setIdeas((prevIdeas: any[]) =>
      [
        ...prevIdeas.filter((prevIdea: any) => prevIdea.id !== idea?.id),
        {
          ...idea,
          voteCount: idea.voteCount + (isLiked(idea.id) ? -1 : 1),
        }
      ],
    )
    await fetchLikes();

  };

  return (
    <div>
      <div className="block p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {idea?.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {idea?.description}
        </p>

        <section className="mt-2 flex items-center justify-between">
          <img
            src={idea.authorImage}
            alt=""
            className="rounded-full"
            width={30}
            height={30}
          />

          <div className="flex items-center text-white">
            <small className="text-black dark:text-white">Benson Yeboah </small>

            {isLiked(idea.id) ?
              <VotedHeart
                onClick={() => toggleHeart()}
                className="w-8 h-6 text-red-500 cursor-pointer hover:h-10 hover:w-10 hover:text-red-800"
              />
              : <NotVotedHeart
                onClick={() => toggleHeart()}
                className="w-8 h-6 text-red-500 cursor-pointer hover:h-10 hover:w-10 hover:text-red-800"
              />
            }
            <small className="text-black dark:text-white">
              {idea?.voteCount}
            </small>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IdeaCard;
