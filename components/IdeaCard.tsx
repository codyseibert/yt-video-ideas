/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { HeartIcon as VotedHeart } from "@heroicons/react/solid";
import { HeartIcon as NotVotedHeart } from "@heroicons/react/outline";
import logo from "../assets/logo.jpeg";

type Props = {
  idea: {
    title: string;
    description: string;
    authorImage: string;
    authorName: string;
    voteCount: number;
  };
};

const IdeaCard = ({ idea }: Props) => {
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
            <VotedHeart className="w-8 h-6 text-red-500" />
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
