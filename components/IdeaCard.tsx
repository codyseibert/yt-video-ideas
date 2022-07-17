import Image from "next/image";
import React from "react";
import { HeartIcon as VotedHeart } from "@heroicons/react/solid";
import { HeartIcon as NotVotedHeart } from "@heroicons/react/outline";
import logo from "../assets/logo.jpeg";
type Props = {};

const IdeaCard = (props: Props) => {
  return (
    <div>
      <div className="block p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>

        <section className="mt-2 flex items-center justify-between">
          <Image
            src={logo}
            alt=""
            width={35}
            height={35}
            className="rounded-full"
          />

          <div className="flex items-center">
            <small>Benson Yeboah </small>
            <VotedHeart className="w-8 h-6 text-red-500" />
            <small>10</small>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IdeaCard;
