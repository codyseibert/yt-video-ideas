/* eslint-disable @next/next/no-img-element */
import { useSession, signIn } from "next-auth/react";
import React, { useState } from "react";
import { HeartIcon as VotedHeart } from "@heroicons/react/solid";
import { HeartIcon as NotVotedHeart } from "@heroicons/react/outline";
import { Idea } from "@prisma/client";
import { heartIdea } from "../api/heartIdea";

const IdeaCard = ({
  idea,
  isLiked,
  onHeartClicked,
}: {
  idea: Idea,
  isLiked: (ideaId: string) => boolean
  onHeartClicked: (ideaId: string) => void
}) => {
  const { status } = useSession();

  const toggleHeart = async () => {
    if (status === "unauthenticated") {
      return signIn();
    }
    await heartIdea(idea.id);
    onHeartClicked(idea.id);
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
            src={idea.authorImage ?? '/logo.jpeg'}
            alt=""
            referrerPolicy="no-referrer"
            className="rounded-full"
            width={30}
            height={30}
          />

          <div className="flex items-center text-white">
            <small className="text-black dark:text-white">Benson Yeboah </small>

            {isLiked(idea.id) ?
              <VotedHeart
                onClick={() => toggleHeart()}
                className="w-8 h-6 text-red-500 cursor-pointer hover:text-red-800"
              />
              : <NotVotedHeart
                onClick={() => toggleHeart()}
                className="w-8 h-6 text-red-500 cursor-pointer hover:text-red-800"
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
