/* eslint-disable @next/next/no-img-element */
import { useSession, signIn } from "next-auth/react";
import React, { useState } from "react";
import { HeartIcon as VotedHeart } from "@heroicons/react/solid";
import { HeartIcon as NotVotedHeart } from "@heroicons/react/outline";
import { Idea } from "@prisma/client";
import { heartIdea } from "../api/heartIdea";
import { Modal, notification } from "antd";
import { AddLinkToIdea } from "../api/addLink";
import { useQuery } from "@tanstack/react-query";

enum User {
  email = "ybenson96@gmail.com",
}

type IProps = {
  idea: Idea;
  isLiked: (ideaId: string) => boolean;
  onHeartClicked: (ideaId: string) => void;
};

const IdeaCard = ({ idea, isLiked, onHeartClicked }: IProps) => {
  const { status, data: session } = useSession();
  const [updateLinkLoading, setUpdateLinkLoading] = useState(false);
  const [videoLink, setVideoLink] = useState<string>(idea?.videoLink ?? "");
  const [openUploadLinkModal, setOpenUploadLinkModal] = useState(false);

  const toggleHeart = async () => {
    if (status === "unauthenticated") {
      return signIn();
    }
    await heartIdea(idea.id);
    onHeartClicked(idea.id);
  };

  const handleAddLink = async (e: any) => {
    e.preventDefault();
    setUpdateLinkLoading(true);
    AddLinkToIdea(idea.id, videoLink)
      .then(() => {
        setOpenUploadLinkModal(false);
      })
      .catch((err) => {
        setOpenUploadLinkModal(false);
        notification.error({
          message: err?.message,
        });
      });
  };

  return (
    <>
      <div>
        <div className="block p-4  bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-justify">
              {idea?.title}
            </h5>
          </div>
          <p className="font-normal text-gray-700 dark:text-gray-400 text-justify">
            {idea?.description}
          </p>

          <section className="mt-2 flex items-center justify-between">
            <img
              src={idea.authorImage ?? "/logo.jpeg"}
              alt=""
              referrerPolicy="no-referrer"
              className="rounded-full"
              width={30}
              height={30}
            />

            <div className="flex items-center text-white">
              {session?.user?.email === User.email && (
                <button
                  onClick={() => setOpenUploadLinkModal(true)}
                  className="bg-blue-400 text-white py-2 px-4 rounded-md mr-2"
                >
                  Edit Link
                </button>
              )}

              {session?.user?.email !== User.email && (
                <>
                  {idea.videoLink && (
                    <a
                      href={
                        idea.videoLink ??
                        "https://www.youtube.com/c/WebDevJunkie"
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-400 text-white py-2 px-4 rounded-md mr-2 flex items-center justify-between"
                    >
                      <span>Watch Video </span>
                    </a>
                  )}
                </>
              )}

              {session?.user?.email !== User.email && (
                <>
                  {isLiked(idea.id) ? (
                    <VotedHeart
                      onClick={() => toggleHeart()}
                      className="w-8 h-6 text-red-500 cursor-pointer hover:text-red-800"
                    />
                  ) : (
                    <NotVotedHeart
                      onClick={() => toggleHeart()}
                      className="w-8 h-6 text-red-500 cursor-pointer hover:text-red-800"
                    />
                  )}
                </>
              )}

              <small className="text-black dark:text-white">
                {idea?.voteCount}
              </small>
            </div>
          </section>
        </div>
      </div>

      <Modal
        title={<h1>Add A Youtube Link</h1>}
        centered
        visible={openUploadLinkModal}
        okText="submit"
        onCancel={() => setOpenUploadLinkModal(false)}
        footer={false}
      >
        <form onSubmit={handleAddLink}>
          <input
            type="url"
            required
            defaultValue={idea.videoLink ?? ""}
            onChange={(e) => setVideoLink(e.target.value)}
            placeholder="Please Enter Url"
            className="py-3 px-4 rounded-md border border-gray-300 w-full"
          />
          <div className="my-2 flex gap-x-4 justify-end">
            <button
              type="button"
              onClick={() => setOpenUploadLinkModal(false)}
              className="bg-red-400 text-white py-2 px-4 rounded-md"
            >
              cancel
            </button>
            <button
              type="submit"
              onClick={(e) => handleAddLink(e)}
              disabled={updateLinkLoading}
              className="bg-blue-400 disabled:bg-gray-100 disabled:cursor-wait text-white py-2 px-4 rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default IdeaCard;
