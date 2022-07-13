/* eslint-disable @next/next/no-img-element */
import React from "react";

type Props = {
  idea: {
    title: String;
    description: String;
    id: String;
    userName: String;
    userImage: any;
  };
};

const IdeaCard = ({ idea }: Props) => {
  console.log(idea);

  return (
    <div className="my-4 mr-4 p-4 block  bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {idea?.title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {idea?.description}
      </p>
      <section className="mt-2">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <img className="w-10 rounded-full" src={idea.userImage} alt="" />
            <h2 className="text-gray-800 font-bold cursor-pointer">
              {idea.userName}
            </h2>
          </div>
          <div className="flex space-x-2">
            <div className="flex space-x-1 items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-red-500 hover:text-red-400 transition duration-100 cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span>20</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IdeaCard;
